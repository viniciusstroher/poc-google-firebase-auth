import { FirebaseAuthRepository } from "@root/src/repositories/auth/firebase.auth.repository"
import { FirebaseAuthCreateUser } from "@root/src/repositories/auth/firebase.repository.dto"
import * as faker from 'faker';

describe('Firebase Repository Test', () => {
    let firebaseAuthRepository:FirebaseAuthRepository
    let phoneNumber:string = `+55${faker.phone.phoneNumber('###########')}`
    let email:string = `${faker.name.lastName().toLowerCase()}${phoneNumber.replace("+","_")}@${faker.phone.phoneNumber("#####")}-inc.com`
    let displayName:string = faker.name.findName()
    let password:string = `${phoneNumber}+@Aa`
    
    const createNewUser:FirebaseAuthCreateUser = {
        email,
        emailVerified: false,
        phoneNumber,
        password,
        displayName,
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
    } 
    console.log(createNewUser)
    // return
    beforeAll(async() => {
        firebaseAuthRepository = new FirebaseAuthRepository()
        await firebaseAuthRepository.initializeService()
    })
    it('should exists env GOOGLE_APPLICATION_CREDENTIALS', async () => {
        expect(process.env.GOOGLE_APPLICATION_CREDENTIALS).toBeDefined()
    })
    it('should instantiate repo without exceptions', async () => {
        expect(firebaseAuthRepository).toBeDefined()
    })
    it('should not find user by email in firebase auth', async () => {
        await expect(async() => firebaseAuthRepository.findUserByEmail(email)).rejects.toThrow()
    })
    it('should create user in firebase auth', async () => {
        await firebaseAuthRepository.save(createNewUser)
        const userFirebase:any = await firebaseAuthRepository.findUserByEmail(email)
        expect(userFirebase).toHaveProperty('uid')
    })
    it('should find user by email in firebase auth', async () => {
        const userFirebase:any = await firebaseAuthRepository.findUserByEmail(email)
        expect(userFirebase).toHaveProperty('uid')
    })
    it('should delete user by email in firebase auth', async () => {
        const userFirebase:any = await firebaseAuthRepository.findUserByEmail(email)
        await firebaseAuthRepository.remove(userFirebase.uid)
        await expect(async() => firebaseAuthRepository.findUserByEmail(email)).rejects.toThrow()
    })
    it('should list user by email in firebase auth', async () => {
        expect(async() => await firebaseAuthRepository.listUsers()).toBeDefined()
    })
    
})