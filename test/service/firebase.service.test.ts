import { FirebaseUserRepository } from "@app/repositories/user/firebase.user.repository"
import { FirebaseHelper } from "@app/common/firebase.helper";
import { FirebaseUserUpsertUser } from "@app/common/firebase.repository.dto"
import * as faker from 'faker';
import { FirabaseAuthTokenService } from "@root/src/services/auth/firabase.auth.token.service";
import { firebaseUserMock } from "../firebase.user.mock";

describe('Firebase User Service Test', () => {
    let firabaseAuthTokenService:FirabaseAuthTokenService
    let firebaseHelper:FirebaseHelper
    let firebaseUserRepository:FirebaseUserRepository
    let creatNewUserDataMock:any
    let creatNewUserMock:any

    const createUser = async (firebaseUserRepository:FirebaseUserRepository, createNewUser:any) =>{
        await firebaseUserRepository.insert(createNewUser)
        return await firebaseUserRepository.findUserByEmail(createNewUser.email)
    }
    const deleteUser = async (firebaseUserRepository:FirebaseUserRepository, uid:string) => {
        await firebaseUserRepository.remove(uid)
    }

    beforeAll(async() => {
        const firebaseHelper:FirebaseHelper = await FirebaseHelper.getInstance()
        firabaseAuthTokenService = new FirabaseAuthTokenService(firebaseHelper)
        firebaseUserRepository = new FirebaseUserRepository(firebaseHelper)

        creatNewUserDataMock = firebaseUserMock()
        creatNewUserMock = await createUser(firebaseUserRepository, creatNewUserDataMock)
        console.log(creatNewUserMock)
    })
    afterAll(async() => {
        await deleteUser(firebaseUserRepository, creatNewUserMock.uid)
    })
    it('should instantiate service without exceptions', async () => {
        expect(firabaseAuthTokenService).toBeDefined()
    })
    it('should not throw except when call generateToken', async () => {
        expect(async() => await firabaseAuthTokenService.generateToken(creatNewUserMock.uid)).not.toThrow()
    })
    it('should not throw except when call revokeToken', async () => {
        const token:string = await firabaseAuthTokenService.generateToken(creatNewUserMock.uid)
        expect(token).not.toBe(null)
        expect(async() => await firabaseAuthTokenService.revokeToken(creatNewUserMock.uid)).not.toThrow()
    })    
})