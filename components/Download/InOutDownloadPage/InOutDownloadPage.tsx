'use client'

import React from 'react'
import PDFPreview from '@/components/shared/PDFPreview/PDFPreview'
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import useInOutDownload from '@/components/Download/InOutDownloadPage/useInOutDownload'
import { formattedDate } from '@/lib/utils'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  headerContainer: {
    borderBottom: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: '16px 12px',
  },
  companyName: {
    fontWeight: 'semibold',
    fontSize: 19,
  },
  headerDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
  headerDetailsText: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  orderDetailsContainer: {
    display: 'flex',
    padding: '0 12px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  orderDetailsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    maxWidth: '50%',
  },
  orderDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetailsTextContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    width: '100%',
  },
  orderDetailsText: {
    fontSize: 11,
    fontWeight: 'semibold',
  },
  tableContainer: {
    minHeight: '50%',
  },
  table: {
    marginTop: 20,
    width: 'auto',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '33%',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,
  },
  tableCol: {
    width: '33%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 600,
  },
  tableCell: {
    margin: 7,
    fontSize: 10,
  },
  signatureContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '0 32px',
  },
  signatureTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 55,
  },
  signatureTitle: {
    fontSize: 13,
  },
  signatureName: {
    fontWeight: 600,
    fontSize: 13,
  },
})

const InOutDownloadPage = () => {
  const {
    transactionDetails,
    isDetailsValidating,
    transactionItems,
    isItemsValidating,
  } = useInOutDownload()

  if (isDetailsValidating || isItemsValidating) {
    return <>Loading...</>
  }

  return (
    <PDFPreview>
      <Document
        title={`Movement Invoice - ${transactionDetails?.transaction_id}`}
      >
        <Page size="A4" orientation="landscape" style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.companyName}>PT. Rena Djaja</Text>
            <View style={styles.headerDetailsContainer}>
              <Text style={styles.headerDetailsText}>MOVEMENT INVOICE</Text>
              <Text style={styles.headerDetailsText}>
                ORDER #{transactionDetails?.transaction_id}
              </Text>
            </View>
          </View>
          <View style={styles.orderDetailsContainer}>
            <View style={styles.orderDetailsColumn}>
              <View style={styles.orderDetailsRow}>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>Transaction Date</Text>
                </View>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>
                    : {formattedDate(transactionDetails?.transaction_date)}
                  </Text>
                </View>
              </View>
              <View style={styles.orderDetailsRow}>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>Location</Text>
                </View>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>
                    :{' '}
                    {transactionDetails?.warehouse_name ||
                      transactionDetails?.plate_number}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.orderDetailsColumn}>
              <View style={styles.orderDetailsRow}>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>Printed Date</Text>
                </View>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>
                    : {formattedDate(new Date().toDateString())}
                  </Text>
                </View>
              </View>
              <View style={styles.orderDetailsRow}>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>Movement Type</Text>
                </View>
                <View style={styles.orderDetailsTextContainer}>
                  <Text style={styles.orderDetailsText}>
                    : {transactionDetails?.movement_type}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Product Name</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Variant Name</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>Quantity</Text>
                </View>
              </View>
              {transactionItems?.map((each, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{each.product_name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{each.variant_name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {each.quantity} {each.unit}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.signatureContainer}>
            <View style={styles.signatureTextContainer}>
              <Text style={styles.signatureTitle}>Mengetahui,</Text>
              <Text style={styles.signatureName}>Linda</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFPreview>
  )
}

export default InOutDownloadPage
