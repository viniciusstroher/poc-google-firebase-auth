import * as admin from 'firebase-admin';
import { FirebaseUserUpsertUser } from './firebase.repository.dto';

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
    async generateToken(uid: any): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.createCustomToken(uid)
    }
    async revokeToken(uid: any): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.revokeRefreshTokens(uid)
    }
    async verifyToken(token: any): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.verifyIdToken(token)
    }
    async signIn(token: any): Promise<void>{
        const auth:any = await this.getAuth()
        return auth.signInWithCustomToken(token)
        // https://firebase.google.com/docs/auth/admin/manage-cookies
        // firebase.auth().signInWithEmailAndPassword('user@example.com', 'password').then(user => {
        //     // Get the user's ID token as it is needed to exchange for a session cookie.
        //     return user.getIdToken().then(idToken = > {
        //       // Session login endpoint is queried and the session cookie is set.
        //       // CSRF protection should be taken into account.
        //       // ...
        //       const csrfToken = getCookie('csrfToken')
        //       return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
        //     });
        //   }).then(() => {
        //     // A page redirect would suffice as the persistence is set to NONE.
        //     return firebase.auth().signOut();
        //   }).then(() => {
        //     window.location.assign('/profile');
        //   });
    }
 }


export class FirebaseGoogleAplicationsCredentialsVarError extends Error{
    constructor(){
        super()
        this.name = 'FirebaseGoogleAplicationsCredentialsVarError'
    }
}