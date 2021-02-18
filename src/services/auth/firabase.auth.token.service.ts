import { FirebaseHelper } from "@root/src/common/firebase.helper"

export class FirabaseAuthTokenService{
    firebaseHelper:FirebaseHelper
    constructor(firebaseHelper:FirebaseHelper){
        this.firebaseHelper = firebaseHelper
    }
    async generateToken(uid: any): Promise<void>{
        return await this.firebaseHelper.generateToken(uid)
    }
    async revokeToken(uid: any): Promise<void>{
        return await this.firebaseHelper.revokeToken(uid)
    }
    async verifyToken(token: any): Promise<void>{
        return await this.firebaseHelper.verifyToken(token)
    }
}