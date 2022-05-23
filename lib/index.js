import {db,storage} from '../firebase/initFirebase'
import {  setDoc,collection,doc, getDocs,getDoc,addDoc,updateDoc,where ,arrayUnion, query, deleteDoc} from 'firebase/firestore'
import { getStorage, ref,uploadBytes ,getDownloadURL } from "firebase/storage";

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
export const updateDocumentInSubCollection = async (coll,id,subColl,subId,data) => {
    console.log(data);
    const docRef = doc(db, coll, id,subColl+'/'+subId);
    // const subColRef = collection(docRef,subColl+'/'+subId);
     
    return await updateDoc(docRef,data);
}

export const deleteDocument = (id,coll) => {
    return db.collection(collection).doc(id).delete()

}

export const deleteSubCollectionDocument = async (coll,id,subColl,subId) => {
    
    const docRef = doc(db, coll, id,subColl+'/'+subId);
    // const subColRef = collection(docRef,subColl+'/'+subId);
     
    return await deleteDoc(docRef);
}
export const getCollection = (coll) => {
    return db.collection(collection)
}
export const getOneDocument = async (id,coll) => {
    const docRef = doc(db, coll, id);
    return await getDoc(docRef);
    
}
export const addImage = (id,coll,data) => {

}
export const updateImage = (id,coll,data) => {

}

export const uploadFile =  (path,file) =>{
    const storageRef = ref(storage, path);
    return  uploadBytes(storageRef, file)
}
export const dateTime = (date) =>{
   return moment(date).format(`DD-MM-YY hh:mm a`)
}


export const queryOneDocument = async (coll,field,op,queryData) =>{
    const collRef =collection(db, coll)
    const q =  query(collRef, where(field, op , queryData));
    return await getDocs(q)


}

// Atomically add a new region to the "regions" array field.
export const updateArrField = async (coll,field,data) =>{
    const collRef =collection(db, coll)
    await updateDoc(collRef, {
        field: arrayUnion(data)
    });
}