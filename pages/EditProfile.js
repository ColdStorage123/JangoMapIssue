// import PhoneInput from 'react-native-phone-number-input';

import React, { useState, useEffect } from "react";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import PhoneInput from 'react-native-phone-number-input';
//  import CountryPicker from 'react-native-country-picker-modal';
const EditProfile = () => {
  const [parsedUserData, setParsedUserData] = useState({});
  const [userData, setUserData] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [middleName, setMiddleName] = useState("");
  const [middleNameError, setMiddleNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [userName, setUserName] = useState(userData?.username || '');
  const [userNameError, setUserNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [numberPart, setNumberPart] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(parsedUserData.phone_number || '');

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
  const [profileImage, setProfileImage] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [isProfileImageFetched, setIsProfileImageFetched] = useState(false);
  const [userId, setUserId] = useState(null);
// Add this line to declare userName
  const [userEmail, setUserEmail] = useState(null);
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

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        // Retrieve the stored user data from AsyncStorage
        const storedUserData = await AsyncStorage.getItem('userData Login');
  
        if (storedUserData) {
          // Parse the stored JSON string back into a JavaScript object
          const parsedUserData = JSON.parse(storedUserData);
  
          // Set the initial state for each input field
          setFirstName(parsedUserData.first_name || '');
          setMiddleName(parsedUserData.first_middle_name || '');
          setLastName(parsedUserData.last_name || '');
          setUserName(parsedUserData.username || '');
          setEmail(parsedUserData.email_address || '');
  
          // Check if the phone_number field is present and not empty
          setPhoneNumber(parsedUserData.phone_number || '');
  
          setPassword(parsedUserData.password || '');
          setConfirmPassword(parsedUserData.password || ''); // Assuming confirmPassword should match the password
          setPin(parsedUserData.pincode || '');
          
          console.log('Retrieved User Data:', parsedUserData);
        } else {
          console.warn('No stored user data found.');
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };
  
    // Call the function to retrieve user data when the component mounts
    retrieveUserData();
  }, []); // Empty dependency array to run the effect only once
  
  useEffect(() => {
    setPhoneNumber(parsedUserData.phone_number || '');
  }, [parsedUserData.phone_number]);

  const fetchProfileImage = async (userId) => {
    try {
      const response = await fetch(
        `https://jango-api-dev.jangoaddress.com/getProfileImage.php/${userId}`
      );
      console.log(
        `Request URL: https://jango-api-dev.jangoaddress.com/getProfileImage.php/${userId}`
      );
  
      if (response.ok) {
        const imageURL = `https://jango-api-dev.jangoaddress.com/getProfileImage.php/${userId}`;
        console.log("Profile image successfully fetched Edit:", imageURL);
        return imageURL;
      } else {
        console.error(
          "Failed to fetch profile image from the API. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
    return null;
  };
  
  useEffect(() => {
    fetchProfileImage(userId)
      .then((imageURL) => {
        if (imageURL) {
          console.log("Profile image fetched successfully Edit:", imageURL);
          setProfileImage(imageURL);
        } else {
          console.error("No image URL fetched.");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
  }, [userId]);
  



  //User data stored in AsyncStorage: {"address_ids": null, "confirmed_at": null, "created_at": "2023-11-20 18:47:39", "email_address": "", "email_verified": "0", "first_middle_name": "Muhammad", "first_name": "Muaaz", "full_names": "Muaaz Muhammad Farooq", "home_address_id": null, "husband_name": null, "id": "bcf1fdd51915f01d", "image": "https://jango-api-dev.jangoaddress.com/getProfileImage.php/bcf1fdd51915f01d", "last_name": "Farooq", "maiden_name": null, "main_phone_id": "864cf426adebe84e", "phone_number": "+923214559792", "profile_id": "66b75abf7f3148f9", "remember_token": "d86ea612dec96096c5e0fcc8dd42ab6d", "roles_id": "1", "second_middle_name": null, "updated_at": "2023-11-20 18:47:39", "username": "muaaz0394350", "work_address_id": null}

  
  // Helper function to check if a string is valid JSON
  useEffect(() => {
    const getStoredUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const fullNames = await AsyncStorage.getItem("full_names");
        const emailAddress = await AsyncStorage.getItem("email_address");
        const firstName = await AsyncStorage.getItem("first_name");
        console.log("Stored userId:", userId);
        console.log("Stored userName:", fullNames);
        console.log("Stored userEmail:", emailAddress);
        console.log("Stored userEmail:", firstName);
        if (userId !== null) {
          // Use the user data here
          setUserId(userId);
          // setUserName(fullNames);
          setUserEmail(emailAddress);

          console.log("Set userId:", userId);
          console.log("Set userName:", fullNames);
          console.log("Set userEmail:", emailAddress);
        } else {
          console.error("User data is not stored in AsyncStorage.");
          // Handle the case where user data is not available in AsyncStorage
        }
      } catch (error) {
        console.error("Error retrieving user data from AsyncStorage:", error);
      }
    };

    getStoredUserData();
  }, []);


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


  const removeImage = () => {
    setCapturedImage(null);
  };


  


  const handleUpdateProfile = () => {
    setFirstNameError("");
    setMiddleNameError("");
    setLastNameError("");
    setUserNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setPasswordError("");
    // setConfirmPasswordError("");
    setPinError("");
    // setConfirmPinError("");
    setErrorText(null);
 
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
      // if (!arePinsEqual(pin, confirmPin)) {
      //   setPinError("Pins do not match!");
      //   setConfirmPinError("Pins do not match!");
      //   return;
      // }
    }
    const formData = new FormData();

 

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
      jsonData.pincode = pin;
    }
    // const formData = new FormData();
    // Append JSON data to the formData
    formData.append("jsonData", JSON.stringify(jsonData));
    console.log("FormData Final:", formData);

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
    console.log("Data sent to the server EditProfile :", formData);
    // Make an HTTP POST request to the API endpoint
    axios
      .post(
        `https://jango-api-dev.jangoaddress.com/updateProfile.php?id=${userId}`,
        // "https://jango-api-dev.jangoaddress.com/updateProfile.php?id=bcf1fdd51915f01d",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 5000, // Set a reasonable timeout in milliseconds
        }
      )

      .then((response) => {
        if (response.status === 200) {
          console.log("User Details Edited successfully");
          console.log("User Updated successfully with details", formData);
            // Update local storage with new user details
        updateUserDetailsLocally(jsonData);
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
        console.error("Updation failed:", error);
        console.log("Error details:", error.toJSON());
        if (error.response) {
          console.error("Server responded with data:", error.response.data);

          if (error.response.status === 400) {
            setErrorText(
              error.response.data.message ||
                "Updation failed. Please try again."
            );
          } else {
            setErrorText(
              error.response.data.message ||
                "Updation failed. Please try again."
            );
          }
        } else {
          setErrorText("Updation failed. Please try again.");
        }
      });
    
  };
  const updateUserDetailsLocally = (newUserData) => {
    // Assuming you have a function to update AsyncStorage, adjust it accordingly
    // Example:
    AsyncStorage.removeItem('userData Login') // Remove previous user data
      .then(() => {
        console.log('Previous user data removed from AsyncStorage');
  
        AsyncStorage.setItem('userData Login', JSON.stringify(newUserData))
          .then(() => {
            console.log('User data updated in AsyncStorage:', newUserData);
          })
          .catch((error) => {
            console.error('Failed to update user data in AsyncStorage:', error);
          });
      })
      .catch((error) => {
        console.error('Failed to remove previous user data from AsyncStorage:', error);
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
   

      <View style={styles.container}>

      <View style={styles.headercontainerprofileImage}>
  <View style={styles.profileImagecamera}>
    <TouchableOpacity onPress={takePhoto}>
      <Image
        source={require("../assets/images/camera.png")}
        style={styles.saveIconcamera}
      />
    </TouchableOpacity>
    <View style={styles.buttonContainer}></View>
  </View>

  {isImageCaptured ? (
    <Image
      source={{ uri: capturedImage }}
      style={[styles.profileImage, { width: 100, height: 100 }]}
    />
  ) : profileImage ? (
    <Image
      source={{ uri: `https://jango-api-dev.jangoaddress.com/getProfileImage.php/${userId}` }}
      style={[styles.profileImage, { width: 100, height: 100 ,}]}
    />
  ) : (
    <Image
      source={require("../assets/images/userprofile.png")}
      style={[styles.defaultProfileImage, { width: 100, height: 100 }]}
    />
  )}
</View>

       
        {/* <View style={styles.headercontainerprofileImage}>
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
          
        </View> */}


        <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton}  onPress={handleUpdateProfile}>
    <Image
      source={require('../assets/images/saveIcon.png')} // Replace with the correct path to your image
      style={styles.saveIcon} // Apply custom styles to the image here
    />
    <Text style={styles.savebuttonText}>Save</Text>
        </TouchableOpacity>
        </View>



        <View style={styles.headerLine}></View>
        <Text style={styles.heading}>Contact Information</Text>
<ScrollView style={styles.FormContainer} showsVerticalScrollIndicator={false}>
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

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/password.png")}
            style={styles.iconPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
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
              paddingLeft: moderateScale(20), // Use moderateScale for responsive padding
              fontFamily: 'Montserrat-Regular',
              color: '#00000040',
            },
          ],
          placeholder: "Phone Number",
          marginLeft: moderateScale(10), // Use moderateScale for responsive margin
          top: -1,
        }}
        flagButtonStyle={{
          marginTop: moderateScale(10), // Use moderateScale for responsive margin
        }}
        countryPickerButtonStyle={{
          marginTop: moderateScale(10), // Use moderateScale for responsive margin
        }}
        textProps={{
          style: {
            color: "#000000cc",
            fontWeight: "normal",
            fontFamily: 'Montserrat-Regular',
          },
        }}
        onChangeFormattedText={(text) => {
          console.log("Formatted Phone Number:", text);
          setPhoneNumber(text);
          setPhoneNumberError("");
        }}
      />
    </View>
        <Text style={styles.errorText}>{phoneNumberError}</Text>
  
        <Text style={styles.errorText}>{passwordError}</Text>
        {/* <View style={styles.inputContainer}>
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
       

        <Text style={styles.errorText}>{confirmPasswordError}</Text> */}
        
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/password.png")}
            style={styles.iconPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Pin"
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
        {/* <View style={styles.inputContainer}>
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
          <Text style={styles.errorText}>{confirmPinError}</Text> */}
          </ScrollView>
     
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    top: verticalScale(20),
  },
  FormContainer:{flex: 1},
  errorText: {
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: verticalScale(-14),
    marginLeft: scale(240),
    paddingTop: moderateScale(1),
  },
  image: {
    backgroundColor: '#f4ed3e',
    borderRadius: moderateScale(21.5),
    height: moderateScale(43),
    width: moderateScale(43),
    top: verticalScale(-55),
  },
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
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    borderWidth: 0.5,
    borderColor: '#ccc',
    elevation: Platform.OS === 'android' ? moderateScale(5) : 0,
    height: verticalScale(50),
    width: scale(328),
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: scale(16),
  },
  icon: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginLeft: scale(20),
  },
  iconPassword: {
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
    flex: 1,
    fontFamily:'Montserrat-Regular',
    paddingVertical: moderateScale(10),
    paddingHorizontal: scale(15),
    fontSize: moderateScale(16),
    height: verticalScale(50),
    width: scale(328),
    color: '#00000040',
    fontSize: moderateScale(12),
    fontWeight: '400',
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: scale(25),
  },
  buttonContainer: {
    justifyContent: 'center',
    width: scale(328),
    height: verticalScale(40),
    alignItems: 'center',
    marginTop: verticalScale(90),
   bottom:0,
    borderRadius: moderateScale(3),
  },
  createButton: {
    width: scale(328),
    height: verticalScale(40),
    backgroundColor: '#0000ee',
    borderRadius: moderateScale(3),
    marginTop: verticalScale(-150),
    top: 0,
    left: 0,
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: 600,
    lineHeight: moderateScale(20.2),
    letterSpacing: moderateScale(0.56),
  },
  headercontainerprofileImage: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: scale(50),
    alignSelf: 'center',
    // top: verticalScale(9),
  },
  profileImage: {
    borderRadius: scale(50),
    overflow: 'hidden',
    flex: 1,
    aspectRatio: 1,
    width: scale(71),
    height: verticalScale(71),
    borderStyle: 'dashed',
    borderColor:'#00E',
    alignSelf: 'center',
    top: verticalScale(-35),
    borderStyle:"dashed",


    borderWidth: 0.3,
   
   borderColor: '#00E',
   
  },
  profileImagecamera: {
    width: scale(31),
    height: verticalScale(31),
    borderRadius: scale(50),
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    top: verticalScale(55),
    zIndex: 1,
  },
  saveIconcamera: {
    height: moderateScale(15),
    width: moderateScale(15),
    alignSelf: 'center',
    top: verticalScale(8),
  },
  defaultProfileImage: {
    borderRadius: scale(50),
    overflow: 'hidden',
    flex: 1,
    aspectRatio: 1,
    width: scale(71),
    height: verticalScale(71),
    borderRadius: scale(50),
    alignSelf: 'center',
    top: verticalScale(-35),
    
  },
  // Phone styling
  inputContainer2: {
    top: 0,
    marginBottom: verticalScale(10),
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    borderWidth: 0.5,
    borderColor: '#ffffff',
    elevation: Platform.OS === 'android' ? moderateScale(5) : 0,
    height: verticalScale(50.5),
    width: scale(238),
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
  inputContainerphone: {
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    height: verticalScale(50),
    width: scale(326),
    elevation: moderateScale(2),
    color: 'rgba(0, 0, 0, 0.4)',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(12),
    fontWeight: '400',
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    top: 0,
    left: 0,
    marginBottom: verticalScale(10),
  },
  errorTextCredentials: {
    color: 'red',
    fontSize: moderateScale(7),
    marginTop: verticalScale(10),
    marginLeft: scale(10),
    paddingTop: moderateScale(1),
  },
  saveButtonContainer: {
    alignSelf: 'flex-end',
    top: moderateScale(-140),
  },
  saveIcon: {
    height: moderateScale(15),
    width: moderateScale(15),
    position: 'absolute',
    top: moderateScale(3.5),
    left: moderateScale(12),
  },
  saveButton: {
    backgroundColor: '#0000ee1a',
    borderRadius: moderateScale(2),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.3, // Set your preferred shadow opacity
    shadowRadius: moderateScale(2),
    height: moderateScale(23),
    width: moderateScale(84),
    justifyContent: 'center',
    alignItems: 'center',
    top: moderateScale(90),
    left: moderateScale(-15),
    alignSelf: 'flex-end',
  },
  savebuttonText: {
    color: '#0000ee',
    fontFamily: 'Inter-Regular', // Make sure the font is available in your project
    fontSize: moderateScale(8),
    fontWeight: '400',
    letterSpacing: moderateScale(0.4),
    top: 0,
    left: moderateScale(8),
    width: moderateScale(28),
  },
});


export default EditProfile;
