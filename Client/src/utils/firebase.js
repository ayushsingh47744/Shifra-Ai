import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifra-ai-eac7a.firebaseapp.com",
  projectId: "shifra-ai-eac7a",
  storageBucket: "shifra-ai-eac7a.firebasestorage.app",
  messagingSenderId: "492700342909",
  appId: "1:492700342909:web:eec65478aa630f00852f14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}

