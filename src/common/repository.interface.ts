export interface Repository{
    insert(model:any):Promise<void>
    update(uid:string, model:any):Promise<void>
    remove(uid:string): Promise<void>
}