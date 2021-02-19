import * as firebase from 'firebase';
import * as FirebaseClientServiceConfig from "@root/config/service-account-client-file.json"

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
    async initializeService(){
        //pegar a chave em config da autenticação > app web
        await firebase.default.initializeApp(FirebaseClientServiceConfig)
    }
    async signIn(token:string): Promise<any>{
        return firebase.default.auth().signInWithCustomToken(token)
    }
 }
export class FirebaseGoogleAplicationsCredentialsVarError extends Error{
    constructor(){
        super()
        this.name = 'FirebaseGoogleAplicationsCredentialsVarError'
    }
}