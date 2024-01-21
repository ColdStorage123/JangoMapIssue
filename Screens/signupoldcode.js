import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';
const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Validation functions (customize these as needed)
  const isEmailValid = (email) => {
    // Implement email validation logic (e.g., regex or library)
    return true; // Replace with actual validation logic
  };

  const isPhoneNumberValid = (phoneNumber) => {
    // Implement phone number validation logic (e.g., regex or library)
    return true; // Replace with actual validation logic
  };

  const isPasswordValid = (password) => {
    // Implement password validation logic (e.g., minimum length, requirements)
    return true; // Replace with actual validation logic
  };

  const handleSignUp = () => {
    // Implement user registration logic here
    // Include validations and registration API call
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={20} color="#007bff" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder=" First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
          </View>
          
                <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={20} color="#007bff" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder=" Middle Name"
          value={firstName}
          onChangeText={setMiddleName}
        />
          </View>
          
                <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={20} color="#007bff" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder=" Last Name"
          value={firstName}
          onChangeText={setLastName}
        />
          </View>
          
          <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={20} color="#007bff" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder=" User Name"
          value={firstName}
          onChangeText={setUserName}
        />
      </View>

          
             <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={20} color="#007bff" style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder=" Email"
          value={firstName}
          onChangeText={setEmail}
        />
          </View>
          
            {/* Country Code and Phone Number Input */}
      <View style={styles.inputContainer}>
        
        <View style={styles.countryCodeContainer}>
          <Picker
            selectedValue={countryCode}
            onValueChange={(itemValue) => setCountryCode(itemValue)}
             style={[styles.countryCodePicker, { paddingTop: Platform.OS === 'android' ? 4 : 0 }]}
          >
            <Picker.Item label="+1" value="+1" />
            <Picker.Item label="+44" value="+44" />
            <Picker.Item label="+91" value="+91" />
            {/* Add more country codes here */}
          </Picker>
        </View>
        <View style={styles.phoneNumberContainer}>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

   <View style={styles.inputContainer}>
  <View style={styles.iconContainer}>
    <Icon name="lock" size={20} color="#007bff" style={styles.icon} />
  </View>
  <TextInput
    style={styles.input}
    placeholder="Password"
    secureTextEntry={!passwordVisible}
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity
    onPress={() => setPasswordVisible(!passwordVisible)}
    style={styles.iconContainer}
  >
    <Icon
      name={passwordVisible ? "eye" : "eye-slash"}
      size={20}
      color="#007bff"
    />
  </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
  <View style={styles.iconContainer}>
    <Icon name="lock" size={20} color="#007bff" style={styles.icon} />
  </View>
  <TextInput
    style={styles.input}
    placeholder="Confirm Password"
    secureTextEntry={!confirmPasswordVisible}
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />
  <TouchableOpacity
    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
    style={styles.iconContainer}
  >
    <Icon
      name={confirmPasswordVisible ? "eye" : "eye-slash"}
      size={20}
      color="#007bff"
    />
  </TouchableOpacity>
</View>

<View style={styles.buttonContainer}>
        <Button
          title="CREATE ACCOUNT"
          onPress={handleSignUp}
          style={styles.createButton} // Apply custom styles here
        />
          </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', // Blue color
    marginBottom: 20,
  },
  inputContainer: {
   top: 0,
    marginBottom: 10,
    flexDirection: 'row', // Align icon and input horizontally
    alignItems: 'center', // Center vertically
    backgroundColor: '#ffffff', // Light white background color
      borderRadius: 2,
    position: 'fixed',
    borderWidth: 0.5,
      borderColor: '#ccc', // Light gray border color
      
      elevation: Platform.OS === 'android' ? 5 : 0,
    height: 50,
width: 328,
  },
  iconContainer: {
    paddingHorizontal: 10, // Adjust margin as needed
    
  },
  icon: {
  marginLeft: 10,
  color: '#000', // Change this color to make the icons visible
},
  input: {
    flex: 1, // Take up remaining space
    paddingVertical: 10,
    paddingHorizontal: 15,
      fontSize: 16,
    height: 50,
      width: 328,
 color: '#00000040', // Text color with opacity
    fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.48, // Letter spacing
    lineHeight: 17.3, // Line height
    position: 'absolute', // Position fixed is not available in React Native, use 'absolute' instead
    top: 0,
    left: 0,
    },
   countryCodeContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 0.5,
       borderRadius: 2,
       color: '#00000040', // Text color with opacity
    fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.48, // Letter spacing
    lineHeight: 17.3, 
       
    
  },
  countryCodePicker: {
    height: 55,
    width: '100%',
  },
  phoneNumberContainer: {
    flex: 3,
    marginLeft: 10,
    borderColor: '#ccc',
    borderWidth: 0.5,
      borderRadius: 2,
    color: '#00000040', // Text color with opacity
    fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.48, // Letter spacing
    lineHeight: 17.3, 
  },
  phoneNumberInput: {
    // height: 55,
    // width: '100%',
    //   paddingLeft: 10,
     color: '#00000040', // Text color with opacity
    fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.48, // Letter spacing
    lineHeight: 17.3, // Line height
    // position: 'absolute', // Position fixed is not available in React Native, use 'absolute' instead
    top: 0,
    left: 0,
  },
  buttonContainer: {
       justifyContent: 'center',
    width: '328',
      height:40,
    alignItems: 'center',
    marginTop: 60, // Adjust the margin top to your preference
    top: 0,
    left: 0,
    borderRadius:3,
  },
 
    createButton: {
    width: 328, // Customize the button width
    height: 40, // Customize the button height
    backgroundColor: '#0000ee', // Customize the button background color
    borderRadius: 3, // Customize the button border radius
      marginTop: 50,
      top: 0,  
      left: 0,
       color: '#ffffff',
    fontSize: 14,
      fontWeight: 600,
  
    
  },
});

export default SignUpScreen;
