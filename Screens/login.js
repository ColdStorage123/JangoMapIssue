import React, { useState,useEffect } from "react";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { TouchableWithoutFeedback } from 'react-native';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,ScrollView,
  Image,Linking,
} from "react-native";

import { CommonActions } from "@react-navigation/native";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios"; // Import axios for making HTTP requests
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-number-input";



// const YOUR_REDIRECT_URI = 'jangomobile://redirect';
// Replace 'your-expo-app' with the actual scheme for your Expo app

const Login = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const isPinCodeValid = (pincode) => {
    const pincodePattern = /^\d{4}$/;
    return pincodePattern.test(pincode);
  };
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName); // Update the selected tab when a tab is pressed
  };
  const handleLogin = () => {
    // Reset validation errors
    setEmailError(null);
    setPasswordError(null);
    setPhoneNumberError(null);
    setPinError(null);
    setErrorText(null);
    if (selectedTab === "Email") {
      if (!email) {
        setEmailError("Email or Username is required *");
        return;
      }
      if (!password) {
        setPasswordError("Password is required *");
        return;
      }
      if (!isEmailValid(email)) {
        setEmailError("Invalid email format");
        return;
      }
    } else if (selectedTab === "Phone") {
      if (!phoneNumber) {
        setPhoneNumberError("Phone number is required *");
        return;
      }
      if (!isPinCodeValid(pin)) {
        setPinError("Invalid pin format");
        return;
      }
      // Additional validation for phone/pin if needed
      // ...
    }
    // if (!email) {
    //   setEmailError("Email or Username is required *");
    //   return;
    // }

    // if (!password) {
    //   setPasswordError("Password is required *");
    //   return;
    // }

    // if (!isEmailValid(email)) {
    //   setEmailError("Invalid email format");
    //   return;
    // }
    // Check if email and password are provided
    if (email.trim() !== "" && password.trim() !== "") {
      if (!isEmailValid(email)) {
        setEmailError("Invalid email address *");
        return;
      }

      // Check if the user has entered a password
      // if (!password) {
      //   setPasswordError("Password is required *");
      //   return;
      // }
    }
    const userData =
      selectedTab === "Email"
        ? { email_username: email, password: password }
        : { phone_number: phoneNumber, pincode: pin };
    // const userData = {
    //   email_username: email,
    //   password: password,

    //   // phone_number: phoneNumber,
    //   // pincode: pin,
    // };

    // Start the loading spinner
    setIsLoading(true);

    // Make a POST request to the API endpoint for user login
    axios
      .post("https://jango-api-dev.jangoaddress.com/userLogin.php", userData)
   
      .then(async (response) => {
        // console.log("RR:", response);
        // console.log("Enter Email:", userData.email);
        if (response.status === 200) {
          // Login was successful, you can handle the response accordingly
          console.log("Login sucess", response.data);
       

          const userData = response.data.list[0]; // Assuming the user data is in the first element of the list
          await AsyncStorage.setItem("userData Login", JSON.stringify(userData));
          await AsyncStorage.setItem("userId", userData.id);
          await AsyncStorage.setItem("full_names", userData.full_names);
          await AsyncStorage.setItem("email_address", userData.email_address);
          await AsyncStorage.setItem("firstName", userData.first_name);
        
        
          console.log("User Storage:", userData);
        // const firstName = await AsyncStorage.getItem("first_name");
          console.log("User data stored in AsyncStorage:", userData);

          const getStoredUserData = async () => {
            try {
              const userId = await AsyncStorage.getItem("userId");
              const full_names = await AsyncStorage.getItem("full_names");
              const email_address = await AsyncStorage.getItem("email_address");
              const firstName = await AsyncStorage.getItem("first_name");
              if (userId !== null) {
                // Use the user data here
                console.log("Stored userId:", userId);
                console.log("Stored userName:", full_names);
                console.log("Stored userEmail:", email_address);
              
              } else {
                console.error("User data is not stored in AsyncStorage.");
                // Handle the case where user data is not available in AsyncStorage
              }
            } catch (error) {
              console.error(
                "Error retrieving user data from AsyncStorage:",
                error
              );
            }
          };
          getStoredUserData();
         navigation.navigate("DrawerNavigator");

          // navigation.navigate("CreateJangoAddress");



          // navigation.dispatch(
          //   CommonActions.navigate("DrawerNavigator", {
          //     name: "Profile",
          //     params: { userData },
          //   })
          // );
        } else if (response.status === 400) {
          console.log("Invalid credentials");
          setErrorText(
            response.status === 400
              ? "Invalid credentials"
              : "Login failed. Please try again."
          );
        } else if (response.status === 500) {
          console.error(
            "Internal Server Error Ocured. Status:",
            response.status
          );
          //   // AsyncStorage.clear();
          //   // Display an appropriate error message to the user
          //   // You can use response.data to get additional details from the API
          // } else {
          console.error("Login failed. Status:", response.status);
          // AsyncStorage.clear();
          // Display an appropriate error message to the user
          // You can use response.data to get additional details from the API
        }

        // Stop the loading spinner
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error details:", error.toJSON());
        console.error("Axios request failed:",  error.message);
        console.error("Login failed:", error);
        if (error.response) {
          console.error("Server responded with data:", error.response.data);
          setErrorText(
            error.response.data.message || "Login failed. Please try again."
          );
        }
        // Handle errors, such as displaying an error message
        AsyncStorage.clear();
        // Stop the loading spinner
        setIsLoading(false);
      });
  };
  
  // const handleGoogleLogin = async () => {
  //   try {
  //     const { type, url } = await WebBrowser.openAuthSessionAsync(
  //       `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`
  //     );
  
  //     if (type === 'success') {
  //       const params = Linking.parse(url);
  //       const { code } = params.queryParams;
  
  //       // Send the authorization code to your backend for further processing
  //       const response = await fetch('YOUR_BACKEND_URL', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ code }),
  //       });
  
  //       if (response.ok) {
  //         const data = await response.json();
  
  //         // Log the user info
  //         console.log('User Info:', data);
  
  //         // Handle the response from the backend, which may contain user data
  //         const { email, name, picture } = data;
  //         const user = { email, name, picture };
  //         // You should have a 'navigation' object available in your component
  //         // Replace 'HomeScreen' with the actual name of your destination screen
  //         navigation.navigate('HomeScreen', { user });
  //       } else {
  //         console.error('Error:', response.statusText);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
  const handleGoogleLogin = () => {
    console.log('google login');
  };

  // Handle function for the Facebook button
  const handleFacebookLogin = () => {
    // Implement your Facebook login logic here
    // You can use the Facebook SDK for React Native or other libraries
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgetPassword");
  };
  const handleForgotPin = () => {
    navigation.navigate("ForgetPin");
  };

  const handleSignUpPress = () => {
    // Navigate to the next screen when "Sign Up" is pressed
    navigation.navigate("Signup"); // Replace 'SignUpScreen' with the actual screen name
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
{/*     
    <Image
  source={require("../assets/images/jango.png")}
  style={styles.image}
/> */}

      <View>
      <Image
  source={require("../assets/images/jango.png")}
          style={styles.image}
          resizeMode="contain"
/>
      </View>
      

      <Text style={styles.heading}>WELCOME</Text>

      <Image
        source={require("../assets/images/LoginBackgroung.png")} // Replace with the correct path to your image
        style={styles.loginImage} // Apply custom styles to the image here
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={selectedTab === "Phone" ? styles.selectedTab : styles.tab}
          onPress={() => handleTabPress("Phone")}
        >
          <Text
            style={
              selectedTab === "Phone" ? styles.selectedTabText : styles.tabText
            }
          >
            Phone
          </Text>
        </TouchableOpacity>
        <View style={{ width: 80 }} />
        <TouchableOpacity
          style={selectedTab === "Email" ? styles.selectedTab : styles.tab}
          onPress={() => handleTabPress("Email")}
        >
          <Text
            style={
              selectedTab === "Email" ? styles.selectedTabText : styles.tabText
            }
          >
            Email
          </Text>
        </TouchableOpacity>
      </View>
      {/* Add your login form components here based on the selected tab */}
      {selectedTab === "Email" ? (
        // Email login form components
        <View style={styles.Emailcontainer}>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/email.png")}
              style={styles.iconEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Email or Username"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError("");
              }}
              keyboardType="email-address"
            />
            <Text style={styles.errorTextEmail}>{emailError}</Text>
          </View>
          <View></View>
          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/password.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder=" Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
            />
            <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
              <Image
                source={
                  passwordVisible
                    ? require("../assets/images/eye-open.png")
                    : require("../assets/images/eye-closed.png")
                }
                style={styles.eyeIcon}
              />
            </TouchableWithoutFeedback>
            <Text style={styles.errorTextpassword}>{passwordError}</Text>
          </View>
        </View>
      ) : (
        // Phone login form components
        <View>
          <View style={styles.Emailcontainer}>
            {/* <View style={styles.inputContainer}>
              <Image
                source={require("../assets/images/email.png")}
                style={styles.iconEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                keyboardType="email-address"
              />
            </View> */}
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
          fontFamily: 'Montserrat-Regular',
        },
      ],
      placeholder: "Phone Number",
      marginLeft: moderateScale(10),
      top: verticalScale(-1),
    }}
    textProps={{
      style: {
        color: "#000000cc",
        fontWeight: "normal",
        fontFamily: 'Montserrat-Regular',
      },
    }}
    flagButtonStyle={{
      marginTop: verticalScale(10),
    }}
    countryPickerButtonStyle={{
      marginTop: verticalScale(10),
    }}
    textContainerStyle={{
      // marginTop: verticalScale(10), // Adjust if needed
    }}
    onChangeFormattedText={(text) => {
      console.log("Formatted Phone Number:", text);
      setPhoneNumber(text);
      setPhoneNumberError("");
    }}
  />
  <Text style={styles.errorText}>{phoneNumberError}</Text>
