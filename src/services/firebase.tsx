import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_yufx4BOFVa2uk51-n2Us219GDkQZFkk",
  authDomain: "teamspend-b665d.firebaseapp.com",
  projectId: "teamspend-b665d",
  storageBucket: "teamspend-b665d.firebasestorage.app",
  messagingSenderId: "81248760961",
  appId: "1:81248760961:web:a66d3e2b01dc94e9f18980",
  measurementId: "G-VPMLG0JV7V"
};
const firebaseProdConfig = {
  apiKey: "AIzaSyBLSYwQFibkeECDq7NGGl87YJyR9O91NAU",
  authDomain: "teamspendprod.firebaseapp.com",
  projectId: "teamspendprod",
  storageBucket: "teamspendprod.firebasestorage.app",
  messagingSenderId: "664080713774",
  appId: "1:664080713774:web:f81a935f61f50392f8b7bf",
  measurementId: "G-JDXR1DLDFQ"
};
  const app = process.env.NODE_ENV === 'development' ? initializeApp(firebaseConfig) : initializeApp(firebaseProdConfig);
  const auth = getAuth(app);
  const refreshUserToken = async () => {
    var user = auth.currentUser
    if (user) {
      return await user.getIdToken(true);
    }
  }
  export { auth, refreshUserToken };