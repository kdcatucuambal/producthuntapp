// noinspection SpellCheckingInspection
import firecore from "firebase";
import {IFirebase} from "../firebase/firebase";

export interface INewAccount {
    name: string;
    password: string;
    email: string;
}

export interface INewProduct {
    name: string;
    company: string;
    image: string;
    url: string;
    description: string;
}

export type Creator = {
    id: string,
    name: string,
    email: string
}

export type Comment = {
    userId: string,
    userName: string,
    comment: string
}

export interface IProduct extends INewProduct {
    likes: number;
    comments: Comment[];
    created: number;
    creator: Creator,
    haveVoted: string[]
    id?: string
}

export interface ILogin {
    email: string;
    password: string;
}

//useContext
export interface IFirebaseContext {
    auth: firecore.User;
    firebase: IFirebase;
}
