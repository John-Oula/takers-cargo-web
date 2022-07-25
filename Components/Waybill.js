import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'react-qr-code';
import logo from "../assets/takers_white_bg.jpg"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    border: `1px`
  },
  subSection: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    fontSize: `10px`,
    borderColor: `black`,
    borderTopWidth:`0.5px`,
    borderBottomWidth:`0.5px`,
  },
  flexEndSubSection: {
    margin: 0,
    padding: 5,
    justifyContent: `flex-end`,
    flexGrow: 1,
    display: `flex`,
    fontSize: `10px`,
    flexDirection: 'row',


  },
  flexStartSubSection: {
    margin: 0,
    padding: 5,
  
    justifyContent: `flex-start`,
    flexGrow: 1,
    display: `flex`,
    fontSize: `10px`,
    flexDirection: 'row',
 
 
  },
  section: {
    margin: 10,
    padding: 0,
    flexGrow: 1,
    border: `1px`,
    borderColor: `black`,
    borderWidth:`1px`,
  },
  flexGrow:{
    flexGrow:1
  },
  logo:{
    height: `auto`,
    maxHeight: `60px`,
    width: `100px`
  }, 
   qr:{
    height: `100px`,
    width: `100px`
  },
  textBox:{
    marginBottom:10
  },
  heading:{
    fontSize:14
  }
});

// Create Document Component
const Waybill = ({data,qr}) => (
  <Document>
    <Page size="A5" style={styles.page}>
    <View>
    <View>
        {/* <Image src={"https://react-pdf.org/images/logo.png"} style={styles.logo} /> */}
      </View>
      <View style={styles.section}>
      
        {/* <QRCode value='/' size={120} /> */}
        <View style={styles.flexStartSubSection}>
      <View style={styles.flexStartSubSection} >
     {qr && <Image src={qr} style={styles.qr} />}
       
        </View>
        <View style={styles.flexEndSubSection}>
        <Text style={styles.heading}>{data?.trackingNumber}</Text>
        
        </View>
      </View>
        <View style={styles.subSection}>
        <View style={styles.flexStartSubSection}>
     <View>
     <View style={styles.textBox}>
          <Text>From: {data?.origin.country}</Text>
   
        </View>
        <View style={styles.textBox}>
        <Text>To: {data?.destination?.fullname},{data?.destination?.phone},{data?.destination?.country},{data?.destination?.detailedAddress}</Text>
        </View>
     </View>
        </View>
        
      </View>
     <View style={styles.subSection}>
     <View style={styles.flexStartSubSection}>
        {/* <QRCode value='/' size={120} /> */}
        
        <View style={styles.flexStartSubSection} >
        <Text>Product Category</Text>
       
        </View>
        <View style={styles.flexEndSubSection}>
        <Text>{data?.bailment.length > 1 ? `Mixed` : data?.bailment[0].type}</Text>
        
        </View>
         
        
      </View>
     </View>
      <View style={styles.subSection}>
      <View style={styles.flexStartSubSection}>
        {/* <QRCode value='/' size={120} /> */}
        
       <View style={styles.flexStartSubSection}>
       <View style={styles.flexStartSubSection} >
        <View >
        <Text>Transportation</Text>
        <Text>{data?.method}</Text>
        </View>
       
        </View>
        <View style={styles.flexStartSubSection}>
        <View>
        <Text>Total Quantity</Text>
        <Text>{data?.totalQuantity}</Text>
        </View>
        
        </View>
       </View>
        <View style={styles.flexEndSubSection}>
        <View style={styles.flexStartSubSection} >
        <View>
        <Text>Invoice Date</Text>
        <Text>{data?.creationDate}</Text>
        </View>
       
        </View>
        <View style={styles.flexStartSubSection}>
        <View>
        <Text>Payment Method</Text>
        <Text>{data?.paymentMethod}</Text>
        </View>
        
        </View>
        </View>
        
      </View>
      </View>
     
     <View style={styles.subSection}>
     <View style={styles.flexStartSubSection}>
      <View style={styles.flexStartSubSection} >
        <Text>Total Costs</Text>
       
        </View>
        <View style={styles.flexEndSubSection}>
        <Text>${data?.price}</Text>
        
        </View>
      </View>
        
     </View>
      <View style={styles.flexStartSubSection}>
      <View style={styles.flexStartSubSection} >
        <Text>Remarks</Text>
       
        </View>
        <View style={styles.flexEndSubSection}>
        <Text>{data?.remarks}</Text>
        
        </View>
      </View>
      <View style={styles.subSection}>
      <View style={styles.flexStartSubSection}>
      <View style={styles.flexStartSubSection} >
        <Text>Recepient</Text>
       
        </View>
        <View style={styles.flexEndSubSection}>
        <Text>{data?.destination?.fullname}</Text>
        
        </View>
      </View>
      </View>
      <View style={styles.flexStartSubSection}>
      <View style={styles.flexStartSubSection} >
        <Text>Express Number(s)</Text>
       
        </View>
        <View style={styles.flexStartSubSection}>
        <View>
        {data?.bailment.slice(0,3).map(each =>(<Text>{each.expressNumber}</Text>))}
        </View>
        
        </View>
      </View>
      </View>
    </View>
    
      
    </Page>
  </Document>
);

export default Waybill