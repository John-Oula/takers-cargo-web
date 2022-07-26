
import nodemailer from "nodemailer";

import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD','POST'],
})
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) { 
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }
export default  async  (req, res) => {
 

 

    const body = JSON.parse(JSON.stringify({...req.body}));
 console.log(body.emailContent)
    const user = 'service@takerscargo.com'
    const pass = 'Takers2021@'

  // Use Smtp Protocol to send Email
  
  const transporter = nodemailer.createTransport({
    host: 'server54.web-hosting.com',
    port: 465,
    secure: true,
    auth: {
      user:user,
      pass: pass,
    },
  });

let emailPromiseArray = [];

  //prepare the email for each receiver
  for(let i=0;i<body.emailContent.length;i++){
       emailPromiseArray.push(
           sendMail({
            from: user,
            to: body.emailContent[i].email,
                subject: "Your package has arrived",
                html: `
                <p>Dear ${body.emailContent[i].fullname},</p><br>
                <p>Your package <strong>${body.emailContent[i].trackingNumber}</strong>  has arrived.</p>
                <p>To view package details please login to your account on our <strong><a href="https://www.takerscargo.com">website</a></strong> or Mobile App
                and collect it in our offices as soon as possible. </p><br>
                <p>Thank you for shipping with us.</p><br>
                <br>
                <br>
                <br>
                <p>Regards,</p><br>
                <p>Takers Cargo</p>
           
        
                `,
           })
       )
  }

  //run the promise
  Promise.all(emailPromiseArray).then((result)=>{
      console.log('all mail completed');
      return res.status(200).json({ message: "Email Notifications sent" })

  }).catch((error)=>{
      console.log(error);
      return res.status(200).json({ message: error.message })

  })

  function sendMail(mail){

      return new Promise((resolve,reject)=>{
          transporter.sendMail(mail, function(error, response){
      if(error){
          console.log(error);
          reject(error);
      }else{
          // console.log("Message sent: " + JSON.stringify(response));
          resolve(response);
      }

      transporter.close();
          });
      })
  }
}