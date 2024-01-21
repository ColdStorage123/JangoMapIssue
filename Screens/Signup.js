// import PhoneInput from 'react-native-phone-number-input';

import React, { useState, useEffect } from "react";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import * as Font from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import axios from "axios";
// import PhoneInput from 'react-native-phone-number-input';
//  import CountryPicker from 'react-native-country-picker-modal';
const SignUpScreen = () => {
  const [updateImage, setUpdateImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [middleName, setMiddleName] = useState("");
  const [middleNameError, setMiddleNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [numberPart, setNumberPart] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const [confirmPin, setConfirmPin] = useState("");
  const [confirmPinError, setConfirmPinError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const atLeastOneFieldProvided = !!(email.trim() || phoneNumber.trim());
  const [errorText, setErrorText] = useState("");

  const showToast = (message) => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Error",
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    // Implement phone number validation logic (e.g., regex or library)
    return true; // Replace with actual validation logic
  };

  const isNameValid = (name) => {
    // Check if the name contains only alphabets
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };
  const isPasswordValid = (password) => {
    // Check for minimum length (at least 8 characters)
    if (password.length < 8) {
      return false;
    }

    // Check for at least one capital letter

    // Password meets the criteria
    return true;
  };
  const arePinsEqual = (pin, confirmPin) => {
    return pin === confirmPin;
  };
  const isPinCodeValid = (pincode) => {
    const pincodePattern = /^\d{4}$/;
    return pincodePattern.test(pincode);
  };

  //   const handleCameraIconPress = () => {
  //   Alert.alert(
  //     'Choose Image Source',
  //     'Select the image source for your profile picture:',
  //     [
  //       {
  //         text: 'Camera',
  //         onPress: () => takePhoto(),
  //       },
  //       {
  //         text: 'Gallery',
  //         onPress: () => pickImage(),
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //   );
  // };

  //   const takePhoto = async () => {
  //     Alert.alert(
  //     'Choose Image Source',
  //     'Select the image source for your profile picture:',
  //     [
  //       {
  //         text: 'Camera',
  //         onPress: () => {
  //           // Capture image from camera
  //           captureImageFromCamera();
  //         },
  //       },
  //       {
  //         text: 'Gallery',
  //         onPress: () => {
  //           // Pick an image from the gallery
  //           pickImage();
  //         },
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ]
  //   );
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //   if (status !== 'granted') {
  //     Alert.alert('Permission Denied', 'We need access to your camera to take a picture.');
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     // Check the image format based on the file extension
  //     const imageType = result.uri.split('.').pop().toLowerCase();
  //     if (imageType === 'jpeg' || imageType === 'jpg' || imageType === 'png') {
  //       setCapturedImage(result.uri);
  //       setIsImageCaptured(true);
  //       console.log('Image captured:', result.uri);
  //       console.log('Image type:', imageType);
  //     } else {
  //       console.log('Image format is not supported. Please upload a JPEG, JPG, or PNG file.');
  //       // Handle the error or inform the user
  //     }
  //   } else {
  //     console.log('Image capture cancelled');
  //   }
  // };

  //   const pickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (status !== 'granted') {
  //     Alert.alert('Permission Denied', 'We need access to your gallery to select an image.');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     // Check the image format based on the file extension
  //     const imageType = result.uri.split('.').pop().toLowerCase();
  //     if (imageType === 'jpeg' || imageType === 'jpg' || imageType === 'png') {
  //       setCapturedImage(result.uri);
  //       setIsImageCaptured(true);
  //       console.log('Image selected from gallery:', result.uri);
  //       console.log('Image type:', imageType);
  //     } else {
  //       console.log('Image format is not supported. Please select a JPEG, JPG, or PNG file.');
  //       // Handle the error or inform the user
  //     }
  //   } else {
  //     console.log('Image selection from gallery cancelled');
  //   }
  // };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your gallery to select an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // Check the image format based on the file extension
      const imageType = result.uri.split(".").pop().toLowerCase();
      if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
        setCapturedImage(result.uri);
        setIsImageCaptured(true);
        console.log("Image selected from gallery:", result.uri);
        console.log("Image type:", imageType);
      } else {
        console.log(
          "Image format is not supported. Please select a JPEG, JPG, or PNG file."
        );
        // Handle the error or inform the user
      }
    } else {
      console.log("Image selection from gallery cancelled");
    }
  };

  const takePhoto = async () => {
    Alert.alert(
      "Choose Image Source",
      "Select the image source for your profile picture:",
      [
        {
          text: "Camera",
          onPress: () => {
            // Capture image from camera
            captureImageFromCamera();
          },
        },
        {
          text: "Gallery",
          onPress: () => {
            // Pick an image from the gallery
            pickImage();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  // const captureImageFromCamera = async () => {
  //   // Request camera permissions and open the camera for capturing an image
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //   if (status !== 'granted') {
  //     Alert.alert('Permission Denied', 'We need access to your camera to take a picture.');
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     // Check the image format based on the file extension
  //     const imageType = result.uri.split('.').pop().toLowerCase();
  //     if (imageType === 'jpeg' || imageType === 'jpg' || imageType === 'png') {
  //       setCapturedImage(result.uri);
  //       setIsImageCaptured(true);
  //       console.log('Image captured:', result.uri);
  //       console.log('Image type:', imageType);
  //     } try {
  //   const convertedImage = await ImageManipulator.manipulateAsync(
  //     result.uri,
  //     [{ format: ImageManipulator.SaveFormat.JPEG, compress: 1 }],
  //     { base64: true }
  //   );
  //   console.log('Converted Image:', convertedImage);
  //   setCapturedImage(convertedImage.uri);
  // } catch (error) {
  //   console.error('Image manipulation failed:', error);
  // }

  //     setIsImageCaptured(true);

  //   } else {
  //     console.log('Image capture cancelled');
  //   }
  // };
  useEffect(() => {
    // This will run when capturedImage changes
    if (capturedImage) {
      console.log("Image captured:", capturedImage);
      // Additional logic or actions after image is captured
    }
  }, [capturedImage]);

  const captureImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your camera to take a picture."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageType = result.uri.split(".").pop().toLowerCase();

      if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
        try {
          const resizedImage = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 500 } }]
          );

          // Now, you can set the captured image
          setCapturedImage(resizedImage.uri);
          setIsImageCaptured(true);
        } catch (error) {
          console.error("Image manipulation failed:", error);
        }
      } else {
        console.log(
          "Image format is not supported. Please upload a JPEG, JPG, or PNG file."
        );
      }
    } else {
      console.log("Image capture cancelled");
    }
  };
  // const captureImageFromCamera = async () => {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //   if (status !== "granted") {
  //     Alert.alert(
  //       "Permission Denied",
  //       "We need access to your camera to take a picture."
  //     );
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const imageType = result.uri.split(".").pop().toLowerCase();

  //     if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
  //       try {
  //         const resizedImage = await ImageManipulator.manipulateAsync(
  //           result.uri,
  //           [{ resize: { width: 500 } }]
  //         );

  //         // Now, you can set the captured image
  //         setCapturedImage(resizedImage.uri);
  //       } catch (error) {
  //         console.error("Image manipulation failed:", error);
  //       }
  //     } else {
  //       console.log(
  //         "Image format is not supported. Please upload a JPEG, JPG, or PNG file."
  //       );
  //     }
  //   } else {
  //     console.log("Image capture cancelled");
  //   }
  // };

  const removeImage = () => {
    setCapturedImage(null);
  };

  const handleSignUp = () => {
    setFirstNameError("");
    setMiddleNameError("");
    setLastNameError("");
    setUserNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPinError("");
    setConfirmPinError("");
    setErrorText(null);
    // if (!arePinsEqual(pin, confirmPin)) {
    //   setPinError("Pins do not match!");
    //   setConfirmPinError("Pins do not match!");
    //   return;
    // }

    // const selectCountry = (country) => {
    //   setCountryCode(country.cca2);
    //   // You can set the selected country code to your state if needed
    // };

    if (firstName.trim() === "") {
      setFirstNameError("First name is required *");
      return;
    }

    if (middleName.trim() === "") {
      setMiddleNameError("Middle name is required *");
      return;
    }

    if (lastName.trim() === "") {
      setLastNameError("Last name is required *");
      return;
    }

    if (userName.trim() === "") {
      setUserNameError("User name is required *");
      return;
    }

    if (!isNameValid(firstName)) {
      setFirstNameError("First name should only contain alphabets");
      return;
    }

    if (!isNameValid(middleName)) {
      setMiddleNameError("Middle name should only contain alphabets");
      return;
    }

    if (!isNameValid(lastName)) {
      setLastNameError("Last name should only contain alphabets");
      return;
    }

    // if (!isEmailValid(email)) {
    //   setEmailError("Invalid email address *");
    //   return;
    // }

    // if (!isPhoneNumberValid(phoneNumber)) {
    //   setPhoneNumberError("Invalid phone number*");
    //   return;
    // }
    // if (atLeastOneFieldProvided) {
    //   if (!isEmailValid(email) && !isPhoneNumberValid(phoneNumber)) {
    //     setEmailError(
    //       "At least one of the email or phone number fields is required *"
    //     );
    //     return;
    //   }
    // } else {
    //   if (!isEmailValid(email) && !isPhoneNumberValid(phoneNumber)) {
    //     setEmailError(
    //       "At least one of the email or phone number fields is required *"
    //     );
    //     return;
    //   }
    // }
    // if (!isPasswordValid(password)) {
    //   setPasswordError("Invalid password *");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   setConfirmPasswordError("Passwords do not match!");
    //   return;
    // }

    if (atLeastOneFieldProvided) {
      if (!isEmailValid(email) && !isPhoneNumberValid(phoneNumber)) {
        setEmailError("Invalid email address *");
        setPhoneNumberError("Invalid phone number*");
        return;
      }
    }

    // Check if email and password are provided
    if (email.trim() !== "" && password.trim() !== "") {
      if (!isEmailValid(email)) {
        setEmailError("Invalid email address *");
        return;
      }

      if (!isPasswordValid(password)) {
        setPasswordError("Invalid password *");
        return;
      }
    }

    // Check if phone number and pin code are provided
    if (phoneNumber.trim() !== "" && pin.trim() !== "") {
      if (!isPhoneNumberValid(phoneNumber)) {
        setPhoneNumberError("Invalid phone number *");
        return;
      }
      if (!isPinCodeValid(pin)) {
        setPinError("Invalid PIN code *");
        return;
      }
      if (!arePinsEqual(pin, confirmPin)) {
        setPinError("Pins do not match!");
        setConfirmPinError("Pins do not match!");
        return;
      }
    }
    const formData = new FormData();

    // const jsonData = {
    //   first_name: firstName,
    //   middle_names: middleName,
    //   last_name: lastName,
    //   phone_number: phoneNumber,
    //   username: userName,
    //   email: email,
    //   password: password,
    //   pincode: pin,
    // };

    const jsonData = {
      first_name: firstName,
      middle_names: middleName,
      last_name: lastName,
      username: userName,
    };

    // Add email and password if provided
    if (email.trim() !== "" && password.trim() !== "") {
      jsonData.email = email;
      jsonData.password = password;
    }

    // Add phone number and pincode if provided
    if (phoneNumber.trim() !== "" && pin.trim() !== "") {
      jsonData.phone_number = phoneNumber;
      jsonData.pincode = parseInt(pin, 10);
    }
    // const formData = new FormData();
    // Append JSON data to the formData
    formData.append("jsonData", JSON.stringify(jsonData));
    console.log("FormData:", formData);

    // Append the image to the formData
    console.log("Image URI:", capturedImage); // Add this line
    if (capturedImage) {
      // Check the image format
      const imageType = capturedImage.split(".").pop().toLowerCase(); // Get the file extension
      if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
        // Image is in a supported format
        formData.append("image", {
          uri: capturedImage,
          type: `image/${imageType}`,
          name: `profile_image.${imageType}`,
        });
      } else {
        console.log(
          "Image format is not supported. Please upload a JPEG, JPG, or PNG file."
        );
        // Handle the error or inform the user
      }
    }

    // Make an HTTP POST request to the API endpoint
    axios
      .post(
        "https://jango-api-dev.jangoaddress.com/registerUser.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      .then((response) => {
        if (response.status === 201) {
          console.log("User registered successfully");
          console.log("User registered successfully with details", formData);
          Toast.show({
            type: "success",
            text1: "Registration successful",
            visibilityTime: 3000,
            autoHide: true,
          });
          // Handle success, such as showing a success message or navigating to a new screen
        } else if (response.status === 400) {
          console.error("Bad Request:", response.data.message);
          // Handle a bad request by displaying the error message
        } else if (response.status === 500) {
          console.error("Internal Server Error:", response.data.error);
          // Handle an internal server error by displaying the error message
        } else {
          console.error("Unexpected status code:", response.status);
          // Handle other status codes as needed
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        console.log("Error details:", error.toJSON());
        if (error.response) {
          console.error("Server responded with data:", error.response.data);

          if (error.response.status === 400) {
            setErrorText(
              error.response.data.message ||
                "Registration failed. Please try again."
            );
          } else {
            setErrorText(
              error.response.data.message ||
                "Registration failed. Please try again."
            );
          }
        } else {
          setErrorText("Registration failed. Please try again.");
        }
      });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      style={styles.container}
    >
      {/* <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      > */}
      {/* Display error messages */}

      <View style={styles.container}>
        <Text style={styles.heading}>Create Account</Text>


        <View style={styles.headercontainerprofileImage}>
     <View style={styles.profileImagecamera}>
            <TouchableOpacity onPress={takePhoto}>
              <Image
                source={require("../assets/images/camera.png")}
                style={styles.saveIconcamera}
              />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
            
            </View>
          </View>
          
          {isImageCaptured ? (
            <Image
              source={{ uri: capturedImage }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../assets/images/userprofile.png")}
              style={styles.defaultProfileImage}
            />
            )}
           
        </View>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/user.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setFirstNameError(""); // Clear the error when the input changes
              }}
            />
          </View>
          <Text style={styles.errorText}>{firstNameError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/user.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Middle Name"
              value={middleName}
              onChangeText={(text) => {
                setMiddleName(text);
                setMiddleNameError(""); // Clear the error when the input changes
              }}
            />
          </View>
          <Text style={styles.errorText}>{middleNameError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/user.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                setLastNameError(""); // Clear the error when the input changes
              }}
            />
          </View>
          <Text style={styles.errorText}>{lastNameError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/user.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="User Name"
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
                setUserNameError(""); // Clear the error when the input changes
              }}
            />
          </View>
          <Text style={styles.errorText}>{userNameError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/email.png")}
              style={styles.iconEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError("");
              }}
            />
          </View>
          <Text style={styles.errorText}>{emailError}</Text>

          <View style={styles.inputContainerphone}>
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
          color: '#00000040', // #00000040 is a semi-transparent black color
        },
      ],
      placeholder: "Phone Number",
      marginLeft: moderateScale(10),
      top: verticalScale(-1),
    }}
    flagButtonStyle={{
      marginTop: verticalScale(20),
    }}
    countryPickerButtonStyle={{
      marginTop: verticalScale(10),
    }}
    textProps={{
      style: {
        color: "#000000cc",
        fontWeight: "normal",
        fontFamily: 'Montserrat-Regular',
      },
    }}
    onChangeFormattedText={(text) => {
      // 'text' here contains the formatted number including the country code
      console.log("Formatted Phone Number:", text);
      setPhoneNumber(text);
      setPhoneNumberError("");
    }}
  />
