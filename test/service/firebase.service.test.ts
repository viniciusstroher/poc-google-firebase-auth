import { FirebaseUserRepository } from "@app/repositories/user/firebase.user.repository"
import { FirebaseHelper } from "@app/common/firebase.helper";
import { FirebaseUserUpsertUser } from "@app/common/firebase.repository.dto"
import * as faker from 'faker';
import { FirabaseAuthTokenService } from "@root/src/services/auth/firabase.auth.token.service";
import { firebaseUserMock } from "../firebase.user.mock";

describe('Firebase User Service Test', () => {
    let firabaseAuthTokenService:FirabaseAuthTokenService
    let createNewUser:any
    
    beforeAll(async() => {
        const firebaseHelper:FirebaseHelper = await FirebaseHelper.getInstance()
        firabaseAuthTokenService = new FirabaseAuthTokenService(firebaseHelper)
        createNewUser = firebaseUserMock()
        console.log(createNewUser)
    })
    it('should instantiate service without exceptions', async () => {
        expect(firabaseAuthTokenService).toBeDefined()
    })
    // it('should not find user by email in firebase auth', async () => {
    //     await expect(async() => firebaseUserRepository.findUserByEmail(createNewUser.email)).rejects.toThrow()
    // })
    // it('should create user in firebase auth', async () => {
    //     await firebaseUserRepository.insert(createNewUser)
    //     const userFirebase:any = await firebaseUserRepository.findUserByEmail(createNewUser.email)
    //     expect(userFirebase).toHaveProperty('uid')
    // })
    // it('should find user by email in firebase auth', async () => {
    //     const userFirebase:any = await firebaseUserRepository.findUserByEmail(createNewUser.email)
    //     expect(userFirebase).toHaveProperty('uid')
    // })
    // it('should delete user by email in firebase auth', async () => {
    //     const userFirebase:any = await firebaseUserRepository.findUserByEmail(createNewUser.email)
    //     await firebaseUserRepository.remove(userFirebase.uid)
    //     await expect(async() => firebaseUserRepository.findUserByEmail(createNewUser.email)).rejects.toThrow()
    // })
    // it('should update user by email in firebase auth', async () => {
    //     let userFirebase:any
    //     let createUpdateUser = firebaseUserMock()
    //     await firebaseUserRepository.insert(createUpdateUser)
    //     userFirebase = await firebaseUserRepository.findUserByEmail(createUpdateUser.email)

    //     createUpdateUser.displayName += `${createNewUser.displayName}@@`
    //     await firebaseUserRepository.update(userFirebase.uid, createUpdateUser)
        
    //     userFirebase = await firebaseUserRepository.findUserByEmail(createUpdateUser.email)
        
    //     await firebaseUserRepository.remove(userFirebase.uid)
    //     expect(userFirebase.displayName).toBe(createUpdateUser.displayName)
    // })
    // it('should list user by email in firebase auth', async () => {
    //     expect(async() => await firebaseUserRepository.listUsers()).toBeDefined()
    // })
    
})