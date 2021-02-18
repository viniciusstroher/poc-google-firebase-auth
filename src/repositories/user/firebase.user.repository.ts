import { UserRepository } from "@app/repositories/user/user.repository.interface";
import { FirebaseUserUpsertUser } from "@app/common/firebase.repository.dto";
import { FirebaseAdminHelper } from "@root/src/common/firebase-admin.helper";

export class FirebaseUserRepository implements UserRepository{
    firebaseHelper:FirebaseAdminHelper
    constructor(firebaseHelper:FirebaseAdminHelper){
        this.firebaseHelper = firebaseHelper
    }
    async findUserByUuid(uuid: string): Promise<any> {
        return await this.firebaseHelper.getUserById(uuid)
    }
    async findUserByEmail(email: string): Promise<any> {
        return await this.firebaseHelper.getUserByEmail(email)
    }
    async listUsers(): Promise<any> {
        return await this.firebaseHelper.listUsers()
    }
    async insert(model: FirebaseUserUpsertUser): Promise<void> {
        return await this.firebaseHelper.createUser(model)
    }
    async update(uid:string, model: FirebaseUserUpsertUser): Promise<void> {
        return await this.firebaseHelper.upateUser(uid, model)
    }
    async remove(uid: any): Promise<void> {
        return await this.firebaseHelper.deleteUser(uid)
    }
}