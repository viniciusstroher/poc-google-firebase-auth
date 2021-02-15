import { FirebaseUserRepository } from "@app/repositories/user/firebase.user.repository"
import { FirebaseHelper } from "@app/common/firebase.helper";
import { FirebaseUserUpsertUser } from "@app/common/firebase.repository.dto"
import * as faker from 'faker';

describe('Firebase User Repository Test', () => {
    let firebaseUserRepository:FirebaseUserRepository
    let createNewUser:any
    let firebaseUserMock = ():FirebaseUserUpsertUser => {
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
        firebaseUserRepository = new FirebaseUserRepository(firebaseHelper)
        createNewUser = firebaseUserMock()
        console.log(createNewUser)
    })
    it('should exists env GOOGLE_APPLICATION_CREDENTIALS', async () => {
        expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).toBeDefined()
    })
    it('should instantiate repo without exceptions', async () => {
        expect(firebaseUserRepository).toBeDefined()
    })
    it('should not find user by email in firebase auth', async () => {
        await expect(async() => firebaseUserRepository.findUserByEmail(createNewUser.email)).rejects.toThrow()
    })
    it('should create user in firebase auth', async () => {
        await firebaseUserRepository.insert(createNewUser)
        const userFirebase:any = await firebaseUserRepository.findUserByEmail(createNewUser.email)
        expect(userFirebase).toHaveProperty('uid')
    })
    it('should find user by email in firebase auth', async () => {
        const userFirebase:any = await firebaseUserRepository.findUserByEmail(createNewUser.email)
        expect(userFirebase).toHaveProperty('uid')
    })
    it('should delete user by email in firebase auth', async () => {
        const userFirebase:any = await firebaseUserRepository.findUserByEmail(createNewUser.email)
        await firebaseUserRepository.remove(userFirebase.uid)
        await expect(async() => firebaseUserRepository.findUserByEmail(createNewUser.email)).rejects.toThrow()
    })
    it('should update user by email in firebase auth', async () => {
        let userFirebase:any
        let createUpdateUser = firebaseUserMock()
        await firebaseUserRepository.insert(createUpdateUser)
        userFirebase = await firebaseUserRepository.findUserByEmail(createUpdateUser.email)

        createUpdateUser.displayName += `${createNewUser.displayName}@@`
        await firebaseUserRepository.update(userFirebase.uid, createUpdateUser)
        
        userFirebase = await firebaseUserRepository.findUserByEmail(createUpdateUser.email)
        
        await firebaseUserRepository.remove(userFirebase.uid)
        expect(userFirebase.displayName).toBe(createUpdateUser.displayName)
    })
    it('should list user by email in firebase auth', async () => {
        expect(async() => await firebaseUserRepository.listUsers()).toBeDefined()
    })
    
})