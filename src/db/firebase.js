import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBEsl9qkIKOJdGuLh4zWBzrvJBevX9zQVY",
    authDomain: "olx-clone-92dbd.firebaseapp.com",
    projectId: "olx-clone-92dbd",
    storageBucket: "olx-clone-92dbd.firebasestorage.app",
    messagingSenderId: "451188796374",
    appId: "1:451188796374:web:07229aa76032d958bc1277"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

const fetchFromFireStore = async () => {
    try {
        const productCollection = collection(db, "products")
        const snapShot = await getDocs(productCollection)
        const productList = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return productList
    } catch (error) {
        console.log(error)
    }
}

export { auth, provider, db, fetchFromFireStore }