import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkFZPkg4K_3Jwtx1AN-u_CwE-xZ9dz62g",
  authDomain: "gymgenius-423607.firebaseapp.com",
  projectId: "gymgenius-423607",
  storageBucket: "gymgenius-423607.appspot.com",
  messagingSenderId: "83816738339",
  appId: "1:83816738339:web:26c1ff94994027ab784b96",
  measurementId: "G-R278CK96TV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
