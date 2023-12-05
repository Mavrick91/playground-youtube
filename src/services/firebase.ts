import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDfgwgTK_zy7-n54DP0iIrKnHK98iW9oXw",
    authDomain: "vidventure-c31d0.firebaseapp.com",
    projectId: "vidventure-c31d0",
    storageBucket: "vidventure-c31d0.appspot.com",
    messagingSenderId: "902832946249",
    appId: "1:902832946249:web:2a91d8bbb5ca23dcf31398",
    measurementId: "G-QVXME0ECPH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app }