import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCDEWvfvIOeMvLCCUMRalGuSZpkwxKycdc",
  authDomain: "online-shopping-user-dashboard.firebaseapp.com",
  projectId: "online-shopping-user-dashboard",
  storageBucket: "online-shopping-user-dashboard.firebasestorage.app",
  messagingSenderId: "1018126801000",
  appId: "1:1018126801000:web:836cf37b7bc97bf343c3dd",
  measurementId: "G-JC3J982J3W"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;