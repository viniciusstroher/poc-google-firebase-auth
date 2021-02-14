export class FirebaseAuthError extends Error{
    constructor(error:any){
        super(error.message)
        this.name = 'FirebaseAuthError'
    }
}

export class FirebaseGoogleAplicationsCredentialsVarError extends Error{
    constructor(){
        super()
        this.name = 'FirebaseGoogleAplicationsCredentialsVarError'
    }
}