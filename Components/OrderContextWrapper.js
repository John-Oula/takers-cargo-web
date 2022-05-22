import OrderContext from "../contexts/OrderContext.js"
import {useState,useEffect,useContext} from "react";
import AuthContext from "../contexts/AuthContext.js";
import { onSnapshot,collection, orderBy, limit,query, where, getFirestore ,getDocs, updateDoc} from "firebase/firestore";  
import {db} from '../firebase/initFirebase';
import { updateDocument ,getOneDocument } from "../lib/index.js";

function OrderContextWrapper({children}) {

    const [order, setOrder] = useState([])
    const [userId, setUserId] = useState("")
    const userData = JSON.parse(localStorage.getItem(`userData`))

    const { user} = useContext(AuthContext)
   
    const update = async () =>{
         await  getDocs(collection(db, "Bookings")).then(querySnapshot =>{
         querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

 doc.data().bookedFor?.map(each =>
    {
      if(each == doc.data().userId){
        getOneDocument(each,`Users`)
        .then((snap) =>{
          snap.data()?.phone &&  updateDocument(doc.id,`Bookings`,{bookedFor:[snap.data()?.phone]})
      
        })
         
        .catch(error => alert(error.message))
      }
    })



 
});  
     })
       .catch(error => alert(error.message))

    }
  useEffect( ()=>{
    // update()
    
    const collRef =collection(db, "Bookings")


    
    if(user && user.uid){
      const q = query(collRef, where("bookedFor", "array-contains", userData.phone));
  
      const unsubscribe = onSnapshot(q , (querySnaphot) =>{
        setOrder(querySnaphot.docs.map(doc => ({...doc.data(),id: doc.id, timestamp: doc.data().creationDate?.toDate().getTime() ,latestUpdateTime: doc.data().creationDate?.toDate().getTime()})).reverse())
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