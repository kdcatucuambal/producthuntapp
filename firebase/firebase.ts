import app from "firebase/app";
import "firebase/auth";
import { ILogin, INewAccount } from "../models/app.interfaces";
import firebaseConfig from "./config";

class Firebase {
  private auth: app.auth.Auth = null;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  //regiser user
  async register(user: INewAccount) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    return await newUser.user.updateProfile({
      displayName: user.name,
    });
  }

  //init sesion
  async login(credentials: ILogin) {
    const { email, password } = credentials;
    const response = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    return response;
  }

  //close sesion
  async logout() {
    await this.auth.signOut();
  }

  public get _auth() {
    return this.auth;
  }
}

const firebase = new Firebase();
export default firebase;
export interface IFirebase extends Firebase {}
