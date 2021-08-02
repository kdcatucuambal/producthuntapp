import firecore from "firebase";
import { IFirebase } from "../firebase/firebase";

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

export interface IProduct extends INewProduct {
  likes: 0;
  comments: string[];
  created: number;
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
