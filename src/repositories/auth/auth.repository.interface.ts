import { Repository } from "@app/common/repository.interface";

export interface AuthRepository extends Repository{
    findUserByUuid(uuid:string): Promise<any>
    findUserByEmail(email:string): Promise<any>
    listUsers(): Promise<any[]>
}