import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBFAXMRTBgVPKorI-qayzXAOxEmL-G-Eso",
  authDomain: "netflix-clone-6d8f5.firebaseapp.com",
  projectId: "netflix-clone-6d8f5",
  storageBucket: "netflix-clone-6d8f5.firebasestorage.app",
  messagingSenderId: "376761625510",
  appId: "1:376761625510:web:33d4e23b8f307fdb533d67"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const  signup = async (name,email,password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider : "local",
        email,

       })
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
        
    }
}

const login = async(email,password)=>{
    try {
        
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

        
        
    }

}

const logout = async()=>{
    
         signOut(auth);
}
export {auth,db,login,signup,logout};