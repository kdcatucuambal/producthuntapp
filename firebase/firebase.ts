import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"
import {ILogin, INewAccount} from "../models/app.interfaces";
import firebaseConfig from "./config";

class Firebase {
    private readonly auth: app.auth.Auth = null;
    public db: app.firestore.Firestore;
    public storage: app.storage.Storage;

    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // register user
    async register(user: INewAccount) {
        const newUser = await this.auth.createUserWithEmailAndPassword(
            user.email,
            user.password
        );
        return await newUser.user.updateProfile({
            displayName: user.name,
        });
    }

    //init session
    async login(credentials: ILogin) {
        const {email, password} = credentials;
        const response = await this.auth.signInWithEmailAndPassword(
            email,
            password
        );
        return response;
    }

    //close session
    async logout() {
        await this.auth.signOut();
    }

    public get _auth() {
        return this.auth;
    }
}

const firebase = new Firebase();
export default firebase;

export interface IFirebase extends Firebase {
}

