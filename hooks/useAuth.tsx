import firecore from "firebase";
import { useEffect, useState } from "react";
import firebase from "../firebase";

function useAuth() {
  const [userAuhtenticated, setUserAuthenticated] =
    useState<firecore.User>(null);

  useEffect(() => {
    const unsuscribe = firebase._auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuthenticated(user);
      } else {
        setUserAuthenticated(null);
      }
      return () => unsuscribe();
    });
  }, []);

  return userAuhtenticated;
}

export default useAuth;
