export interface Repository{
    insert(model:any):Promise<void>
    update(uid:string, model:any):Promise<void>
    exists(model:any): Promise<boolean>
    remove(uid:string): Promise<void>
}