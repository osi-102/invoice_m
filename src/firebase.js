import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDIk6bc90X0zS1nfjoawsPAkqgSDCs6a18",
  authDomain: "invoice-app-3f33d.firebaseapp.com",
  projectId: "invoice-app-3f33d",
  storageBucket: "invoice-app-3f33d.appspot.com",
  messagingSenderId: "667471580210",
  appId: "1:667471580210:web:935b68e97210a24989402b",
  measurementId: "G-V4ZVL1Y1M1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();