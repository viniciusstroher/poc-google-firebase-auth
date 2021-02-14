/**
 * 
 * 
 * criar helper destes metodos e retirar do repositorio - SRP
 * 
 *     if(!this.isGoogleAplicationsCredentialsVarSetted()){
            throw new FirebaseGoogleAplicationsCredentialsVarError
        }
    }
    isGoogleAplicationsCredentialsVarSetted():boolean{
        return process.env.GOOGLE_APPLICATION_CREDENTIALS ? true:false
    }
    async initializeService(){
        await admin.initializeApp()
    }
    async getAuth(): Promise<any> {
        return await admin.auth()
    }
 * 
 */