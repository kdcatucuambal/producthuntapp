import { createContext } from "react";
import { IFirebaseContext } from "../models/app.interfaces";
const FirebaseContext = createContext<IFirebaseContext>(null);
export default FirebaseContext;
