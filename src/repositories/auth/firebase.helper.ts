import * as admin from 'firebase-admin';
import { FirebaseGoogleAplicationsCredentialsVarError } from "./errors"
import { FirebaseAuthUpsertUser } from './firebase.repository.dto';
 export class FirebaseHelper{
    static instance:FirebaseHelper
    private constructor(){
        if(!this.isGoogleAplicationsCredentialsVarSetted()){
            throw new FirebaseGoogleAplicationsCredentialsVarError
        }
    }
    static async getInstance(){
        if(!FirebaseHelper.instance){
            FirebaseHelper.instance = new FirebaseHelper()
            await FirebaseHelper.instance.initializeService()
        }
        return FirebaseHelper.instance
    }
    isGoogleAplicationsCredentialsVarSetted():boolean{
        return process.env.GOOGLE_APPLICATION_CREDENTIALS ? true:false
    }
    async getAuth(): Promise<any> {
        return admin.auth()
    }
    async initializeService(){
        await admin.initializeApp()
    }
    async getUserById(uuid:string): Promise<any>{
        const auth:any = await this.getAuth()
        return auth.getUser(uuid)
    }
    async getUserByEmail(email:string):Promise<any>{
        const auth:any = await this.getAuth()
        return auth.getUserByEmail(email)
    }
    async listUsers(): Promise<any[]>{
        const auth:any = await this.getAuth()
        return auth.listUsers()
    }
    async createUser(model:FirebaseAuthUpsertUser): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.createUser(model)
    }
    async upateUser(uid:string, model:FirebaseAuthUpsertUser): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.updateUser(uid, model)
    }
    async deleteUser(uid: any): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.deleteUser(uid)
    }
 }