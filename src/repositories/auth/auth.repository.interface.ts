import { Repository } from "@app/common/repository.interface";

export interface AuthRepository extends Repository{
    findUserByEmail(email:string): Promise<any>
}