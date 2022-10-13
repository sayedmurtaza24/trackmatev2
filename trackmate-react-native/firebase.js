import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyD5VFqkujdB7UFsB-B1PIPAHRxZMapFzTA",
  authDomain: "trackmatev2.firebaseapp.com",
  projectId: "trackmatev2",
  storageBucket: "trackmatev2.appspot.com",
  messagingSenderId: "287252231085",
  appId: "1:287252231085:web:bab84af0480ae57555a724"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const signIn = async () => {
  const user = await signInWithPopup(auth, provider);
  const idToken = await user.user.getIdToken();
  return idToken;
}