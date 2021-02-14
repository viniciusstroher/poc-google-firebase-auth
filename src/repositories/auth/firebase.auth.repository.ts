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
    static instance:FirebaseAuthRepository
    auth:any
    constructor(){
        
        if(!this.isGoogleAplicationsCredentialsVarSetted()){
            throw new FirebaseGoogleAplicationsCredentialsVarError
        }

        try{
            admin.initializeApp()
        }catch(FirebaseError){
            throw new FirebaseAuthError(FirebaseError)
        }
    }
    isGoogleAplicationsCredentialsVarSetted():boolean{
        return process.env.GOOGLE_APPLICATION_CREDENTIALS ? true:false
    }
    getAuth(): any {
        if(!this.auth){
            this.auth = admin.auth()
        }
        return this.auth 
    }
    async findUserByEmail(email: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async save(model: any): Promise<void> {
        return new Promise((resolve,reject) => {
            this.getAuth().createUser({
                email: 'user@example.com',
                emailVerified: false,
                phoneNumber: '+11234567890',
                password: 'secretPassword',
                displayName: 'John Doe',
                photoURL: 'http://www.example.com/12345678/photo.png',
                disabled: false,
              })
              .then((userRecord:any) => {
                resolve();
              })
              .catch((error:any) => {
                reject(error);
              });

        })
    }
    async exists(model: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}