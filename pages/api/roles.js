// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const admin = require('firebase-admin')
var serviceAccount =  require('../../serviceAccountKey.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://takers-cargo-default-rtdb.firebaseio.com"
// });

export default async function handler(req, res) {
  console.log(JSON.parse(req.body));
  const body = JSON.parse(req.body);
  const uid = body.uid;
  const email = body.email;
  const domain = email.split(`@`)[email.split(`@`).length-1]
  


  const customClaims = {admin: domain === `takerscargo.com` ? true : false }
  try {
   await admin.auth().setCustomUserClaims(uid,customClaims)
    .then((user) =>{
      // admin.auth().getUser(uid)
      // .then((userRecord) => {
      //   // The claims can be accessed on the user record.
      //   console.log(userRecord.customClaims['admin']);
      // });
      return res.status(200).json({ message: true })
  
    })
    .catch((error)=>{
      return res.status(200).json({ message: error.message })
  
    })
    
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
                

}
