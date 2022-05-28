import AuthContext from "../contexts/AuthContext"
import {useState,useEffect} from "react";
import { auth } from '../firebase/initFirebase';
import { updatePassword,GoogleAuthProvider,signOut,reauthenticateWithCredential ,updateEmail,EmailAuthProvider, sendPasswordResetEmail ,updateProfile,onAuthStateChanged ,sendEmailVerification, signInWithEmailAndPassword ,signInWithRedirect,createUserWithEmailAndPassword} from "firebase/auth";
import { getOneDocument} from '../lib'
function AuthContextWrapper({children}) {

    const [user, setUser] = useState({})
    const [loading,setLoading] = useState(true)
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, user =>{
            if(user){
                setUser(user)
                getOneDocument(user?.uid,`Users`)
                .then( doc =>{
                    localStorage.setItem(`userData`,JSON.stringify(doc.data()))
                })
                .catch(
                    error =>{
                        console.log(error.message)
                    }
                )
                .finally(() =>  setLoading(false)
                )
            }
            else{
                 setUser(null)
                 localStorage.removeItem(`userData`)
                setLoading(false)
                }
        })
        return () =>{ unsubscribe()}
    },[])

    // useEffect(()=>{
    //     const userData = localStorage.getItem(`userData`)
        
    //     if(user && !userData){
    //         getOneDocument(user?.uid,`Users`)
    //         .then( doc =>{
    //             localStorage.setItem(`userData`,JSON.stringify(doc.data()))
    //         })
    //         .catch(
    //             error =>{
    //                 console.log(error.message)
    //             }
    //         )
    //     }
    // },[user])



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

    const updateUserProfile = async (auth,data) =>{
        return await updateProfile(auth, data)
          
    }

    const emailVerification = async (auth,actionCodeSettings ) =>{
        return await sendEmailVerification(auth,actionCodeSettings )
        
    }

    const emailUpdate = async (user,email) =>{
        return await updateEmail(user,email)
    }
    const reAuthUser = async  (user,{email,password}) =>{
        const credential =  EmailAuthProvider.credential(email,password)

        return await reauthenticateWithCredential(user,credential)
    }

    const resetPassword = async (email,actionCodeSettings) =>{
        return await sendPasswordResetEmail(auth,email,actionCodeSettings)
    }

    const passwordUpdate = async (user, newPassword) =>{
        return await updatePassword(user, newPassword)
    }
    const logout = () =>{
        return signOut(auth)
    }
    const values = {
        user, setUser,login,signup,googleSignin,logout,updateUserProfile,emailVerification,resetPassword,emailUpdate,reAuthUser,passwordUpdate
    }
    
    return (
        <AuthContext.Provider value={values}>
            {!loading && children}

        </AuthContext.Provider>
    )

}

export default AuthContextWrapper