/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null)

export const userAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid)
                const userDoc = await getDoc(userDocRef)
                if (userDoc.exists()) setProfile(userDoc.data())
            } else {
                setProfile(null)
            }
            setLoading(false)
        })
        return unsubscibe
    }, [])

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signup = async (name, email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        const user = result.user
        await updateProfile(user, { displayName: name })

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            authProvider: "local"
        })
        return user
    }
    const logout = () => {
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, profile, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}