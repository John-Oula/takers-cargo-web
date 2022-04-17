import OrderContext from "../contexts/OrderContext.js"
import {useState,useEffect,useContext} from "react";
import AuthContext from "../contexts/AuthContext.js";
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore } from "firebase/firestore";  
import {db} from '../firebase/initFirebase';

function OrderContextWrapper({children}) {

    const [order, setOrder] = useState([])

    const { user} = useContext(AuthContext)
   
    // const db = getFirestore(app)
  useEffect(()=>{
    
    const collRef =collection(db, "Bookings")
    if(user && user.uid){
      const q = query(collRef, where("userId", "==", user?.uid), orderBy("creationDate",'desc'));
  
      const unsubscribe = onSnapshot(q , (querySnaphot) =>{
        setOrder(querySnaphot.docs.map(doc => ({...doc.data(),id: doc.id, timestamp: doc.data().creationDate?.toDate().getTime() ,latestUpdateTime: doc.data().creationDate?.toDate().getTime()})))
      })
    }
    
    return unsubscribe
  },[user])

    const values = {
        order, setOrder
    }
    return (
        <OrderContext.Provider value={values}>
            {children}

        </OrderContext.Provider>
    )

}

export default OrderContextWrapper