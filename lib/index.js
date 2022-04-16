import {db} from '../firebase/initFirebase'
import {  setDoc,collection,doc, getDocs,getDoc,addDoc,updateDoc } from 'firebase/firestore'
var moment = require('moment'); // require

// coll => collections
export const addDocument = async (coll,data) => {
    console.log(data);
     
    return await addDoc(collection(db, coll), data);
}
export const addDocumentToSubCollection = async (coll,id,subColl,data) => {
    console.log(data);
    const subColRef = collection(db, coll, id, subColl);
     
    return await addDoc(subColRef,data);
}
export const addDocumentWithId = async (coll,data,id) => {
    console.log(data);
     
    return await setDoc(doc(db, coll,id), data);
}
export const updateDocument = async (id,coll,data) => {
    const docRef = doc(db, coll, id);
    return await updateDoc(docRef,data)

}
export const deleteDocument = (id,coll) => {
    return db.collection(collection).doc(id).delete()

}
export const getCollection = (coll) => {
    return db.collection(collection)
}
export const getOneDocument = async (id,coll) => {
    const docRef = doc(db, coll, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log( docSnap.data());
        return docSnap.data()
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null
      }
}
export const addImage = (id,coll,data) => {

}
export const updateImage = (id,coll,data) => {

}

export const dateTime = (date) =>{
   return moment(date).format(`DD-MM-YY hh:mm a`)
}
