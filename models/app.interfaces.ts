import firecore from "firebase";
import { IFirebase } from "../firebase/firebase";

export interface INewAccount{
    name: string,
    password: string,
    email: string
}

export interface ILogin{
    email: string,
    password: string
}

//useContext
export interface IFirebaseContext{
    auth: firecore.User,
    firebase: IFirebase
}