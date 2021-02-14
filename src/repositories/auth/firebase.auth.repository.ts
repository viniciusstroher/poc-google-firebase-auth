import { AuthRepository } from "./auth.repository.interface";
import * as admin from 'firebase-admin';

export class FirebaseAuthError extends Error{
    constructor(error:any){
        super(error.message)
        this.name = 'FirebaseAuthError'
    }
}

export class FirebaseGoogleAplicationsCredentialsVarError extends Error{
    constructor(){
        super()
        this.name = 'FirebaseGoogleAplicationsCredentialsVarError'
    }
}

export class FirebaseAuthRepository implements AuthRepository{
    
    auth:any
    constructor(){
        if(!this.isGoogleAplicationsCredentialsVarSetted()){
            throw new FirebaseGoogleAplicationsCredentialsVarError
        }
    }
    isGoogleAplicationsCredentialsVarSetted():boolean{
        return process.env.GOOGLE_APPLICATION_CREDENTIALS ? true:false
    }
    async initializeService(){
        await admin.initializeApp()
    }
    async getAuth(): Promise<any> {
        return await admin.auth()
    }
    async findUserByEmail(email: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async save(model: any): Promise<void> {
        const auth:any = await this.getAuth()
        return await auth.createUser({
                email: 'user2@example.com',
                emailVerified: false,
                phoneNumber: '+112345678902',
                password: 'secretPassword',
                displayName: 'John Doe',
                photoURL: 'http://www.example.com/12345678/photo.png',
                disabled: false,
            })
            
        
    }
    async exists(model: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}