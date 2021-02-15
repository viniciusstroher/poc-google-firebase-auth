import { AuthRepository } from "./auth.repository.interface";
import { FirebaseAuthUpsertUser } from "./firebase.repository.dto";
import { FirebaseHelper } from "./firebase.helper";

export class FirebaseAuthRepository implements AuthRepository{
    firebaseHelper:FirebaseHelper
    constructor(firebaseHelper:FirebaseHelper){
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
    async insert(model: FirebaseAuthUpsertUser): Promise<void> {
        return await this.firebaseHelper.createUser(model)
    }
    async update(uid:string, model: FirebaseAuthUpsertUser): Promise<void> {
        return await this.firebaseHelper.upateUser(uid, model)
    }
    async exists(model: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async remove(uid: any): Promise<void> {
        return await this.firebaseHelper.deleteUser(uid)
    }
}