import OrderContext from "../contexts/OrderContext.js"
import {useState,useEffect,useContext} from "react";
import AuthContext from "../contexts/AuthContext.js";
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore ,getDocs, updateDoc} from "firebase/firestore";  
import {db} from '../firebase/initFirebase';
import { updateDocument } from "../lib/index.js";

function OrderContextWrapper({children}) {

    const [order, setOrder] = useState([])
    const [userId, setUserId] = useState("")

    const { user} = useContext(AuthContext)
   
    // const db = getFirestore(app)
  useEffect( ()=>{
    
    const collRef =collection(db, "Bookings")
//      getDocs(collection(db, "Bookings")).then(querySnapshot =>{
//          querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
//   if(doc.data().destination.phone === doc.data().phone){
//     setUserId(doc.data().userId)
//   }
//   else{
//     setUserId(doc.data().userId)
//   }

//   updateDocument(doc.id,`Bookings`,{bookedFor:doc.data().userId})
// });  
//      })

    
    if(user && user.uid){
      const q = query(collRef, where("bookedFor", "==", user?.uid), orderBy("creationDate",'desc'));
  
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