import NoticeContext from "../contexts/NoticeContext.js"
import {useState,useEffect,useContext} from "react";
import AuthContext from "../contexts/AuthContext.js";
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore } from "firebase/firestore";  
import {db} from '../firebase/initFirebase';

function NoticeContextWrapper({children}) {

    const [notice,setNotice] = useState([])

    const { user} = useContext(AuthContext)
   
    // const db = getFirestore(app)
  useEffect(()=>{
    
    const collRef =collection(db, "Notices")
    if(user && user.uid){
      const q = query(collRef, orderBy("lastupdate","desc"),where(`active`,`==`,true));
  
      const unsubscribe = onSnapshot(q , (querySnaphot) =>{
        setNotice(querySnaphot.docs.map(doc => ({...doc.data(),id: doc.id, timestamp: doc.data().lastupdate?.toDate().getTime()})))
      })
    }
    
    return unsubscribe
  },[user])

    const values = {
        notice,setNotice,
    }
    return (
        <NoticeContext.Provider value={values}>
            {children}

        </NoticeContext.Provider>
    )

}

export default NoticeContextWrapper