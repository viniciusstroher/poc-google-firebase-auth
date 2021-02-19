import { FirebaseUserRepository } from "@app/repositories/user/firebase.user.repository"
import { FirebaseAdminHelper } from "@root/src/common/firebase-admin.helper";
import { FirebaseAdminAuthenticationService } from "@root/src/services/auth/firabase-admin-auth.service";
import { firebaseUserMock } from "../firebase.user.mock";

describe('Firebase User Service Test', () => {
    let firebaseAdminAuthenticationService:FirebaseAdminAuthenticationService
    let firebaseHelper:FirebaseAdminHelper
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
        const firebaseHelper:FirebaseAdminHelper = await FirebaseAdminHelper.getInstance()
        firebaseAdminAuthenticationService = new FirebaseAdminAuthenticationService(firebaseHelper)
        firebaseUserRepository = new FirebaseUserRepository(firebaseHelper)

        creatNewUserDataMock = firebaseUserMock()
        creatNewUserMock = await createUser(firebaseUserRepository, creatNewUserDataMock)
        // console.log(creatNewUserMock)
    })
    afterAll(async() => {
        await deleteUser(firebaseUserRepository, creatNewUserMock.uid)
    })
    it('should instantiate service without exceptions', async () => {
        expect(firebaseAdminAuthenticationService).toBeDefined()
    })
    it('should not throw except when call generateToken', async () => {
        expect(async() => await firebaseAdminAuthenticationService.generateToken(creatNewUserMock.uid)).not.toThrow()
    })
    it('should not throw except when call revokeToken', async () => {
        const token:string = await firebaseAdminAuthenticationService.generateToken(creatNewUserMock.uid)
        expect(token).not.toBe(null)
        expect(async() => await firebaseAdminAuthenticationService.revokeToken(creatNewUserMock.uid)).not.toThrow()
    })    
})