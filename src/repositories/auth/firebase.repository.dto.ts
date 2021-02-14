export type FirebaseAuthCreateUser = {
    email:string
    emailVerified:boolean
    phoneNumber:string
    password:string
    displayName:string
    photoURL?:string
    disabled:boolean
}