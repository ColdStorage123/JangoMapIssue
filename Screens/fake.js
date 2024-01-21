import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
  , Image, KeyboardAvoidingView, TouchableWithoutFeedback,ScrollView,Platform
} from 'react-native';


import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

  
import Button from '../components/Button';


const  EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [updateImage, setUpdateImage] = useState(null);
const [capturedImage, setCapturedImage] = useState(null);
 const [isImageCaptured, setIsImageCaptured] = useState(false);
  
  

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
// Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
    };
    
  const takePhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'We need access to your camera to take a picture.');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1,1],
    quality: 1,
  });

  if (!result.canceled) {
    setCapturedImage(result.uri);
    setIsImageCaptured(true);
     console.log('Image captured:', result.uri); 
    }else {
      console.log('Image capture cancelled');
    }
    
  };
  
const removeImage = () => {
  setCapturedImage(null);
};

    
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
     <View style={styles.headercontainer}>
<View style={styles.headercontainerprofile}>
  <View style={styles.headercontainerprofileImage}>
    <View style={styles.profileImagecamera}>
      <TouchableOpacity onPress={takePhoto}>
        <Image
          source={require('../assets/images/camera.png')}
          style={styles.saveIconcamera}
        />
      </TouchableOpacity>
    </View>
    {isImageCaptured && (
      <Image
        source={{ uri: capturedImage }}
        style={styles.profileImage}
      />
    )}
  </View>
</View>



  <TouchableOpacity style={styles.saveButton}>
    <Image
      source={require('../assets/images/saveIcon.png')} // Replace with the correct path to your image
      style={styles.saveIcon} // Apply custom styles to the image here
    />
    <Text style={styles.savebuttonText}>Save</Text>
        </TouchableOpacity>
       <View style={styles.headerLine}></View> 
</View>



        <View style={styles.container}>
          
              


              
      <Text style={styles.heading}>Contact Information</Text>

      <View style={styles.inputContainer}>

        <Image
    source={require('../assets/images/user.png')} // Replace with the correct path to your image
    style={styles.icon} // Apply custom styles to the image here
        />
        <TextInput
          style={styles.input}
          placeholder=" First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
          </View>
          
      

                <View style={styles.inputContainer}>
        
   <Image
    source={require('../assets/images/user.png')} // Replace with the correct path to your image
    style={styles.icon} // Apply custom styles to the image here
        />
        
        <TextInput
          style={styles.input}
          placeholder=" Middle Name"
          value={middleName}
          onChangeText={setMiddleName}
        />
          </View>
          
                <View style={styles.inputContainer}>
           <Image
    source={require('../assets/images/user.png')} // Replace with the correct path to your image
    style={styles.icon} // Apply custom styles to the image here
        />
        <TextInput
          style={styles.input}
          placeholder=" Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
          </View>
          
      <View style={styles.inputContainer}>
        
           <Image
    source={require('../assets/images/user.png')} // Replace with the correct path to your image
    style={styles.icon} // Apply custom styles to the image here
        />
        
        <TextInput
          style={styles.input}
          placeholder=" User Name"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

          
             <View style={styles.inputContainer}>
        
          <Image
    source={require('../assets/images/email.png')} // Replace with the correct path to your image
    style={styles.iconEmail} // Apply custom styles to the image here
        />
        <TextInput
          style={styles.input}
          placeholder=" Email"
          value={email}
          onChangeText={setEmail}
        />
          </View>
          
            {/* Country Code and Phone Number Input */}
          <View style={styles.inputContainer2}>
            
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
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
                  </View>
                  
<View style={styles.passwordContainer}>
          
      <Text style={styles.heading}>Password</Text>        
      <View style={styles.inputContainer}>
        
   
  <Image
    source={require('../assets/images/password.png')} // Replace with the correct path to your image
    style={styles.icon} // Apply custom styles to the image here
        />
  <TextInput
    style={styles.input}
    placeholder="Old Password"
    secureTextEntry={!passwordVisible}
    value={oldpassword}
    onChangeText={setOldPassword}
  />
   {/* Toggle password visibility */}
          <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
            <Image
              source={
                passwordVisible
                  ? require('../assets/images/eye-open.png') // Show open eye icon when password is visible
                  : require('../assets/images/eye-closed.png') // Show closed eye icon when password is hidden
              }
              style={styles.eyeIcon}
            />
          </TouchableWithoutFeedback>
         
        </View>
          
          
      <View style={styles.inputContainer}>
        
  <Image
    source={require('../assets/images/password.png')} // Replace with the correct path to your image
    style={styles.icon} // Apply custom styles to the image here
        />
  <TextInput
    style={styles.input}
    placeholder="New Password"
    secureTextEntry={!confirmPasswordVisible}
    value={newPassword}
    onChangeText={setNewPassword}
          />
          
