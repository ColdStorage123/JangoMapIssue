import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import axios from 'axios';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  

  const handleResetPassword = () => {
    setEmailError(null);

    if (!email.trim()) {
      setEmailError('Email is required *');
      return;
    }

    // Send a GET request to the server with the email provided
    axios
      .get(`https://jango-api-dev.jangoaddress.com/forgotPassword.php?email=${email}`)
      .then((response) => {
        console.log('Response from the server:', response.data);
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors, such as displaying an error message
      });
  };

  return (
      <View style={styles.container}>
          

          
      <Image
    source={require('../assets/images/ForgetpwdBackground1.png')} // Replace with the correct path to your image
    style={styles.resetImage} // Apply custom styles to the image here
          /> 
          <Text style={styles.heading}>Forgot your password</Text>
          <Text style={styles.subheading}>Enter your email below to recover{'\n'} your password</Text>
     <View style={styles.inputContainer}>
          <Image
              source={require('../assets/images/email.png')}
              style={styles.iconEmail}
            />
        <TextInput
          style={styles.input}
          placeholder="Email "
          value={email}
          onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
          keyboardType="email-address"
        />
      </View>
      {emailError && (
  <Text style={styles.errorText}>{emailError}</Text>
)}

      {/* <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Recover password</Text>
      </TouchableOpacity> */}
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Recover password</Text>
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
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle:'normal',
    color: '#00E',
    marginBottom: moderateScale(20),
    top: verticalScale(-80),
    left: 0,
    lineHeight: moderateScale(28.8),
  },
  subheading: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(14),
    fontWeight: '400',
    letterSpacing: 0.56,
    lineHeight: moderateScale(20.2),
    textAlign: 'center',
    top: verticalScale(-100),
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    height: verticalScale(50),
    width: scale(330),
    elevation: 2,
    color: 'rgba(0, 0, 0, 0.4)',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(12),
    fontWeight: '400',
    letterSpacing: 0.48,
    lineHeight: moderateScale(17.3),
    marginBottom: moderateScale(20),
    top: verticalScale(-80),
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    fontSize: moderateScale(16),
    height: verticalScale(50),
    width: scale(328),
    color: '#00000040',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(12),
    fontWeight: '400',
    letterSpacing: 0.48,
    lineHeight: moderateScale(17.3),
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: scale(25),
  },
  resetButton: {
    backgroundColor: '#0000ee',
    borderRadius: moderateScale(3),
    height: verticalScale(40),
    width: scale(328),
    top: verticalScale(-60),
    left: 0,
  },
  iconEmail: {
    height: moderateScale(12),
    width: scale(15),
    marginLeft: scale(15),
    top: verticalScale(20),
  },
  errorText: {
    top: verticalScale(-80),
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: verticalScale(-20),
    marginLeft: scale(240),
    paddingTop: moderateScale(1),
  },
  resetButtonText: {
    color: 'white',
    fontSize: moderateScale(14),
    
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: moderateScale(14),
    fontWeight: '600',
    letterSpacing: 0.56,
    lineHeight: moderateScale(20.12),
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: verticalScale(10),
    top: 0,
    left: 0,
  },
  line: {
    height: 1,
    top: verticalScale(29.3),
    left: scale(120),
    width: scale(84),
    resizeMode: 'cover',
    color: 'red',
    height: 1,
    backgroundColor: '0px 2px 4px 0px rgba(0, 0, 0, 0.1);',
    marginTop: verticalScale(20),
  },
  resetImage: {
    // top: verticalScale(-90),
    height: verticalScale(231),
    width: scale(206.202),
   marginBottom: verticalScale(90),
  },
});

export default ForgetPassword;