</View>


            <TouchableOpacity
              style={styles.forgotPasswordLink}
              onPress={handleForgotPin}
            >
              <Text style={styles.forgotText}>Forgot Pin?</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Image
                source={require("../assets/images/password.png")}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder=" Pin"
                secureTextEntry={!passwordVisible}
                value={pin}
                onChangeText={(text) => {
                  setPin(text);
                  setPinError("");
                }}
              />
              <Text style={styles.errorTextPin}>{pinError}</Text>
              <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
        <Image
          source={
            passwordVisible
              ? require("../assets/images/eye-open.png")
              : require("../assets/images/eye-closed.png")
          }
          style={styles.eyeIconpin}
        />
      </TouchableWithoutFeedback>
            </View>
          </View>

          {/* Add other phone login form components */}
        </View>
      )}

      {/* Add your login button here */}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      {errorText ? (
        <Text style={styles.errorTextCredentials}>{errorText}</Text>
      ) : null}

      <LoadingSpinner isLoading={isLoading} />
      <View style={styles.line} />
      <View style={styles.line1} />
      <View>
        <Text style={styles.googleText}> Continue with Google or Facebook</Text>
      </View>

      <View style={styles.touchbuttoncontainer}>
       
        <View style={{ flex: 1, alignItems: "flex-start", marginLeft: 12.5 }}>
          <TouchableOpacity style={styles.button} onPress={handleFacebookLogin}>
            <Image
              source={require("../assets/images/fb.png")} // Replace with your Facebook logo image
              style={styles.logoFacebook}
            />
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}>
          <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
            <Image
              source={require("../assets/images/google.png")} // Replace with your Google logo image
              style={styles.logo}
            />
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signUpContainer}>
  <Text style={styles.signUpText}>DONT HAVE AN ACCOUNT?{"      "}</Text>
  <TouchableOpacity onPress={handleSignUpPress}>
    <Text style={styles.signUpText1}>SIGN UP</Text>
  </TouchableOpacity>
