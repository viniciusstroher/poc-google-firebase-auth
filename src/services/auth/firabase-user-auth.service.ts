import { FirebaseHelper } from "@root/src/common/firebase.helper"
export class FirebaseUserAuthenticationService{
    firebaseHelper:FirebaseHelper
    constructor(firebaseHelper:FirebaseHelper){
        this.firebaseHelper = firebaseHelper
    }
    async signIn(token: any): Promise<any>{
        return await this.firebaseHelper.signIn(token)
    }
}