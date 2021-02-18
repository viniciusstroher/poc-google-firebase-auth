import * as admin from 'firebase-admin';
import { FirebaseUserUpsertUser } from './firebase.repository.dto';

export class FirebaseAdminHelper{
    static instance:FirebaseAdminHelper
    private constructor(){
        if(!this.isGoogleAplicationsCredentialsVarSetted()){
            throw new FirebaseGoogleAplicationsCredentialsVarError
        }
    }
    static async getInstance(){
        if(!FirebaseAdminHelper.instance){
            FirebaseAdminHelper.instance = new FirebaseAdminHelper()
            await FirebaseAdminHelper.instance.initializeService()
        }
        return FirebaseAdminHelper.instance
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
    async createUser(model:FirebaseUserUpsertUser): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.createUser(model)
    }
    async upateUser(uid:string, model:FirebaseUserUpsertUser): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.updateUser(uid, model)
    }
    async deleteUser(uid: any): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.deleteUser(uid)
    }
    async generateToken(uid: any): Promise<string>{
        const auth:any = await this.getAuth()
        return auth.createCustomToken(uid)
    }
    async revokeToken(uid: any): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.revokeRefreshTokens(uid)
    }

    //A API RETORNA O TOKEN - DEVE SER FEITO UM AUTENTICADOR QUE PEGA A EMAIL E SENHA
    //e RETORNE O CUSTOM TOKEN, SO O SDK DO CLIENTE TEM O signWithCustomToken e o signs
 }


export class FirebaseGoogleAplicationsCredentialsVarError extends Error{
    constructor(){
        super()
        this.name = 'FirebaseGoogleAplicationsCredentialsVarError'
    }
}