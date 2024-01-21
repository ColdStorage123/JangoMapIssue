import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const JangoAddressModal = ({ visible, onClose, title, message, buttonText, buttonTextRoom, onPress, onPressRoom,addressFound }) => {

  
  

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
    >
  <View style={styles.modalContainer}>
        {/* {apiResponse?.data?.formatted_address ? ( */}
        {addressFound ? (
    // Render this view when formatted_address is found
    <View style={styles.addressFoundContainer}>
      <Text style={styles.titleText}>{title}</Text>
      {message ? (
        <Text style={styles.messageText}>{message}</Text>
      ) : null}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Image
          source={require("../assets/images/close.png")}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
  {buttonText && onPress ? (
    <TouchableOpacity onPress={onPress} style={[styles.button, { left: 20 }]}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  ) : null}
  
  {buttonTextRoom && onPressRoom ? (
    <TouchableOpacity onPress={onPressRoom} style={[styles.buttonRoom, { right: 20 }]}>
      <Text style={styles.buttonText}>{buttonTextRoom}</Text>
    </TouchableOpacity>
  ) : null}
</View>



    </View>
  ) : (
    // Render this view when formatted_address is not found
    <View style={styles.addressNotFoundContainer}>
         <View style={styles.containerSub}>
      <Image
        source={require('../assets/images/alert.png')}
        style={styles.alertIcon}
      />
      <Text style={styles.notFoundTitle}>Sorry we did not find an address for your location</Text>
    </View>

  <Text style={styles.boldText}>But No Worries!! We’ve got your back!!</Text> 
 
  <Text style={styles.notFoundTitle}> If you want an address for this location, click on the button below to create one.</Text> 


              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Image
          source={require("../assets/images/close.png")}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      {buttonText && onPress ? (
  <TouchableOpacity onPress={onPress} style={styles.createAddressButton}>
  <Text style={styles.buttonText}>Create Address</Text>
</TouchableOpacity>

      ) : null}
      {/* Add any other content specific to the "not found" case */}
    </View>
  )}
</View>

    </Modal>
  );

};
const styles = StyleSheet.create({


  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressFoundContainer: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    width: scale(338),
    height: verticalScale(201),
  },
  addressNotFoundContainer: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    width: scale(338),
    height: verticalScale(206),
  },
  modalContent: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    width: scale(338),
    height: verticalScale(130),
  },
  titleText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28),
  },
  messageText: {
    color: '#36B422',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: moderateScale(20.16),
    letterSpacing: moderateScale(0.56),
    textDecorationLine: 'underline',
  },
  closeButton: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
  },
  closeIcon: {
    width: moderateScale(8.45),
    height: moderateScale(8.45),
  },
  button: {
    width: scale(95),
    height: verticalScale(29),
    marginTop: moderateScale(15),
    backgroundColor: '#00E',
    borderRadius: moderateScale(5),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  buttonRoom: {
    width: scale(125),
    height: verticalScale(29),
    marginTop: moderateScale(15),
    backgroundColor: '#00E',
    borderRadius: moderateScale(5),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(9),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28),
    letterSpacing: moderateScale(0.48),
    top: verticalScale(5),
  },
  notFoundTitle: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28),
    letterSpacing: moderateScale(0.48),
    marginTop: verticalScale(-20),
  },
  alertIcon: {
    height: verticalScale(17),
    width: scale(17),
    marginTop: verticalScale(-35),
    right: scale(4),
  },
  containerSub: {
    flexDirection: 'row',
    alignItems: 'center',
    top: verticalScale(20),
  },
  boldText: {
    color: '#00E',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(20.16),
    letterSpacing: moderateScale(0.56),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
  },
  createAddressButton: {
    width: scale(153),
    height: verticalScale(29),
    backgroundColor: '#00E',
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    top: verticalScale(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // or 'space-around' for additional spacing
  },


});

export default JangoAddressModal;















// // AliasAddressModal.js
// import React from 'react';
// import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
// const JangoAddressModal = ({ visible, onClose, title, message, buttonText, onPress }) => (
//   <Modal
//     transparent
//     visible={visible}
//     animationType="slide"
//   >
//     <View style={styles.modalContainer}>
//       <View style={styles.modalContent}>
//         <Text style={styles.titleText}>{title}</Text>
//         <Text style={styles.messageText}>{message}</Text>
//         <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//           <Image
//             source={require("../assets/images/close.png")}
//             style={styles.closeIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onPress} style={styles.button}>
//           <Text style={styles.buttonText}>{buttonText}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>
// );

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: moderateScale(20), // Use moderateScale for dynamic scaling
//     borderRadius: moderateScale(10), // Use moderateScale for dynamic scaling
//     width: moderateScale(300), // Use moderateScale for dynamic scaling
//   },
//   titleText: {
//     color: '#000',
//     textAlign: 'center',
//     fontFamily: 'GenBkBasB',
//     fontSize: moderateScale(12), // Use moderateScale for dynamic scaling
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: moderateScale(17.28), // Use moderateScale for dynamic scaling
//   },
//   messageText: {
//     color: '#36B422',
//     textAlign: 'center',
//     fontFamily: 'GenBkBasB',
//     fontSize: moderateScale(14), // Use moderateScale for dynamic scaling
//     fontStyle: 'normal',
//     fontWeight: '700',
//     lineHeight: moderateScale(20.16), // Use moderateScale for dynamic scaling
//     letterSpacing: moderateScale(0.56), // Use moderateScale for dynamic scaling
//     textDecorationLine: 'underline',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: moderateScale(10), // Use moderateScale for dynamic scaling
//     right: moderateScale(10), // Use moderateScale for dynamic scaling
//   },
//   closeIcon: {
//     width: moderateScale(8.45), // Use moderateScale for dynamic scaling
//     height: moderateScale(8.45), // Use moderateScale for dynamic scaling
//   },
//   button: {
//     marginTop: moderateScale(15), // Use moderateScale for dynamic scaling
//     backgroundColor: 'blue',
//     padding: moderateScale(10), // Use moderateScale for dynamic scaling
//     borderRadius: moderateScale(5), // Use moderateScale for dynamic scaling
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default JangoAddressModal;
