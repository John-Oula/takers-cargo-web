import ReactPDF from '@react-pdf/renderer';
import Waybill from '../../Components/Waybill';
const QRCode = require('qrcode')
export default async function  handler(req, res) {
 const qr =  QRCode.toDataURL(`/trackingNumber/${req.body.trackingNumber}`, async function (err, url) {
  const pdfStream = await ReactPDF.renderToStream(<Waybill data={req.body} qr={url} />);
  res.setHeader('Content-Type', 'application/pdf');
  pdfStream.pipe(res);
   pdfStream.on('end', () => console.log('Done streaming, response sent.'));
})




   
    //  res.status(200).json({ name: qr })
  }
  