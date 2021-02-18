import { FirebaseUserUpsertUser } from "@root/src/common/firebase.repository.dto"
import * as faker from 'faker';

export  const firebaseUserMock = ():FirebaseUserUpsertUser => {
    let phoneNumber:string = `+55${faker.phone.phoneNumber('###########')}`
    let email:string = `${faker.name.lastName().toLowerCase()}${phoneNumber.replace("+","_")}@${faker.phone.phoneNumber("#####")}-inc.com`
    let displayName:string = faker.name.findName()
    let password:string = `${phoneNumber}+@Aa`
    
    return {
        email,
        emailVerified: false,
        phoneNumber,
        password,
        displayName,
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
    } 
}