<TouchableWithoutFeedback onPress={toggleConfirmPasswordVisibility}>
          <Image
            source={
              confirmPasswordVisible
                ? require('../assets/images/eye-open.png') // Show open eye icon when confirm password is visible
                : require('../assets/images/eye-closed.png') // Show closed eye icon when confirm password is hidden
            }
            style={styles.eyeIcon}
          />
        </TouchableWithoutFeedback>
</View>

</View>
     
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headercontainer: {
    height: 130,
    width: '100%',
    backgroundColor:'#f7f7f7'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    top:0,
    },
     profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 81,
       height: 81,
   
    borderRadius: 40.5, // Half of the width/height to make it circular
    backgroundColor: '#e0e0e0', // Background color for the circular container
    // overflow: 'hidden',
  },cameraContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: 'var(--jango-shadow)', // This part may need adjustment as it depends on your styling setup
    height: 24,
    width: 24,
  },

  cameraIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraIcon: {
    width: 16, // Adjust the size as needed
    height: 16, // Adjust the size as needed
  },
//    image: {
//      backgroundColor: '#f4ed3e',
//     borderRadius: 21.5, // Half of the height (43px) to make it circular
//     height: 70,
//     width: 70,
//     top: -55,
//     },
  heading: {
      color: '#000000',
  fontFamily: 'Inter-Regular',
  fontSize: 12,
  fontWeight: '400',
  left: 0,
  letterSpacing: 0.48,
  lineHeight: 17.3,
//   position: 'absolute',
  top: -10,
    whiteSpace: 'nowrap',
  alignSelf:'flex-start'
  },
  inputContainer: {
   top: 0,
    marginBottom: 10,
    flexDirection: 'row', // Align icon and input horizontally
    alignItems: 'center', // Center vertically
    backgroundColor: '#ffffff', // Light white background color
      borderRadius: 2,
    // position: 'fixed',
    borderWidth: 0.5,
      borderColor: '#ccc', // Light gray border color
      marginTop: 0,
      elevation: Platform.OS === 'android' ? 5 : 0,
    height: 50,
width: 328,
  },
    scrollView: {
    flex: 1, // Take up all available space
    backgroundColor: '#fff', // Background color
  },
  scrollViewContent: {
    padding: 16, // Padding around the content
  },
  icon: {
    height: 12,
    width: 12,
    marginLeft:20,
  },
  iconEmail: {
    height: 12,
    width: 15,
    marginLeft:20,
  },
   eyeIcon: {
    width: 16,
    height: 16,
    marginLeft: 255,
  },
  saveIcon: {
   height: 15,
    width: 15,
    position: 'absolute',
    top: 3.5,
    left: 12,
  },
  headerLine: {
     width: 360, // Set the desired width
    height: 1,  // Set the desired height
    // position: 'absolute',
    top: 105,
    left: 0,
    // resizeMode: 'cover',
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    borderColor: 'solid',
    // zIndex: 1,
    
  },
  input: {
    flex: 1, // Take up remaining space
    paddingVertical: 10,
    paddingHorizontal: 15,
      fontSize: 16,
    height: 50,
      width: 328,
 color: '#00000040', // Text color with opacity
    // fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.48, // Letter spacing
    lineHeight: 17.3, // Line height
    position: 'absolute', // Position fixed is not available in React Native, use 'absolute' instead
    top: 0,
    left: 0,
    marginLeft:25,
    },
   countryCodeContainer: {
    flex: 1,
    // borderColor: '#ccc',
    borderWidth: 0.5,
      //  borderRadius: 2,
      //  color: '#00000040', // Text color with opacity
    fontFamily: 'Montserrat-Regular', // You should have this font imported
    fontSize: 12,
    fontWeight: '400',
    // letterSpacing: 0.48, // Letter spacing
    // lineHeight: 17.3,
       
    top: -10,
    marginBottom: 10,
    // flexDirection: 'row', // Align icon and input horizontally
    // alignItems: 'center', // Center vertically
    // backgroundColor: '#ffffff', // Light white background color
      // borderRadius: 2,
    //  position: 'fixed',
    borderWidth: 0.5,
      borderColor: '#ccc', // Light gray border color
     marginLeft: -250,
   
      // elevation: Platform.OS === 'android' ? 5 : 0,
    height: 50,
width: 76,
  },
  countryCodePicker: {
    height: 55,
    width: '100%',
  },
  phoneNumberContainer: {
    // flex: 3,
    // marginLeft: 200,
    // borderColor: '#ccc',
    // borderWidth: 0.5,
    //   borderRadius: 2,
    // color: '#00000040', // Text color with opacity
    // fontFamily: 'Montserrat-Regular', // You should have this font imported
    // fontSize: 12,
    // fontWeight: '400',
    // letterSpacing: 0.48, // Letter spacing
    // lineHeight: 17.3,

    
    marginBottom: 10,
    flexDirection: 'row', // Align icon and input horizontally
    // alignItems: 'center', // Center vertically
    // backgroundColor: '#ffffff', // Light white background color
      // borderRadius: 2,
    //  position: 'fixed',
    borderWidth: 0.5,
      borderColor: '#ccc', // Light gray border color
       marginRight: -85,
      // elevation: Platform.OS === 'android' ? 5 : 0,
    height: 50,
    width: 244,
    top: -12,
left: 10,
  },
  phoneNumberInput: {
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
    marginLeft:5,
  },
  inputContainer2: {
    top: 0,
    marginBottom: 10,
    // flexDirection: 'row', // Align icon and input horizontally
    alignItems: 'center', // Center vertically
     backgroundColor: '#ffffff', // Light white background color
      borderRadius: 2,
    // position: 'fixed',
    borderWidth: 0.5,
      borderColor: '#ccc', // Light gray border color
      
      elevation: Platform.OS === 'android' ? 5 : 0,
    height: 50,
width: 328,
  },
  passwordContainer: {
    top: 20,
  },
   saveButton: {
    backgroundColor: '#0000ee1a',
    borderRadius: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Set your preferred shadow opacity
    shadowRadius: 2,
    // elevation: 2, // Android shadow elevation
    height: 23,
    width: 84,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    top: 90,
     left: -15,
    alignSelf:'flex-end',
  },
  savebuttonText: {
     color: '#0000ee',
    fontFamily: 'Inter-Regular', // Make sure the font is available in your project
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 14.4,
    // position: 'absolute',
    top: 0,
    left: 8,
    width: 28,
    whiteSpace: 'nowrap',
  },
  headercontainerprofile: {
     height: 81,
    width: 81,
    position: 'absolute',
    top: 30,
    left: 140,
    resizeMode: 'cover', 
    borderColor: 'black',
    
    // backgroundColor: 'white',
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  headercontainerprofileImage: {
    width: 100, // Should match the width of the parent view
     height: 100, // Should match the height of the parent view
    borderRadius: 50, // Half of width or height to make it circular
    // backgroundColor: 'blue',
    alignSelf: 'center',
    top: 9,
    
    //  overflow: 'hidden',
  },
  profileImage: {

    // zIndex: 1,
    borderRadius: 50,
    overflow: 'hidden',
    flex: 1,
    aspectRatio: 1,
         width: 71, // Should match the width of the parent view
    height: 71, // Should match the height of the parent view
    borderRadius: 50, // Half of width or height to make it circular
    
    // backgroundColor: 'blue',
    alignSelf: 'center',
    top: -35,
},
  profileImagecamera: {
     width: 31, // Should match the width of the parent view
    height: 31, // Should match the height of the parent view
    borderRadius: 50, // Half of width or height to make it circular
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    top: 55,
    zIndex: 1,
  },
  saveIconcamera: {
   height: 15,
    width: 15,
    // position: 'absolute',
  alignSelf: 'center',
    top:8,
},
});

export default EditProfile;