// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSydz6wKBaMXiGa4mh0LRtS49x0v4UYXw",
  authDomain: "fall-hacks-2023.firebaseapp.com",
  projectId: "fall-hacks-2023",
  storageBucket: "fall-hacks-2023.appspot.com",
  messagingSenderId: "719485100577",
  appId: "1:719485100577:web:d6818ae308fcd2a7aa3960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export const logIn = async () => {
	const {user} = await signInWithPopup(auth, googleAuthProvider);
	return user;
}

export const logOut = () => signOut(auth);

export const getCurrentUser = () => auth.currentUser;
