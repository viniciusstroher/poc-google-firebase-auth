export interface Repository{
    save(model:any):Promise<void>
    exists(model:any): Promise<boolean>
    remove(uid:string): Promise<void>
}