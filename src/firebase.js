
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB0BG1zOjL0N4Ao6St5di6rhm-DdQrENMI",
  authDomain: "zain-chat-app.firebaseapp.com",
  projectId: "zain-chat-app",
  storageBucket: "zain-chat-app.appspot.com",
  messagingSenderId: "260408939282",
  appId: "1:260408939282:web:0b25aca6bb4c6aa5c519cb"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);