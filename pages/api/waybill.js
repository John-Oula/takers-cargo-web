import ReactPDF from '@react-pdf/renderer';
import Waybill from '../../Components/Waybill';

export default async function  handler(req, res) {
    const pdfStream = await ReactPDF.renderToStream(<Waybill data={req.body} />);
res.setHeader('Content-Type', 'application/pdf');
pdfStream.pipe(res);
 pdfStream.on('end', () => console.log('Done streaming, response sent.'));

   
//      res.status(200).json({ name: 'John Doe' })
  }
  