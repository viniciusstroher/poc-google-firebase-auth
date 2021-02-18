import { FirebaseAdminHelper } from "@root/src/common/firebase-admin.helper"
export class FirabaseAuthTokenService{
    firebaseHelper:FirebaseAdminHelper
    constructor(firebaseHelper:FirebaseAdminHelper){
        this.firebaseHelper = firebaseHelper
    }
    async generateToken(uid: any): Promise<string>{
        return await this.firebaseHelper.generateToken(uid)
    }
    async revokeToken(uid: any): Promise<void>{
        return await this.firebaseHelper.revokeToken(uid)
    }
}