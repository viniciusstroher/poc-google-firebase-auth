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
    async initializeService(){
        //pegar a chave em config da autenticação > app web
        await firebase.default.initializeApp({
            "apiKey": "AIzaSyBu3ceUyY8bnsP0dGrrkkUCsihPx-Lg2IA",
            "authDomain": "poc-firebase-auth-d6097.firebaseapp.com",
            "projectId": "poc-firebase-auth-d6097",
            "storageBucket": "poc-firebase-auth-d6097.appspot.com",
            "messagingSenderId": "692764245847",
            "appId": "1:692764245847:web:e8ea3442655d7f74938812"
        })
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