</View>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },

  image: {
alignSelf:'center',
height: verticalScale(43),
   width: scale(43),
  top: verticalScale(30),
 flexShrink:0,
  },
  // image: {
  //   // backgroundColor: '#f4ed3e',
  //   // borderRadius: moderateScale(43),
  //   height: verticalScale(43),
  //   width: scale(43),
  //   top: verticalScale(30),
  //  flexShrink:0,
  // },
  loginImage: {
    height: verticalScale(150),
    width: scale(251),
    top: verticalScale(30),
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    fontFamily:'Inter',
    color: '#00E',
    marginBottom: verticalScale(20),
    top: verticalScale(40),
    left: 0,
    lineHeight: moderateScale(28.8),
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
    top: -verticalScale(20),
    left: 0,
    marginBottom: verticalScale(20),
  },
  input: {
    flex: 1,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    fontSize: moderateScale(12),
    height: verticalScale(50),
    width: scale(328),
    color: '#00000040',
    fontWeight: '400',
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    position: 'absolute',
    fontFamily: 'Montserrat-Regular',
    top: 0,
    left: 0,
    marginLeft: moderateScale(27),
  },
  forgotText: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(8),
    fontWeight: '400',
    letterSpacing: moderateScale(0.32),
    lineHeight: moderateScale(11.5),
    textAlign: 'center',
    position: 'relative',
    top: -verticalScale(20),
    left: 0,
    whiteSpace: 'nowrap',
    marginLeft: moderateScale(250),
  },
  iconEmail: {
    height: moderateScale(12),
    width: moderateScale(15),
    marginLeft: moderateScale(21),
    top: verticalScale(20),
  },
  eyeIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginLeft: scale(285),
    top: verticalScale(7),
  },
  eyeIconpin: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginLeft: scale(285),
    top: verticalScale(7),
  },
  errorTextEmail: {
    top: -verticalScale(-60),
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: -verticalScale(20),
    marginLeft: scale(240),
    paddingTop: moderateScale(0),
  },
  errorText: {
    top: -verticalScale(-40),
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: -verticalScale(20),
    marginLeft: scale(240),
    paddingTop: moderateScale(1),
  },
  errorTextPin: {
    top: -verticalScale(-60),
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: -verticalScale(20),
    marginLeft: scale(240),
    paddingTop: moderateScale(1),
  },
  loginButton: {
    backgroundColor: '#0000ee',
    borderRadius: moderateScale(3),
    height: verticalScale(40),
    width: scale(328),
    top: verticalScale(15),
    left: 0,
    justifyContent: 'center', // Align text vertically in the center
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.2),
    textAlign: 'center',
   
  },
  line: {
    height: moderateScale(1),
    top: verticalScale(29.3),
    left: scale(120),
    width: scale(84),
    resizeMode: 'cover',
    backgroundColor: '0px 2px 4px 0px rgba(0, 0, 0, 0.1);',
    marginTop: verticalScale(20),
  },
  line1: {
    height: moderateScale(1),
    top: verticalScale(7.5),
    left: -scale(120),
    width: scale(84),
    resizeMode: 'cover',
    height: moderateScale(1),
    backgroundColor: '0px 2px 4px 0px rgba(0, 0, 0, 0.1);',
    marginTop: verticalScale(20),
  },
  googleText: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(8),
    fontWeight: '400',
    letterSpacing: moderateScale(0.32),
    lineHeight: moderateScale(11.5),
    textAlign: 'center',
  },
  touchbuttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    borderWidth: moderateScale(1),
    borderColor: '#0000ee1a',
    borderRadius: moderateScale(3),
    height: verticalScale(40),
    width: scale(160),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  icon: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginLeft: moderateScale(19),
    top: verticalScale(18),
  },
  buttonText: {
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(10),
    fontWeight: '400',
    left: 0,
    letterSpacing: moderateScale(0.4),
    lineHeight: moderateScale(20.2),
    position: 'fixed',
    textAlign: 'center',
  },
  logoFacebook: {
    height: moderateScale(25),
    width: moderateScale(25),
    marginRight: moderateScale(8),
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(23),
    marginRight: moderateScale(8),
  },
  signUpContainer: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center items vertically
  },
  
  signUpText: {
    marginTop: verticalScale(30),
    // marginLeft: -moderateScale(90),
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Helvetica',
    fontSize: moderateScale(12),
    fontWeight: '500',
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  signUpText1: {
    color: '#0000ee',
    // top: -verticalScale(20),
    // left: scale(130),
    fontFamily: 'Helvetica',
    marginTop: verticalScale(30),
    fontSize: moderateScale(14),
    fontWeight: '600',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.2),
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  tab: {
    padding: moderateScale(10),
  },
  selectedTab: {
    padding: moderateScale(10),
    borderBottomWidth: moderateScale(2),
    borderBottomColor: '#00E',
  },
  tabText: {
    color: 'rgba(0, 0, 24, 0.50)',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    fontWeight: '400',
  },
  selectedTabText: {
    color: '#00E',
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  Emailcontainer: {
    top: verticalScale(20),
    alignSelf: 'center',
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
    height: verticalScale(50.5),
    width: scale(241),
    flexShrink: 0,
    zIndex: 1,
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
  errorTextpassword: {
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: verticalScale(25),
    marginLeft: scale(230),
    paddingTop: moderateScale(1),
  },
  errorTextCredentials: {
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(10),
    paddingTop: moderateScale(1),
  },
});



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: " #f7f7f7",
//   },
//   image: {
//     backgroundColor: "#f4ed3e",
//     borderRadius: 21.5, // Half of the height (43px) to make it circular
//     height: 43,
//     width: 43,
//     top: -55,
//   },
//   loginImage: {
//     height: 150,
//     width: 251,
//     top: -35,
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#007bff", // Blue color
//     marginBottom: 20,
//     top: -40,
//     left: 0,
//     lineHeight: 28.8,
//   },
//   inputContainer: {
//     backgroundColor: "#ffffff",
//     borderRadius: 2,
//     height: 50,
//     width: 330,
//     elevation: 2,
//     color: "rgba(0, 0, 0, 0.4)",
//     fontFamily: "Montserrat-Regular",
//     fontSize: 12,
//     fontWeight: "400",
//     letterSpacing: 0.48,
//     lineHeight: 17.3,
//     // position: 'absolute',
//     top: -20,
//     left: 0,
//     marginBottom: 20,
//   },

//   input: {
//     flex: 1, // Take up remaining space
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     height: 50,
//     width: 328,
//     color: "#00000040", // Text color with opacity
//     // fontFamily: 'Montserrat-Regular', // You should have this font imported
//     fontSize: 12,
//     fontWeight: "400",
//     letterSpacing: 0.48, // Letter spacing
//     lineHeight: 17.3, // Line height
//     position: "absolute", // Position fixed is not available in React Native, use 'absolute' instead
//     top: 0,
//     left: 0,
//     marginLeft: 25,
//   },
//   forgotText: {
//     color: "#000000",
//     fontFamily: "Montserrat-Regular", // Make sure to load this font
//     fontSize: 8,
//     fontWeight: "400",
//     letterSpacing: 0.32,
//     lineHeight: 11.5,
//     textAlign: "center",
//     position: "relative",
//     top: -20,
//     left: 0,
//     whiteSpace: "nowrap",
//     marginLeft: 250,
//   },
//   iconEmail: {
//     height: 12,
//     width: 15,
//     marginLeft: 15,
//     top: 20,
//   },
//   eyeIcon: {
//     width: 16,
//     height: 16,
//     marginLeft: 285,
//     top: 7,
//   },  eyeIconpin: {
//     width: 16,
//     height: 16,
//     marginLeft: 285,
//     top: -40,
//   },
//   errorText: {
//     top: -20,
//     color: "red", // Change the text color to red
//     fontSize: 7, // Adjust the font size
//     marginTop: -20, // Add some space between the input field and the error message
//     marginLeft: 240, // Add some space between the input field and the error
//     paddingTop: 1, // Add some space between the input field and the error
//   },
//   loginButton: {
//     // backgroundColor: '#007bff',
//     // paddingVertical: 12,
//     // paddingHorizontal: 24,
//     //   borderRadius: 4,
//     backgroundColor: "#0000ee", // You can replace this color with your desired color
//     borderRadius: 3,
//     height: 40,
//     width: 328,
//     // position: 'absolute',
//     top: 0,
//     left: 0,
//   },
//   loginButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#ffffff", // Text color
//     fontFamily: "Inter-SemiBold", // Replace with the appropriate font family
//     fontSize: 14,
//     fontWeight: "600",
//     letterSpacing: 0.56,
//     lineHeight: 20.2,
//     textAlign: "center",
//     paddingTop: 8,
//     // position: 'absolute',
//     top: 0,
//     left: 0,
//   },
//   line: {
//     height: 1,
//     // position: 'absolute',
//     top: 29.3,
//     left: 120,
//     width: 84,
//     resizeMode: "cover",
//     color: "red",
//     height: 1,
//     //   width: '20%', // Set the width to fill the parent
//     backgroundColor: "0px 2px 4px 0px rgba(0, 0, 0, 0.1);", // You can replace 'red' with your desired color
//     marginTop: 20,
//   },
//   line1: {
//     height: 1,
//     // position: 'absolute',
//     top: 7.5,
//     left: -120,
//     width: 84,
//     resizeMode: "cover",

//     height: 1,
//     //   width: '20%', // Set the width to fill the parent
//     backgroundColor: "0px 2px 4px 0px rgba(0, 0, 0, 0.1);", // You can replace 'red' with your desired color
//     marginTop: 20,
//   },
//   googleText: {
//     color: "#000000",
//     fontFamily: "Inter-Regular", // You may need to load the correct font
//     fontSize: 8,
//     fontWeight: "400",
//     letterSpacing: 0.32,
//     lineHeight: 11.5,
//     textAlign: "center",
//   },
//   touchbuttoncontainer: {
//     flexDirection: "row", // Horizontal layout
//     justifyContent: "space-between", // Spacing between buttons
//     alignItems: "center", // Vertical alignment
//   },
//   button: {
//     backgroundColor: "#ffffff",
//     borderWidth: 1,
//     borderColor: "#0000ee1a",
//     borderRadius: 3,
//     height: 40,
//     width: 160,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20, // Adjust the margin as needed
//   },
//   icon: {
//     height: 12,
//     width: 12,
//     marginLeft: 20,
//     top: 20,
//   },
//   buttonText: {
//     color: "#000000",
//     fontFamily: "Inter-SemiBold", // Replace with the appropriate font family
//     fontSize: 10,
//     fontWeight: "400",
//     left: 0,
//     letterSpacing: 0.4,
//     lineHeight: 20.2,
//     position: "fixed",
//     textAlign: "center",
//   },
//   logo: {
//     height: 24, // Adjust the logo height as needed
//     width: 24, // Adjust the logo width as needed
//     marginRight: 8, // Adjust the margin as needed
//   },

//   signUpText: {
//     marginTop: 40,
//     marginLeft: -90,
//     fontWeight: "bold",
//     color: "#000000",
//     fontFamily: "Helvetica", // Use the appropriate font family
//     fontSize: 12,
//     fontWeight: "500", // Use '500' for fontWeight if needed
//     letterSpacing: 0.48,
//     lineHeight: 17.3,
//     textAlign: "left", // Adjust as needed
//     whiteSpace: "nowrap",
//   },
//   signUpText1: {
//     color: "#0000ee",
//     top: -22,
//     left: 110,
//     fontFamily: "Helvetica", // Use the appropriate font family
//     fontSize: 14,
//     fontWeight: "600", // Use '600' for fontWeight if needed
//     letterSpacing: 0.56,
//     lineHeight: 20.2,
//     textAlign: "left", // Adjust as needed
//     whiteSpace: "nowrap",
//   },
//   tabContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   tab: {
//     padding: 10,
//     // marginRight: 30,
//   },
//   selectedTab: {
//     padding: 10,
//     borderBottomWidth: 2,
//     borderBottomColor: "#00E",
//     // marginRight: 30,
//   },
//   tabText: {
//     color: "rgba(0, 0, 24, 0.50)",
//     fontFamily: "Inter",
//     fontSize: 16,
//     fontStyle: "normal",
//     fontWeight: "400",
//     // marginRight: 30,
//   },
//   selectedTabText: {
//     color: "#00E",
//     fontSize: 16,
//     fontWeight: "400",
//     // marginRight: 30,
//   },
//   Emailcontainer: {
//     top: 20,
//     alignSelf: "center",
//   },
//   //styling forphone number

//   inputContainer2: {
//     top: 0,
//     marginBottom: 10,
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//     borderRadius: 2,
//     borderWidth: 0.5,
//     borderColor: "#ffffff", // Dark border color
//     elevation: Platform.OS === "android" ? 5 : 0,
//     height: 50,
//     width: 238, //205
//     flexShrink: 0,
//     zIndex: 1,
//   },
//   phoneNumberInput: {
//     fontSize: 16,
//     height: 30,
//     // width: 228,
//     color: "#00000040",
//     fontSize: 12,
//     fontWeight: "400",
//     letterSpacing: 0.48,
//     lineHeight: 17.3,
//     position: "absolute",
//     top: 0,
//     left: -1, // Adjust the left value to move the placeholder to the right
//   },
//   errorText: {
//     color: "red", // Change the text color to red
//     fontSize: 7, // Adjust the font size
//     marginTop: 35, // Add some space between the input field and the error message
//     marginLeft: 200, // Add some space between the input field and the error
//     paddingTop: 1, // Add some space between the input field and the error
//   },
//   errorTextpassword: {
//     color: "red", // Change the text color to red
//     fontSize: 7, // Adjust the font size
//     marginTop: 25, // Add some space between the input field and the error message
//     marginLeft: 200, // Add some space between the input field and the error
//     paddingTop: 1, // Add some space between the input field and the error
//   },
//   errorTextCredentials: {
//     color: "red",
//     fontSize: 7,
//     marginTop: 10, // Adjust the value based on your UI
//     marginLeft: 10, // Adjust the value based on your UI
//     paddingTop: 1,
//   },
// });

export default Login;