</View>

          
          
          {/* <View style={styles.inputContainerphone}>
            <PhoneInput
              value={phoneNumber}
              defaultCode="US"
              layout="second"
              withDarkTheme
              textInputProps={{
                style: [
                  styles.phoneNumberInput,
                  styles.inputContainer2,
                  { paddingLeft: 20 , fontFamily:'Montserrat-Regular',},
                ],
                placeholder: "Phone Number",
                marginLeft: 10,
                top: -1,
                fontFamily:'Montserrat-Regular',
              }}
              textProps={{
                style: {
                  color: "#000000cc",
                  fontWeight: "normal",
                  fontFamily:'Montserrat-Regular',
                },
              }}
              onChangeFormattedText={(text) => {
                fontFamily:'Montserrat-Regular',
                // 'text' here contains the formatted number including the country code
                console.log("Formatted Phone Number:", text);
                setPhoneNumber(text);
                setPhoneNumberError("");
              }}
            />
          </View> */}

          <Text style={styles.errorText}>{phoneNumberError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/password.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Create Password"
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
          </View>
          <Text style={styles.errorText}>{passwordError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/password.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError("");
              }}
            />
            <TouchableWithoutFeedback onPress={toggleConfirmPasswordVisibility}>
              <Image
                source={
                  confirmPasswordVisible
                    ? require("../assets/images/eye-open.png")
                    : require("../assets/images/eye-closed.png")
                }
                style={styles.eyeIcon}
              />
            </TouchableWithoutFeedback>
          </View>
          {/* <Text style={styles.errorText}>{confirmPasswordError}</Text> */}

          <Text style={styles.errorText}>{confirmPasswordError}</Text>

          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/password.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Create Pin"
              secureTextEntry={!passwordVisible}
              value={pin}
              onChangeText={(text) => {
                setPin(text);
                setPinError("");
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
          </View>
          <Text style={styles.errorText}>{pinError}</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/images/password.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Pin"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPin}
              onChangeText={(text) => {
                setConfirmPin(text);
                setConfirmPinError("");
              }}
            />
            <TouchableWithoutFeedback onPress={toggleConfirmPasswordVisibility}>
              <Image
                source={
                  confirmPasswordVisible
                    ? require("../assets/images/eye-open.png")
                    : require("../assets/images/eye-closed.png")
                }
                style={styles.eyeIcon}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.errorText}>{confirmPinError}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="CREATE ACCOUNT"
            onPress={handleSignUp}
            style={styles.createButton}
          />
          {errorText ? (
            <Text style={styles.errorTextCredentials}>{errorText}</Text>
          ) : null}
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    top: verticalScale(20),
  },
  errorText: {
    color: "red",
    fontSize: moderateScale(7),
    marginTop: verticalScale(-14),
    marginLeft: scale(240),
    paddingTop: moderateScale(1),
  },
  image: {
    backgroundColor: "#f4ed3e",
    borderRadius: moderateScale(21.5),
    height: moderateScale(43),
    width: moderateScale(43),
    top: verticalScale(-55),
  },
  heading: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: "#00E",
    top: verticalScale(0),
  },
  inputContainer: {
    top: 0,
    marginBottom: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    borderWidth: 0.5,
    borderColor: "#ccc",
    elevation: Platform.OS === "android" ? moderateScale(5) : 0,
    height: verticalScale(50),
    width: scale(328),
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: scale(16),
  },
  icon: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginLeft: scale(20),
  },
  iconEmail: {
    height: moderateScale(12),
    width: moderateScale(15),
    marginLeft: scale(20),
  },
  eyeIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginLeft: scale(255),
  },
  input: {
    fontFamily:'Montserrat-Regular',
    flex: 1,
    paddingVertical: moderateScale(10),
    paddingHorizontal: scale(15),
    fontSize: moderateScale(16),
    height: verticalScale(50),
    width: scale(328),
    color: "#00000040",
    fontSize: moderateScale(12),
    fontWeight: "400",
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: scale(25),
  },
  buttonContainer: {
    justifyContent: "center",
    width: scale(328),
    height: verticalScale(40),
    alignItems: "center",
    marginTop: verticalScale(90),
    bottom: 0,
    borderRadius: moderateScale(3),
  },
  createButton: {
    width: scale(328),
    height: verticalScale(40),
    backgroundColor: "#00E",
    borderRadius: moderateScale(3),
    marginTop: verticalScale(-150),
    fontFamily: "Inter",
    textAlign: "center",
    fontSize:14,
    top: 0,
    left: 0,
    color: "#ffffff",
    fontSize: moderateScale(14),
    fontWeight: 600,
    lineHeight: moderateScale(20.16),
    letterSpacing: moderateScale(0.56),
    paddingTop:10,
  },
  headercontainerprofileImage: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: scale(50),
    alignSelf: "center",
    top: verticalScale(12),

    
   
  },
  // UserprofileImage: {
  //   backgroundSize: 'cover',
  //   borderStyle:"dashed",


  //   borderWidth: 0.3,
    
  //   borderColor: '#00E',
    
  // },
  

  profileImage: {
    borderRadius: scale(81),
    
    position: 'relative', 
     flex: 1,
    aspectRatio: 1,
    width: scale(71),
    height: verticalScale(71),
    alignSelf: 'center',
    top: verticalScale(-35),
    overflow: 'hidden',
    shadowColor: '#000',
    // backgroundSize: 'cover',
    borderStyle:"dashed",


     borderWidth: 0.3,
    
    borderColor: '#00E',
    
    
  },
  

  
  profileImagecamera: {
    width: scale(31),
    height: verticalScale(31),
    borderRadius: scale(50),
    backgroundColor: "#ffffff",
    alignSelf: "center",
    top: verticalScale(55),
    zIndex: 1,
  },
  saveIconcamera: {
    height: moderateScale(15),
    width: moderateScale(15),
    alignSelf: "center",
    top: verticalScale(8),
  },
  defaultProfileImage: {
    borderRadius: scale(50),
    overflow: "hidden",
    flex: 1,
    aspectRatio: 1,
    width: scale(71),
    height: verticalScale(71),
    borderRadius: scale(50),
    alignSelf: "center",
    top: verticalScale(-35),
  },
  // Phone styling
  inputContainer2: {
    top: 0,
    marginBottom: verticalScale(10),
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    borderWidth: 0.5,
    borderColor: "#ffffff",
    elevation: Platform.OS === "android" ? moderateScale(5) : 0,
    height: verticalScale(50.4),
    width: scale(238),
    flexShrink: 0,
    zIndex: 1,
    fontFamily:'Montserrat-Regular',
  },
  phoneNumberInput: {
    fontSize: moderateScale(16),
    height: moderateScale(30),
    color: "#00000040",
    fontSize: moderateScale(12),
    fontFamily:'Montserrat-Regular',
    fontWeight: "400",
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    position: "absolute",
    top: 0,
    left: -1,
  },
  inputContainerphone: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    height: verticalScale(50),
    width: scale(326),
    elevation: moderateScale(2),
    color: "rgba(0, 0, 0, 0.4)",
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(12),
    fontWeight: "400",
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    top: 0,
    left: 0,
    marginBottom: verticalScale(10),
  },
  errorTextCredentials: {
    color: "red",
    fontSize: moderateScale(7),
    marginTop: verticalScale(10),
    marginLeft: scale(10),
    paddingTop: moderateScale(1),
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f7f7f7",
//     top: 20,
//   },
//   errorText: {
//     color: "red", // Change the text color to red
//     fontSize: 7, // Adjust the font size
//     marginTop: -14, // Add some space between the input field and the error message
//     marginLeft: 240, // Add some space between the input field and the error
//     paddingTop: 1, // Add some space between the input field and the error
//   },

//   image: {
//     backgroundColor: "#f4ed3e",
//     borderRadius: 21.5, // Half of the height (43px) to make it circular
//     height: 43,
//     width: 43,
//     top: -55,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#007bff", // Blue color
//     top: 10,
//   },
//   inputContainer: {
//     top: 0,
//     marginBottom: 10,
//     flexDirection: "row", // Align icon and input horizontally
//     alignItems: "center", // Center vertically
//     backgroundColor: "#ffffff", // Light white background color
//     borderRadius: 2,
//     // position: 'fixed',
//     borderWidth: 0.5,
//     borderColor: "#ccc", // Light gray border color

//     elevation: Platform.OS === "android" ? 5 : 0,
//     height: 50,
//     width: 328,
//   },
//   scrollView: {
//     flex: 1, // Take up all available space
//     backgroundColor: "#fff", // Background color
//   },
//   scrollViewContent: {
//     padding: 16, // Padding around the content
//   },
//   icon: {
//     height: 12,
//     width: 12,
//     marginLeft: 20,
//   },
//   iconEmail: {
//     height: 12,
//     width: 15,
//     marginLeft: 20,
//   },
//   eyeIcon: {
//     width: 16,
//     height: 16,
//     marginLeft: 255,
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

//   buttonContainer: {
//     justifyContent: "center",
//     width: "328",
//     height: 40,
//     alignItems: "center",
//     marginTop: 90, // Adjust the margin top to your preference
//     top: 0,
//     left: 0,
//     borderRadius: 3,
//   },

//   createButton: {
//     width: 328, // Customize the button width
//     height: 40, // Customize the button height
//     backgroundColor: "#0000ee", // Customize the button background color
//     borderRadius: 3, // Customize the button border radius
//     marginTop: -150,
//     top: 0,
//     left: 0,
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: 600,
//     lineHeight: 20.2,
//     letterSpacing: 0.56,
//   },
//   headercontainerprofileImage: {
//     width: 100, // Should match the width of the parent view
//     height: 100, // Should match the height of the parent view
//     borderRadius: 50, // Half of width or height to make it circular
//     // backgroundColor: 'blue',
//     alignSelf: "center",
//     top: 9,

//     //  overflow: 'hidden',
//   },
//   profileImage: {
//     // zIndex: 1,
//     borderRadius: 50,
//     overflow: "hidden",
//     flex: 1,
//     aspectRatio: 1,
//     width: 71, // Should match the width of the parent view
//     height: 71, // Should match the height of the parent view
//     borderRadius: 50, // Half of width or height to make it circular

//     // backgroundColor: 'blue',
//     alignSelf: "center",
//     top: -35,
//   },
//   profileImagecamera: {
//     width: 31, // Should match the width of the parent view
//     height: 31, // Should match the height of the parent view
//     borderRadius: 50, // Half of width or height to make it circular
//     backgroundColor: "#ffffff",
//     alignSelf: "center",
//     top: 55,
//     zIndex: 1,
//   },
//   profileImage: {
//     // zIndex: 1,
//     borderRadius: 50,
//     overflow: "hidden",
//     flex: 1,
//     aspectRatio: 1,
//     width: 71, // Should match the width of the parent view
//     height: 71, // Should match the height of the parent view
//     borderRadius: 50, // Half of width or height to make it circular

//     // backgroundColor: 'blue',
//     alignSelf: "center",
//     top: -35,
//   },
//   saveIconcamera: {
//     height: 15,
//     width: 15,
//     // position: 'absolute',
//     alignSelf: "center",
//     top: 8,
//   },
//   defaultProfileImage: {
//     borderRadius: 50,
//     overflow: "hidden",
//     flex: 1,
//     aspectRatio: 1,
//     width: 71, // Should match the width of the parent view
//     height: 71, // Should match the height of the parent view
//     borderRadius: 50, // Half of width or height to make it circular

//     // backgroundColor: 'blue',
//     alignSelf: "center",
//     top: -35,
//   },
//   //phone styling

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
//     width: 236, //205
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
//   inputContainerphone: {
//     backgroundColor: "#ffffff",
//     borderRadius: 2,
//     height: 50,
//     width: 328,
//     elevation: 2,
//     color: "rgba(0, 0, 0, 0.4)",
//     fontFamily: "Montserrat-Regular",
//     fontSize: 12,
//     fontWeight: "400",
//     letterSpacing: 0.48,
//     lineHeight: 17.3,
//     // position: 'absolute',
//     top: 0,
//     left: 0,
//     marginBottom: 10,
//   },
//   errorTextCredentials: {
//     color: "red",
//     fontSize: 7,
//     marginTop: 10, // Adjust the value based on your UI
//     marginLeft: 10, // Adjust the value based on your UI
//     paddingTop: 1,
//   },
// });

export default SignUpScreen;
