import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import QRCode from 'react-qr-code';

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
    
    borderColor: `black`,
    borderTopWidth:`0.5px`,
    borderBottomWidth:`0.5px`,
  },
  section: {
    margin: 10,
    padding: 0,
    flexGrow: 1,
    border: `1px`,
    borderColor: `black`,
    borderWidth:`1px`,
  }
});

// Create Document Component
const Waybill = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      </View>
      <View style={styles.section}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      <View style={styles.subSection}>
        {/* <QRCode value='/' size={120} /> */}
        <Text>"data?.trackingNumber"</Text>
        <Text>"data?.trackingNumber"</Text>
        
      </View>
      </View>
      
    </Page>
  </Document>
);

export default Waybill