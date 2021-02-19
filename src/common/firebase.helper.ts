import * as firebase from 'firebase';

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
        return firebase.default.auth().sing
    }
    async initializeService(){
        await firebase.default.initializeApp({})
    }
    async getUserById(uuid:string): Promise<any>{
        const auth:any = await this.getAuth()
        return auth.sin(uuid)
    }
 }


export class FirebaseGoogleAplicationsCredentialsVarError extends Error{
    constructor(){
        super()
        this.name = 'FirebaseGoogleAplicationsCredentialsVarError'
    }
}