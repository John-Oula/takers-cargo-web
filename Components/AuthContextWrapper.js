import AuthContext from "../contexts/AuthContext"
import {useState,useEffect} from "react";
import { auth } from '../firebase/initFirebase';
import { GoogleAuthProvider,signOut ,updateProfile,onAuthStateChanged ,sendEmailVerification, signInWithEmailAndPassword ,signInWithRedirect,createUserWithEmailAndPassword} from "firebase/auth";

function AuthContextWrapper({children}) {

    const [user, setUser] = useState({})
    const [loading,setLoading] = useState(true)
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, user =>{
            if(user?.emailVerified){
                setUser(user)
            setLoading(false)
            }
            else{
                 setUser(null)
                setLoading(false)
                }
        })
        return () =>{ unsubscribe()}
    },[])



    const login =  async  (email,password) => {
        return  await signInWithEmailAndPassword(auth,email,password)

    }
    const signup = async  ( email, password) =>{
        return  await createUserWithEmailAndPassword(auth, email, password)

    }
    const googleSignin =  async () =>{
        const provider = new GoogleAuthProvider();

        return  await signInWithRedirect(auth, provider)

    }

    const updateUserProfile = async (data) =>{
        return await updateProfile(auth.currentUser, {data})
          
    }

    const emailVerification = async (auth) =>{
        return await sendEmailVerification(auth)
        
    }
    const logout = () =>{
        return signOut(auth)
    }
    const values = {
        user, setUser,login,signup,googleSignin,logout,updateUserProfile,emailVerification
    }
    
    return (
        <AuthContext.Provider value={values}>
            {!loading && children}

        </AuthContext.Provider>
    )

}

export default AuthContextWrapper