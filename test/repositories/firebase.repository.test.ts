import { FirebaseAuthRepository } from "@root/src/repositories/auth/firebase.auth.repository"
import { FirebaseHelper } from "@root/src/repositories/auth/firebase.helper";
import { FirebaseAuthUpsertUser } from "@root/src/repositories/auth/firebase.repository.dto"
import * as faker from 'faker';

describe('Firebase Repository Test', () => {
    let firebaseAuthRepository:FirebaseAuthRepository
    let createNewUser:any
    let firebaseUserMock = ():FirebaseAuthUpsertUser => {
        let phoneNumber:string = `+55${faker.phone.phoneNumber('###########')}`
        let email:string = `${faker.name.lastName().toLowerCase()}${phoneNumber.replace("+","_")}@${faker.phone.phoneNumber("#####")}-inc.com`
        let displayName:string = faker.name.findName()
        let password:string = `${phoneNumber}+@Aa`
        
        return {
            email,
            emailVerified: false,
            phoneNumber,
            password,
            displayName,
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false,
        } 
    }

    beforeAll(async() => {
        const firebaseHelper:FirebaseHelper = await FirebaseHelper.getInstance()
        firebaseAuthRepository = new FirebaseAuthRepository(firebaseHelper)
        createNewUser = firebaseUserMock()
        console.log(createNewUser)
    })
    it('should exists env GOOGLE_APPLICATION_CREDENTIALS', async () => {
        expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).toBeDefined()
    })
    it('should instantiate repo without exceptions', async () => {
        expect(firebaseAuthRepository).toBeDefined()
    })
    it('should not find user by email in firebase auth', async () => {
        await expect(async() => firebaseAuthRepository.findUserByEmail(createNewUser.email)).rejects.toThrow()
    })
    it('should create user in firebase auth', async () => {
        await firebaseAuthRepository.insert(createNewUser)
        const userFirebase:any = await firebaseAuthRepository.findUserByEmail(createNewUser.email)
        expect(userFirebase).toHaveProperty('uid')
    })
    it('should find user by email in firebase auth', async () => {
        const userFirebase:any = await firebaseAuthRepository.findUserByEmail(createNewUser.email)
        expect(userFirebase).toHaveProperty('uid')
    })
    it('should delete user by email in firebase auth', async () => {
        const userFirebase:any = await firebaseAuthRepository.findUserByEmail(createNewUser.email)
        await firebaseAuthRepository.remove(userFirebase.uid)
        await expect(async() => firebaseAuthRepository.findUserByEmail(createNewUser.email)).rejects.toThrow()
    })
    it('should update user by email in firebase auth', async () => {
        let userFirebase:any
        let createUpdateUser = firebaseUserMock()
        await firebaseAuthRepository.insert(createUpdateUser)
        userFirebase = await firebaseAuthRepository.findUserByEmail(createUpdateUser.email)

        createUpdateUser.displayName += `${createNewUser.displayName}@@`
        await firebaseAuthRepository.update(userFirebase.uid, createUpdateUser)
        
        userFirebase = await firebaseAuthRepository.findUserByEmail(createUpdateUser.email)
        
        await firebaseAuthRepository.remove(userFirebase.uid)
        expect(userFirebase.displayName).toBe(createUpdateUser.displayName)
    })
    it('should list user by email in firebase auth', async () => {
        expect(async() => await firebaseAuthRepository.listUsers()).toBeDefined()
    })
    
})