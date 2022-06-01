import ReactPDF from '@react-pdf/renderer';
import Waybill from '../../Components/Waybill';
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
const QRCode = require('qrcode')
export default async function  handler(req, res) {
   // Run the middleware
  await runMiddleware(req, res, cors)

 const qr =  QRCode.toDataURL(`${JSON.stringify(req.body)}`, async function (err, url) {
  const pdfStream = await ReactPDF.renderToStream(<Waybill data={req.body} qr={url} />);
  res.setHeader('Content-Type', 'application/pdf');
  pdfStream.pipe(res);
   pdfStream.on('end', () => console.log('Done streaming, response sent.'));
})




   
    //  res.status(200).json({ name: qr })
  }
  