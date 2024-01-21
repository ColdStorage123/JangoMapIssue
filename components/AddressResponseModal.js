import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const AddressResponseModal = ({ visible, onClose, title, message, buttonText, onPress,addressFound }) => {

  
  

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
      {buttonText && onPress ? (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
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






  // const [apiResponse, setApiResponse] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userId = "bcf1fdd51915f01d"; // replace with your actual userId
  //       const latitude = 31.4728862677; // replace with your actual latitude
  //       const longitude = 74.3592818; // replace with your actual longitude
  
  //       const response = await axios.get('https://jango-api-dev.jangoaddress.com/checkGlobalAddress.php', {
  //         params: { id: userId, latitude, longitude },
  //       });
  
  //       console.log('Axios Response:', response); // Add this line to log the entire Axios response
  
  //       setApiResponse(response);
  //       console.log('Global Model Muaaz:', response.data); // Change this line to log only the data property of the Axios response
  //     } catch (error) {
  //       console.error('API Error:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
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
    height: verticalScale(130),
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


//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addressFoundContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: 338,
//     height:130,
//   },
//   addressNotFoundContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: 338,
//     height:206,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: 338,
//     height:130,
//   },
//   titleText: {
//     color: '#000',
//     textAlign: 'center',
//     fontFamily: 'GenBkBasB',
//     fontSize: 12,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 17.28,
//   },
//   messageText: {
//     color: '#36B422',
//     textAlign: 'center',
//     fontFamily: 'GenBkBasB',
//     fontSize: 14,
//     fontStyle: 'normal',
//     fontWeight: '700',
//     lineHeight: 20.16,
//     letterSpacing: 0.56,
//     textDecorationLine: 'underline',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   closeIcon: {
//     width: 8.45,
//     height: 8.45,
//   },
//   button: {
//     width: 95,
//     height:29,
//     marginTop: 15,
//     backgroundColor: '#00E',
//     // padding: 10,
//     borderRadius: 5,
//      alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#FFF',
//     textAlign: 'center',
//     fontFamily: 'GenBkBasB',
//     fontSize: 9,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 17.28,
//     letterSpacing: 0.48,
//    top: 5,
//   },


// // ADDRESS  not FOUND


//   notFoundTitle: {
//     color: '#000',
//     textAlign: 'center',
//     fontFamily: 'GenBkBasB',
//     fontSize: 12,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 17.28, // This is equivalent to 144%
//     letterSpacing: 0.48,
//     marginTop: -20,
// },
//   alertIcon: {
//     height: 17,
//     width: 17,
//     marginTop: -35,
//     right:4,
// },
// containerSub: {
//   flexDirection: 'row', // Horizontal layout
//   alignItems: 'center', // Align items vertically
//   // padding: 10, // Add padding as needed
//   top: 20,

// },

// boldText: {
//   color: '#00E', // Replace with your color variable or default to #00E
//   textAlign: 'center',
//   fontFamily: 'GenBkBasB',
//   fontSize: 14,
//   fontStyle: 'normal',
//   fontWeight: '400',
//   lineHeight: 20.16,
//   letterSpacing: 0.56,
//   marginTop: 30,
//   marginBottom:30,
// },
// createAddressButton: {
//   width: 153,
//   height: 29,
//   backgroundColor: '#00E',
//   borderRadius: 3,
//   alignSelf: 'center',
//   top: 5,
// },







});

export default AddressResponseModal;


////

// import React, { useState, useEffect } from 'react';
// import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { Share } from 'react-native';

// const AddressResponseModal = ({ visible, onClose, title, message, buttonText, onPress }) => {
//   const [apiResponse, setApiResponse] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://jango-api-dev.jangoaddress.com/checkGlobalAddress.php');
//         setApiResponse(response);
//       } catch (error) {
//         console.error('API Error:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSharePress = async () => {
//     try {
//       await Share.share({
//         message: apiResponse?.data?.formatted_address || '', // Make sure to check if data is available
//       });
//     } catch (error) {
//       console.error('Error sharing address:', error.message);
//     }

//     onClose(); // Close the modal after sharing
//   };

//   const renderContent = () => {
//     if (apiResponse && apiResponse.data && apiResponse.data.formatted_address) {
//       // Render content when address is found
//       return (
//         <>
//           <Text style={styles.foundTitleText}>{title}</Text>
//           <Text style={styles.addressText}>{apiResponse.data.formatted_address}</Text>
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Image
//               source={require("../assets/images/close.png")}
//               style={styles.closeIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleSharePress} style={styles.shareButton}>
//             <Text style={styles.buttonText}>{buttonText}</Text>
//           </TouchableOpacity>
//         </>
//       );
//     } else {
//       // Render content when address is not found
//       return (
//         <>
//           <Text style={styles.notFoundTitleText}>{title}</Text>
//           <Text style={styles.notFoundMessageText}>{message}</Text>
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Image
//               source={require("../assets/images/close.png")}
//               style={styles.closeIcon}
//             />
//           </TouchableOpacity>
//         </>
//       );
//     }
//   };

//   return (
//     <Modal
//       transparent
//       visible={visible}
//       animationType="slide"
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           {renderContent()}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     padding: 20,
//     borderRadius: 10,
//     width: 338,
//     height: 206,
//     backgroundColor: '#FFF',
//   },
//   foundTitleText: {
//     color: '#000',
//     textAlign: 'center',
//     fontFamily: 'GentiumBookBasic',
//     fontSize: 12,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 17.28,
//   },
//   addressText: {
//     color: '#36B422',
//     textAlign: 'center',
//     fontFamily: 'GentiumBookBasic',
//     fontSize: 14,
//     fontStyle: 'normal',
//     fontWeight: '700',
//     lineHeight: 20.16,
//     letterSpacing: 0.56,
//     textDecorationLine: 'underline',
//   },
//   notFoundTitleText: {
//     color: '#000',
//     textAlign: 'center',
//     fontFamily: 'GentiumBookBasic',
//     fontSize: 12,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 17.28,
//   },
//   notFoundMessageText: {
//     color: '#000',
//     textAlign: 'center',
//     fontFamily: 'GentiumBookBasic',
//     fontSize: 12,
//     fontStyle: 'normal',
//     fontWeight: '400',
//     lineHeight: 17.28,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   closeIcon: {
//     width: 8.45,
//     height: 8.45,
//   },
//   shareButton: {
//     marginTop: 15,
//     width: 95,
//     height: 29,
//     borderRadius: 3,
//     backgroundColor: '#00E',
//     alignItems: 'center',
//     justifyContent: 'center', // Add this line
//     alignSelf: 'center', // Add this line
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default AddressResponseModal;
