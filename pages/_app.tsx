import "../styles/globals.css";
import type { AppProps } from "next/app";
import firebase, { FirebaseContext } from "./../firebase";
import useAuth from "./../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  const auth = useAuth();
  return (
    <FirebaseContext.Provider value={{ firebase, auth }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
export default MyApp;
