import { FirebaseUserRepository } from "@app/repositories/user/firebase.user.repository"
import { FirebaseAdminHelper } from "@root/src/common/firebase-admin.helper";
import { FirebaseHelper } from "@root/src/common/firebase.helper";
import { FirebaseAdminAuthenticationService } from "@root/src/services/auth/firabase-admin-auth.service";
import { FirebaseUserAuthenticationService } from "@root/src/services/auth/firabase-user-auth.service";
import { firebaseUserMock } from "../firebase.user.mock";

describe('Firebase User Service Test', () => {
    let firebaseAdminAuthenticationService:FirebaseAdminAuthenticationService
    let firebaseUserAuthenticationService:FirebaseUserAuthenticationService
    let firebaseUserRepository:FirebaseUserRepository
    let creatNewUserDataMock:any
    let creatNewUserMock:any
    let token:string
    const createUser = async (firebaseUserRepository:FirebaseUserRepository, createNewUser:any) =>{
        await firebaseUserRepository.insert(createNewUser)
        return await firebaseUserRepository.findUserByEmail(createNewUser.email)
    }
    const deleteUser = async (firebaseUserRepository:FirebaseUserRepository, uid:string) => {
        await firebaseUserRepository.remove(uid)
    }

    beforeAll(async() => {
        const firebaseAdminHelper:FirebaseAdminHelper = await FirebaseAdminHelper.getInstance()
        firebaseAdminAuthenticationService = new FirebaseAdminAuthenticationService(firebaseAdminHelper)
        firebaseUserRepository = new FirebaseUserRepository(firebaseAdminHelper)

        const firebaseHelper:FirebaseHelper = await FirebaseHelper.getInstance()
        firebaseUserAuthenticationService = new FirebaseUserAuthenticationService(firebaseHelper)

        creatNewUserDataMock = firebaseUserMock()
        creatNewUserMock = await createUser(firebaseUserRepository, creatNewUserDataMock)

        token = await firebaseAdminAuthenticationService.generateToken(creatNewUserMock.uid)
        // console.log(creatNewUserMock)
        // console.log(token)
    })
    afterAll(async() => {
        await deleteUser(firebaseUserRepository, creatNewUserMock.uid)
    })
    it('should instantiate service without exceptions', async () => {
        expect(firebaseUserAuthenticationService).toBeDefined()
    })
    it('should not throw except when call signIn', async () => {
        const userSignedIn = await firebaseUserAuthenticationService.signIn(token)
        expect(userSignedIn).toHaveProperty('user')
        expect(userSignedIn.user).toHaveProperty('uid')
    })
})