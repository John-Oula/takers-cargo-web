
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
    const body = JSON.parse(req.body);

    const user = 'service@takerscargo.com'
    const pass = 'Takers2021@'

  // Use Smtp Protocol to send Email
  console.log(body)
  const transporter = nodemailer.createTransport({
    host: 'server318.web-hosting.com',
    port: 465,
    secure: true,
    auth: {
      user:user,
      pass: pass,
    },
  });

let emailPromiseArray = [];

  //prepare the email for each receiver
  for(let i=0;i<emails.length;i++){
       emailPromiseArray.push(
           sendMail({
            from: user,
            to: body.email[i],
                subject: "Your package has arrived",
                html: `
                <p>Dear ${body.fullname} </p><br>
                <p>Your package <strong>${body.trackingNumber}</strong>  as arrived.</p>
                <p>To view package details please login to your account on our website or Mobile App
                and collect it in our offices as soon as possible. </p><br>
                <p>Thank you for shipping with us</p><br>
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
  }).catch((error)=>{
      console.log(error);
  })

  function sendMail(mail){

      return new Promise((resolve,reject)=>{
          transporter.sendMail(mail, function(error, response){
      if(error){
          console.log(error);
          reject(error);
      }else{
          console.log("Message sent: " + JSON.stringify(response));
          resolve(response);
      }

      transporter.close();
          });
      })
  }
}