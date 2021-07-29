import firecore from "firebase";
import { useEffect, useState } from "react";
import firebase from "../firebase";

function useAuth() {
  const [userAuhtenticated, setUserAuthenticated] =
    useState<firecore.User>(null);

  useEffect(() => {
    console.log("mount");
    const unsuscribe = firebase._auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUserAuthenticated(user);
      } else {
        setUserAuthenticated(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return userAuhtenticated;
}

export default useAuth;
