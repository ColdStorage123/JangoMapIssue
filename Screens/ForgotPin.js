import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import axios from 'axios';
const ForgetPin = () => {

  
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const handleResetPin = async () => {
        setPhoneNumberError(null);
      
        if (!phoneNumber.trim()) {
          setPhoneNumberError('Phone Number is required *');
          return;
        }
      
        try {
          const response = await axios.get(`https://jango-api-dev.jangoaddress.com/forgotPincode.php?phone_number=${phoneNumber}`);
          console.log('Response from the server:', response.data);
          // Handle the response from the server as needed
        } catch (error) {
          console.error('Error:', error);
          // Handle errors, such as displaying an error message
        }
      };
      

  return (
      <View style={styles.container}>
          

          
      <Image
    source={require('../assets/images/cuate.png')} // Replace with the correct path to your image
    style={styles.resetImage} // Apply custom styles to the image here
          /> 
          <Text style={styles.heading}>Forgot your pin</Text>
          <Text style={styles.subheading}>Enter your phone number below to {'\n'}create new pin</Text>
          <View style={styles.inputContainer}>
       

<PhoneInput
  value={phoneNumber}
  defaultCode="US"
  layout="second"
  withDarkTheme
  textInputProps={{
    style: [
      styles.phoneNumberInput,
      styles.inputContainer2,
      {
        paddingLeft: moderateScale(20),
        fontFamily: 'Montserrat-Regular', // Apply the same font family
      },
    ],
    placeholder: 'Phone Number',
    marginLeft: moderateScale(10),
    top: verticalScale(-1),
  }}
  flagButtonStyle={{
    marginTop: verticalScale(10), // Adjust the margin to move the flag button down
  }}
  countryPickerButtonStyle={{
    marginTop: verticalScale(10), // Adjust the margin to move the country picker button down
  }}
  textProps={{
    style: {
      color: '#000000cc',
      fontWeight: 'normal',
      fontFamily: 'Montserrat-Regular', // Apply the same font family
    },
  }}
  onChangeFormattedText={(text) => {
    // 'text' here contains the formatted number including the country code
    console.log('Formatted Phone Number:', text);
    setPhoneNumber(text);
    setPhoneNumberError('');
  }}
/>

  <Text style={[styles.errorText, { fontFamily: 'Montserrat-Regular' }]}>
    {phoneNumberError}
  </Text>
</View>

          <TouchableOpacity style={styles.resetButton} onPress={handleResetPin}>
        <Text style={styles.resetButtonText}>Recover pin</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#00E', // Blue color
    marginBottom: moderateScale(20),
    top: verticalScale(-80),
    left: 0,
    fontFamily: 'Inter',
    lineHeight: moderateScale(28.8),
    letterSpacing: moderateScale(0.8),
  },
  subheading: {
    color: '#000',
    fontFamily: 'Inter', // Make sure to load the correct font
    fontSize: moderateScale(14),
    fontWeight: '400',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.2),
    textAlign: 'center',
    top: verticalScale(-100),
  },
  input: {
    flex: 1, // Take up remaining space
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    fontSize: moderateScale(16),
    height: verticalScale(50),
    width: scale(328),
    color: '#00000040', // Text color with opacity
    fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontWeight: '400',
    letterSpacing: moderateScale(0.48), // Letter spacing
    lineHeight: moderateScale(17.3), // Line height
    position: 'absolute', // Position fixed is not available in React Native, use 'absolute' instead
    top: 0,
    left: 0,
    marginLeft: moderateScale(25),
  },
  resetButton: {
    backgroundColor: '#00E', // You can replace this color with your desired color
    borderRadius: moderateScale(3),
    height: verticalScale(40),
    width: scale(328),
    top: verticalScale(-100),
    left: 0,
  },
  errorText: {
    top: verticalScale(-80),
    color: 'red', // Change the text color to red
    fontSize: moderateScale(7), // Adjust the font size
    marginTop: verticalScale(-20), // Add some space between the input field and the error message
    marginLeft: scale(240), // Add some space between the input field and the error
    paddingTop: moderateScale(1), // Add some space between the input field and the error
  },
  resetButtonText: {
    
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#FFF', // Text color
    fontFamily: 'Inter', // Replace with the appropriate font family
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.16),
    textAlign: 'center',
    paddingTop: moderateScale(10),
    top: 0,
    left: 0,
  },
  line: {
    height: moderateScale(1),
    top: verticalScale(29.3),
    left: scale(120),
    width: scale(84),
    resizeMode: 'cover',
    color: 'red',
    backgroundColor: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
    marginTop: verticalScale(20),
  },
  resetImage: {
    marginLeft: 0,
    position: 'fixed',
    marginBottom: verticalScale(90),
  },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: moderateScale(2),
        height: verticalScale(50),
        width: scale(330),
        elevation: 2,
        color: 'rgba(0, 0, 0, 0.4)',
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(12),
        fontWeight: '400',
        letterSpacing: moderateScale(0.48),
        lineHeight: moderateScale(17.3),
        top: verticalScale(-80),
        left: 0,
        marginBottom: verticalScale(50),
    },
    phoneNumberInput: {
        fontSize: moderateScale(16),
        height: moderateScale(30),
        color: '#00000040',
        fontSize: moderateScale(12),
        fontWeight: '400',
        letterSpacing: moderateScale(0.48),
        lineHeight: moderateScale(17.3),
        position: 'absolute',
        top: 0,
        left: -1,
    },
    inputContainer2: {
        top: 0,
        marginBottom: verticalScale(10),
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: moderateScale(2),
        borderWidth: moderateScale(0.5),
        borderColor: '#ffffff',
        elevation: Platform.OS === 'android' ? moderateScale(5) : 0,
        height: verticalScale(50),
        width: scale(240),
        flexShrink: 0,
        zIndex: 1,
      },
});

export default ForgetPin;
