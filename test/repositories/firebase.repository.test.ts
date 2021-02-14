import { FirebaseAuthError, FirebaseAuthRepository } from "@root/src/repositories/auth/firebase.auth.repository"

describe('Firebase Repository Test', () => {
    let firebaseAuthRepository:FirebaseAuthRepository
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
    it('should create user in firebase auth', async () => {
        await expect(async() => firebaseAuthRepository.save({})).rejects.toThrow()
    })
    
})