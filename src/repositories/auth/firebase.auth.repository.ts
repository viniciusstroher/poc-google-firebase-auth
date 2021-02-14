import { AuthRepository } from "./auth.repository.interface";
import * as admin from 'firebase-admin';
import { FirebaseGoogleAplicationsCredentialsVarError } from "./errors";
import { FirebaseAuthCreateUser } from "./firebase.repository.dto";

export class FirebaseAuthRepository implements AuthRepository{
    auth:any
    constructor(){
        if(!this.isGoogleAplicationsCredentialsVarSetted()){
            throw new FirebaseGoogleAplicationsCredentialsVarError
        }
    }
    async findUserByUuid(uuid: string): Promise<any> {
        const auth:any = await this.getAuth()
        return auth.getUser(uuid)
    }
    async findUserByEmail(email: string): Promise<any> {
        const auth:any = await this.getAuth()
        return auth.getUserByEmail(email)
    }
    async listUsers(): Promise<any> {
        const auth:any = await this.getAuth()
        return auth.listUsers()
    }
    isGoogleAplicationsCredentialsVarSetted():boolean{
        return process.env.GOOGLE_APPLICATION_CREDENTIALS ? true:false
    }
    async initializeService(){
        await admin.initializeApp()
    }
    async getAuth(): Promise<any> {
        return admin.auth()
    }
    async save(model: FirebaseAuthCreateUser): Promise<void> {
        const auth:any = await this.getAuth()
        return auth.createUser(model)
    }
    async exists(model: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async remove(uid: any): Promise<void> {
        const auth:any = await this.getAuth()
        await auth.deleteUser(uid)
    }
}