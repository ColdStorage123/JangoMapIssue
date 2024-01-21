import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,Pressable,
  Image,
  Alert,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
//  const { userId } = route.params;
// import Geolocation from '@react-native-community/geolocation';
import * as Location from "expo-location";
import * as ImageManipulator from "expo-image-manipulator";
import {
  // Other imports
  PermissionsAndroid,
  Platform,
} from "react-native";

import CheckBox from "@react-native-community/checkbox";
import HelpView from "../components/HelpView";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// import { launchCamera} from 'react-native-image-picker'; // Import the image picker library
// // import { TouchableOpacity } from 'react-native-gesture-handler';
// import {launchImageLibrary} from 'react-native-image-picker';
const CustomCheckBox = ({ checked, onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};
const CreateJangoAddress = ({ navigation }) => {
  const [businessName, setBusinessName] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [unitType, setUnitType] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [unitNum, setUnitNum] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [isCheckBoxChecked, setCheckBoxChecked] = useState(false);
  const [businessNameHelpVisible, setBusinessNameHelpVisible] = useState(false);
  const [plotNumberHelpVisible, setPlotNumberHelpVisible] = useState(false);
  const [unitTypeHelpVisible, setUnitTypeHelpVisible] = useState(false);
  const [unitTypeSelection, setUnitTypeSelection] = useState("");
  const [unitTypeModalVisible, setUnitTypeModalVisible] = useState(false);
  const [extension, setExtension] = useState('');
  // Add more states for other input fields as needed
  const [helpViewVisible, setHelpViewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // State variable to store the captured image URI
  const [latitude, setLatitude] = useState(null); // Declare latitude state variable
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isImageCaptured, setIsImageCaptured] = useState(false);


  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxPress = () => {
    setIsChecked(!isChecked);
  };
  
  // useEffect(() => {
  //   const getStoredUserId = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem("userId");
  //       if (userId !== null) {
  //         // Use the userId here
  //         console.log("Stored userId:", userId);
  //       } else {
  //         console.error("userId is not stored in AsyncStorage.");
  //         // Handle the case where userId is not available in AsyncStorage
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving userId from AsyncStorage:", error);
  //     }
  //   };

  //   getStoredUserId();
  // }, []);
  useEffect(() => {
    // const getStoredUserData = async () => {
    //   try {
    //     const userDataString = await AsyncStorage.getItem("userData");
    //     if (userDataString) {
    //       const userData = JSON.parse(userDataString);
    //       const userId = userData.id; // Access the userId from the userData
    //       console.log("Stored userId:", userId);
    //     } else {
    //       console.error("User data is not stored in AsyncStorageuuu.");
    //       // Handle the case where user data is not available in AsyncStorage
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving user data from AsyncStorage:", error);
    //   }
    // };
    // getStoredUserData();

    const getStoredUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const full_names = await AsyncStorage.getItem("full_names");
        const email_address = await AsyncStorage.getItem("email_address");

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
        console.error("Error retrieving user data from AsyncStorage:", error);
      }
    };

    getStoredUserData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        location(location);

        // Obtain the user ID and other data needed for the API request
        const userId = await AsyncStorage.getItem("userId"); // Replace with the actual user ID
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        // Function to fetch address components
        const fetchAddressComponents = async () => {
          try {
            const url = `https://jango-api-dev.jangoaddress.com/getAddressComponents.php?id=${userId}&latitude=${latitude}&longitude=${longitude}`;
            const response = await axios.get(url);
            return response.data;
          } catch (error) {
            console.error("API call error:", error);
            return null;
          }
        };

        // Call the function to fetch address components
        const data = await fetchAddressComponents();
        if (data) {
          // Store the fetched data in the component's state (if needed)
          console.log("Fetched data:", data);
        }
      } catch (error) {
        setErrorMsg("Error getting location: " + error.message);
      }
    })();
  }, []);

  // const takePhoto = async () => {
  //     const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //     if (status !== 'granted') {
  //       Alert.alert('Permission Denied', 'We need access to your camera to take a picture.');
  //       return;
  //     }

  //     const result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       setCapturedImage(result.uri);
  //     }
  //   };
  //remove below in caseor error

  const takePhoto = () => {
    Alert.alert(
      "Choose Image Source",
      "Select the image source for your profile picture:",
      [
        {
          text: "Camera",
          onPress: () => {
            // Capture image from the camera
            captureImageFromCamera();
          },
        },
        {
          text: "Gallery",
          onPress: () => {
            // Select an image from the gallery
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageType = result.uri.split(".").pop().toLowerCase();

      if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
        try {
          const resizedImage = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 500 } }]
          );

          // Now, you can set the captured image
          setCapturedImage(resizedImage.uri);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const imageType = result.uri.split(".").pop().toLowerCase();

      if (imageType === "jpeg" || imageType === "jpg" || imageType === "png") {
        setCapturedImage(result.uri);
        setIsImageCaptured(true);
      } else {
        console.log(
          "Image format is not supported. Please select a JPEG, JPG, or PNG file."
        );
      }
    } else {
      console.log("Image selection from gallery cancelled");
    }
  };

  const removeImage = () => {
    setCapturedImage(null);
  };

  const retakePhoto = async () => {
    // Implement the logic to retake a photo here
    // For example, you can reset the capturedImage state to null
    setCapturedImage(null);
  };

  const toggleHelpView = (fieldName) => {
    switch (fieldName) {
      case "businessName":
        setBusinessNameHelpVisible(!businessNameHelpVisible);
        setPlotNumberHelpVisible(false);
        setUnitTypeHelpVisible(false);
        // Add similar lines for other help states as needed
        break;
      case "plotNumber":
        setPlotNumberHelpVisible(!plotNumberHelpVisible);
        setBusinessNameHelpVisible(false);
        setUnitTypeHelpVisible(false);
        // Add similar lines for other help states as needed
        break;
      case "unitType":
        setUnitTypeHelpVisible(!unitTypeHelpVisible);
        setBusinessNameHelpVisible(false);
        setPlotNumberHelpVisible(false);
        // Add similar lines for other help states as needed
        break;
      // Add more cases for other fields as needed
      default:
        // Handle unexpected cases here
        break;
    }
  };

  const toggleUnitTypeModal = () => {
    setUnitTypeModalVisible(!unitTypeModalVisible);
  };

  const handleSubmit = async () => {
    setBusinessNameHelpVisible(false);
    setPlotNumberHelpVisible(false);
    setUnitTypeHelpVisible(false);
    try {
      // Prepare the data to send to the API

      const userId = await AsyncStorage.getItem("userId");
      const requestData = {
        business_name: businessName,
        image: capturedImage, // Assuming capturedImage holds the image data.
        image_extension: ".jpg", // Example image extension
        latitude: latitude,
        longitude: longitude,
        house_plot_nbr: plotNumber, // Assuming plotNumber holds the house/plot number
        house_plot_extension: "", // Add extension if needed
        userSSName: street,
        userSNName: zipCode,
        ras_number: unitType,
        ras_type: "", // Add type if needed
        city_town_village: city,
        region_province_state: region,
        country: country,
        // Add other fields as needed
      };

      const response = await axios.post(
        `https://jango-api-dev.jangoaddress.com/createJanGoAddress.php?id=${userId}`,
        requestData
      );

      console.log("API response:", response.data);
      Alert.alert(
        "Success",
        `Your Address has been successfully created\nJango Address: ${plotNumber} ${street} ${unitType}, ${city}, ${region}, ${country}`,
        [
          {
            text: "Share Address",
            onPress: () => {
              // Implement the Share Address functionality
              // For example, you can use Share API
            },
          },
          {
            text: "View My Addresses",
            onPress: () => {
              // Implement the View My Addresses functionality
              // For example, navigate to a screen that displays user addresses
            },
          },
        ]
      );
      // Handle the API response as needed
    } catch (error) {
      console.error("API call error:", error);
      console.error("API response data:", error.response.data);
      // Handle the error, e.g., display an error message to the user
    }
  };
  const handleEdit = () => {
    // Implement user registration logic here
    // Include validations and registration API call
  };
  //    const handleHelp = (fieldName) => {
  //   switch (fieldName) {
  //     case 'BusinessName':
  //       Alert.alert('If this address is for your business or an organization like NGO, Bank, School, Hospital, Restaurant etc. You can enter the name of that business organization here.');
  //       break;
  //     case 'PlotNumber':
  //       Alert.alert('House/Plot Number Help', 'Enter your house or plot number.');
  //       break;
  //     case 'UnitType':
  //       Alert.alert('Unit Type & Number Help', 'Provide the type and number of the unit.');
  //       break;
  //     // Add more cases for other fields as needed
  //     default:
  //       // Handle unexpected cases here
  //       break;
  //   }
  // };

  useEffect(() => {
    // const requestLocationPermission = async () => {
    //   if (Platform.OS === 'ios') {
    //     getOneTimeLocation();
    //   } else {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Location Access Required',
    //           message: 'This App needs to Access your location',
    //         }
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         getOneTimeLocation();
    //       } else {
    //         // Handle permission denied
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   }
    // };

    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
      } else {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (!hasPermission) {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: "Location Access Required",
                message: "This App needs to Access your location",
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getOneTimeLocation();
            } else {
              // Handle permission denied
            }
          } catch (err) {
            console.warn(err);
          }
        } else {
          getOneTimeLocation(); // Permission is already granted
        }
      }
    };
    requestLocationPermission();

    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      .then((position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        setLatitude(currentLatitude);
        setLongitude(currentLongitude);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getOneTimeLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       // Store the latitude and longitude in the state
  //       const currentLatitude = position.coords.latitude;
  //       const currentLongitude = position.coords.longitude;
  //       setLatitude(currentLatitude);
  //       setLongitude(currentLongitude);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //       maximumAge: 1000,
  //     }
  //   );
  // };

  return (
    <SafeAreaView style={styles.safeArea} >
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={takePhoto}>
          {capturedImage ? (
            <>
              <TouchableOpacity
                onPress={removeImage}
                style={styles.closeButton}
              >
                <Image
                  source={require("../assets/images/CancelJango.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: capturedImage }}
                style={styles.imageContainercaptured} // Apply styles to match the container
              />

              <TouchableOpacity
                onPress={retakePhoto}
                style={styles.changebuttonContainer}
              >
                <Image
                  source={require("../assets/images/changebutton.png")}
                  style={styles.changebutton}
                />
              </TouchableOpacity>
            </>
          ) : (
            <Image
              source={require("../assets/images/jangoAdress/Maincamera.png")}
              style={styles.CameraimagePlaceholder} // Apply styles to match the container
            />
          )}
        </TouchableOpacity>
        {capturedImage ? null : (
    <Text style={styles.cameraText}>+ Add a Picture</Text>
  )}
      </View>

      <ScrollView contentContainerStyle={styles.formcontainer} showsVerticalScrollIndicator={false}>
        {businessNameHelpVisible && (
          <View style={styles.helpContainer1}>
            <Text style={styles.helpText}>
              If this address is for your business or an organization like NGO,
              Bank, School, Hospital, Restaurant, etc., you can enter the name
              of that business organization here.
            </Text>
          </View>
        )}


{/* 
        <View style={styles.inputContainer}>
         <Text style={styles.labelText}>Business Name [Optional]</Text>
         
          <Image
            source={require("../assets/images/jangoAdress/field1.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            
            style={styles.input}
            placeholder="Business Name"
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              // Hide the help dialog for this field
              setBusinessNameHelpVisible(false);
            }}
          />
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => toggleHelpView("businessName")}
          >
            <Image
              source={require("../assets/images/help.png")}
              style={styles.Helpicon}
            />
            </TouchableOpacity>
           
        </View> */}

<View style={styles.inputContainer}>
  <Text style={styles.labelText}>Business Name [Optional]</Text>

  <View style={styles.inputWrapper}>
    <Image
      source={require("../assets/images/jangoAdress/field1.png")}
      style={styles.icons}
    />
    <TextInput
      style={styles.input}
      placeholder="Business Name"
      value={businessName}
      onChangeText={(text) => {
        setBusinessName(text);
        setBusinessNameHelpVisible(false);
      }}
            />
                 <View style={styles.helpImageContainer1}>
    <TouchableOpacity
      style={styles.helpButton}
      onPress={() => toggleHelpView("businessName")}
    >
      <Image
        source={require("../assets/images/help.png")}
        style={styles.Helpicon}
      />
            </TouchableOpacity>
            </View> 

            <View style={styles.dottedLine}></View>
  </View>
        </View>
        


        <View style={styles.inputContainer}>
  <Text style={styles.labelText}>House - Plot Number</Text>
  <View style={styles.inputWrapperHouse}>
    <Image
      source={require("../assets/images/jangoAdress/field2.png")}
      style={styles.icons}
    />
    {plotNumberHelpVisible && (
      <View style={styles.helpContainer2}>
        <Text style={styles.helpText}>
          A letter can be attached to the house numbers if you are creating an
          address for multiple buildings within the same compound, so each has
          a distinct address. Example: 75A Borstal Street and 75B Borstal Street.
        </Text>
      </View>
    )}
<TextInput
  style={styles.input1}
  placeholder="Enter a Number"
  value={plotNumber}
  onChangeText={(text) => {
    setPlotNumber(text);
    setPlotNumberHelpVisible(false);
  }}
  numberOfLines={1}
  textAlignVertical="center"
/>

    <View style={styles.separator}></View>
    <View style={styles.input2Container}>
      <TextInput
        style={styles.input2}
        placeholder="Enter Extension"
        value={extension}
        onChangeText={(text) => {
          setExtension(text);
          // Handle extension input if needed
        }}
      />
            </View>
            
            <View style={styles.helpImageContainer1}>
    <TouchableOpacity
      style={styles.helpButton}
      onPress={() => toggleHelpView("plotNumber")}
    >
      <Image
        source={require("../assets/images/help.png")}
        style={styles.Helpicon}
      />
              </TouchableOpacity>
              </View>
  </View>
  <View style={styles.dottedLine1}></View>
</View>



        


        {/* UnitNumber */}
        

      


{/* extra can remove */}
        
        <View style={styles.inputContainerUnit}>
          <Text style={styles.labelTextUnit}>Unit Type & Number</Text>
          <View style={styles.inputWrapperUnit}>
      <Image
        source={require("../assets/images/jangoAdress/field3.png")}
        style={styles.icons}
      />

      {unitTypeHelpVisible && (
        <View style={styles.helpContainer3}>
          <Text style={styles.helpText}>
            Use this to specify the address of a Room, Apartment, Suite, or Plot within a compound or large building.
          </Text>
        </View>
      )}

      <View style={styles.inpNum}>
        <TextInput
          style={styles.input3}
          placeholder="Enter a Number"
          keyboardType="numeric"
          value={unitNum}
          onChangeText={setUnitNum}
        />
      </View>

      <View style={styles.separatorUnit}></View>

      {unitType !== '' ? (
  <View style={styles.selectedUnitTypeContainer}>
    <Text style={styles.selectedUnitTypeText}>{unitType}</Text>
  </View>
) : (
  <View style={styles.selectedUnitTypeContainer}>
    <Text style={styles.selectedUnitTypeText}>Select Type</Text>
  </View>
)}

      <Modal
        animationType="slide"
        transparent={true}
        visible={unitTypeModalVisible}
        onRequestClose={() => {
          setUnitTypeModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={["Room", "Apartment", "Suite", "Plot"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setUnitType(item);
                  setUnitTypeModalVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>


  
          </View>
          
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={() => setUnitTypeModalVisible(true)}>
          <Image
            source={require("../assets/images/jangoAdress/down.png")}
            style={styles.dropdownArrow}
          />
        </TouchableOpacity>
      </View>
          <View style={styles.helpImageContainer}>
        <TouchableOpacity
          style={styles.helpButtons}
          onPress={() => toggleHelpView("unitType")}
        >
          <Image
            source={require("../assets/images/help.png")}
            style={styles.Helpicon}
          />
              </TouchableOpacity>
              </View>
          <View style={styles.dottedLine1}></View>
    </View>
{/* extra can remove */}

        

        
{/* ending  */}















        <View style={styles.inputContainer}>
          <Text style={styles.labelText1}>Street</Text>
          
    <Image
      source={require("../assets/images/jangoAdress/field4.png")}
      style={styles.iconStreet}
    />
    <TextInput
      style={styles.inputStreet}
      placeholder="Street"
      value={street}
      onChangeText={setStreet}
    />

    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
      <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
             <View style={styles.dottedLineStreet}></View>
    </View>
 
 
     




        <View style={styles.inputContainer}>
          <Text style={styles.labelText1}>Neighborhood - Zip Code</Text>
          <View style={styles.inputWrapper}>
          <Image
            source={require("../assets/images/jangoAdress/field5.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.inputNeighbour}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={setZipCode}
          />

          <TouchableOpacity style={styles.editButtonNeighbour} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.dottedLine}></View>
            </View>
        </View>


        {/* <View style={styles.inputContainer}>
          <Text style={styles.labelText}>City-Town-Village</Text>
          <View style={styles.inputWrapperCity}>
          <Image
            source={require("../assets/images/jangoAdress/field6.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="City-Town-Village"
            value={city}
            onChangeText={setCity}
          />

            <View style={styles.dottedLine}></View>
            </View>
        </View> */}



        <View style={styles.inputContainer}>


      <View style={styles.cityContainer}>
    <Text style={styles.labelTextCity}>City-Town-Village</Text>
    <Image
      source={require("../assets/images/jangoAdress/field6.png")}
      style={styles.icon}
    />
    <TextInput
      style={styles.input}
      placeholder="City-Town-Village"
      value={city}
      onChangeText={setCity}
    />
  </View>

  <View style={styles.dottedLineCity}></View>
        </View>




        <View style={styles.inputContainer}>
        <View style={styles.provinceContainer}>
        <Text style={styles.labelTextProvience}>Region-Province-State</Text>
          <Image
            source={require("../assets/images/jangoAdress/field77.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="Region-Province-State"
            value={region}
            onChangeText={setRegion}
            />
          </View>
          <View style={styles.dottedLineCity}></View>
        </View>

        <View style={styles.inputContainer}>
        <View style={styles.countryContainer}>
        <Text style={styles.labelTextCountry}>Country</Text>
          <Image
            source={require("../assets/images/jangoAdress/field8.png")} // Replace with the correct path to your image
            style={styles.icon} // Apply custom styles to the image here
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            />
            </View>
          <View style={styles.dottedLineCity}></View>
        </View>

        {/* Add a checkbox for "I confirm the address" */}
        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={isCheckBoxChecked}
            onValueChange={(newValue) => setCheckBoxChecked(newValue)}
          />
          <Text>
            Check the box to confirm that you are currently standing at the
            location of the address you are creating
          </Text>
        </View> */}

        {/* Button */}

        <View style={styles.CheckBoxContainer}>
      <CustomCheckBox checked={isChecked} onPress={handleCheckBoxPress} title="Check the box to confirm that you are currently standing at the location of the address you created" />
    </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Submit Address</Text>
        </TouchableOpacity>
        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            value={isCheckBoxChecked}
            onValueChange={setCheckBoxChecked}
          />
          <Text>Agree to terms and conditions</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  // },
  // container: {
    
  //   alignItems: "center",
  //   top: 0,
  //   padding: 16,
  // },

  // imageContainer: {
  //   backgroundColor: "#ffffff",
  //   borderWidth: 2,
  //   borderColor: "#0000000d",
  //   borderRadius: 4,
  //   height: 178,
  //   alignItems: "center",
  //   top: 0,
  //   left: 0,
  //   width: 328,
  //   marginLeft: 15,
  // },
  // formcontainer: {
    
  //   alignSelf: "center",
  //   top: 0,
  //    padding: 5,
  // },
  // imageContainercaptured: {
  //   //  backgroundColor: '#ffffff',
  //   borderWidth: 2,
  //   // borderColor: '#0000000d',
  //   borderRadius: 4,
  //   height: 178,
  //   alignItems: "center",
  //   top: 0,
  //   left: 0,
  //   width: 328,
  //   // marginLeft: 15,
  // },
  // CameraimagePlaceholder: {
  //   top: 40,
  // },
  // CameraimageContainer: {
  //   height: 59,
  //   width: 71,
  //   position: "absolute",
  //   top: 11,
  //   left: 5,
  //   alignSelf: "center",
  // },
  // closeButton: {
  //   position: "absolute",
  //   top: 10,
  //   right: 10,
  //   backgroundColor: "transparent",
  //   zIndex: 1,
  //   padding: 5,
  //   borderRadius: 50,
  // },
  // changebuttonContainer: {
  //   position: "absolute",
  //   top: 145,
  //   right: 10,
  //   backgroundColor: "transparent",
  //   zIndex: 1,
  //   padding: 5,
  //   borderRadius: 50,
  // },
  // closeIcon: {
  //   width: 20,
  //   height: 20,
  // },
  // cameraText: {
  //   color: "#0000ee",
  //   fontFamily: "Inter-Regular",
  //   fontSize: 10,
  //   fontWeight: "400",
  //   letterSpacing: 0,
  //   lineHeight: 14.4,

  //   top: 50,
  //   left: 0,
  //   //   whiteSpace: 'nowrap',
  // },

  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    top: 0,
    padding: moderateScale(16),
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    borderWidth: moderateScale(2),
    borderColor: "#0000000d",
    borderRadius: moderateScale(4),
    height: verticalScale(178),
    alignItems: "center",
    top: 0,
    left: 0,
    width: scale(328),
    marginLeft: moderateScale(15),
  },
  formcontainer: {
    alignSelf: "center",
    top: 0,
    padding: moderateScale(5),
  },
  imageContainercaptured: {
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(4),
    height: verticalScale(178),
    alignItems: "center",
    top: 0,
    left: 0,
    width: scale(328),
  },
  CameraimagePlaceholder: {
    top: verticalScale(40),
  },
  CameraimageContainer: {
    height: verticalScale(59),
    width: scale(71),
    position: "absolute",
    top: verticalScale(11),
    left: moderateScale(5),
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10),
    backgroundColor: "transparent",
    zIndex: 1,
    padding: moderateScale(5),
    borderRadius: moderateScale(50),
  },
  changebuttonContainer: {
    position: "absolute",
    top: verticalScale(145),
    right: moderateScale(10),
    backgroundColor: "transparent",
    zIndex: 1,
    padding: moderateScale(5),
    borderRadius: moderateScale(50),
  },
  closeIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  cameraText: {
    color: "#0000ee",
    fontFamily: "Inter-Regular",
    fontSize: moderateScale(10),
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: moderateScale(14.4),
    top: verticalScale(50),
    left: 0,
  },








  inputContainer: {
    top: 0,
    marginBottom: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    borderWidth: moderateScale(0.5),
    borderColor: "#ccc",
    elevation: Platform.OS === "android" ? moderateScale(5) : 0,
    height: verticalScale(50),
    width: scale(330),
  },
  inputContainerUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    borderWidth: moderateScale(0.5),
    borderColor: '#ccc',
    elevation: Platform.OS === 'android' ? moderateScale(5) : 0,
    height: verticalScale(50),
    width: scale(330),
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  input3: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    shadowColor: '#0000001a',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    height: verticalScale(40),
    width: scale(120),
    marginVertical: verticalScale(10),
    padding: moderateScale(1),
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    left: 0,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    height: verticalScale(40),
    width: scale(200),
    marginVertical: verticalScale(10),
    padding: moderateScale(10),
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    left: 0,
    fontSize: moderateScale(12),
    top: 0,
  },
  inputNeighbour: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    height: verticalScale(40),
    width: scale(250),
    marginVertical: verticalScale(10),
    padding: moderateScale(10),
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    left: 0,
    fontSize: moderateScale(12),
  },
  input1: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    height: verticalScale(40),
    width: scale(135),
    marginVertical: verticalScale(10),
    padding: moderateScale(10),
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    textAlignVertical: 'center',
  },
  
  icon: {
    height: verticalScale(17),
    width: moderateScale(21),
    marginLeft: moderateScale(20),
  },
  icons: {
    height: verticalScale(17),
    width: moderateScale(21),
    marginLeft: moderateScale(15),
  },
  helpButton: {
    height: verticalScale(8),
    width: moderateScale(10),
    top: verticalScale(-35),
    left: moderateScale(60),
    marginLeft: moderateScale(-90),
    alignSelf: "flex-end",
  },
  helpButtons: {
    height: verticalScale(8),
    width: moderateScale(10),
    alignSelf: "flex-end",
    top: verticalScale(-20),
    left: moderateScale(-37),
  },
  Helpicon: {
    height: verticalScale(18),
    width: moderateScale(31.091),
    left: moderateScale(7.18),
    alignSelf: 'flex-end',
    tintColor: '#00E',
  },
  loginButton: {
    backgroundColor: "#0000ee",
    borderRadius: moderateScale(3),
    height: verticalScale(40),
    width: moderateScale(330),
    top: verticalScale(-25),
    left: 0,
  },
  loginButtonText: {
    color: "white",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.2),
    textAlign: "center",
    paddingTop: verticalScale(8),
    top: 0,
    left: 0,
  },
  selectedUnitTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    shadowColor: '#0000001a',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    height: verticalScale(40),
    alignSelf: 'flex-start',
    marginVertical: verticalScale(10),
    marginRight: moderateScale(-40),
    paddingRight: moderateScale(10),
  },
  selectedUnitTypeText: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    marginRight: 0,
    alignSelf: 'flex-start',
    paddingLeft: moderateScale(-40),
    color: 'rgba(0, 0, 0, 0.25)',
  },
  editButton: {
    backgroundColor: "#0000ee",
    borderRadius: moderateScale(2),
    height: verticalScale(14),
    width: moderateScale(36),
    top: 0,
    left: moderateScale(-25),
    marginLeft: moderateScale(50),
  },
  editButtonNeighbour: {
    backgroundColor: "#0000ee",
    borderRadius: moderateScale(2),
    height: verticalScale(14),
    width: moderateScale(36),
    top: 0,
    left: moderateScale(87),
    marginLeft: moderateScale(50),
  },
  editButtonText: {
    color: "white",
    fontSize: moderateScale(8),
    fontWeight: "400",
    fontFamily: "Inter-SemiBold",
    letterSpacing: moderateScale(0.32),
    lineHeight: moderateScale(11.5),
    textAlign: "center",
    top: 0,
    left: 0,
  },
  helpContainer1: {
    position: "absolute",
    zIndex: 1,
    top: verticalScale(60),
    left: moderateScale(16),
    width: moderateScale(334),
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    elevation: moderateScale(5),
    padding: moderateScale(10),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(-160),
  },
  inputWrapperCity: {
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    marginLeft: moderateScale(-110),
  },
  inputWrapperHouse: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(-130),
  },
  inputWrapperUnit: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(-135),
  },
  inputWrapperStreet: {
    flexDirection: "row",
    alignItems: "flex-start",
    left: moderateScale(40),
  },
  helpContainer2: {
    position: "absolute",
    zIndex: 1,
    top: verticalScale(-90),
    left: 0,
    width: moderateScale(334),
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    elevation: moderateScale(5),
    padding: moderateScale(10),
  },
  helpContainer3: {
    position: "absolute",
    zIndex: 1,
    top: verticalScale(-70),
    left: 0,
    width: moderateScale(334),
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    elevation: moderateScale(5),
    padding: moderateScale(10),
  },
  helpText: {
    color: "#0b1719",
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(12),
    fontWeight: "400",
    left: 0,
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    position: "fixed",
    top: 0,
    width: moderateScale(312),
  },









  dropdownContainer: {
    position: "absolute",
    top: verticalScale(10),
    right: 0,
    height: verticalScale(50),
    width: moderateScale(50),
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(20),
  },
  dropdownArrow: {
    height: verticalScale(15),
    width: moderateScale(15),
    textAlignVertical: 'center',
    alignSelf: "flex-end",
    paddingBottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: verticalScale(450),
    marginLeft: moderateScale(200),
  },
  modalItem: {
    backgroundColor: "white",
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  RASPtext: {
    color: '#00E',
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: moderateScale(0.48),
    marginLeft: moderateScale(20),
    alignSelf: 'flex-start',
  },
  inputNumberContainer: {
    backgroundColor: 'red',
    alignSelf: 'center',
    width: moderateScale(150),
  },
  line: {
    width: 1,
    height: verticalScale(14),
    left: moderateScale(-30),
    alignSelf: 'center',
    marginLeft: moderateScale(20),
    bottom: verticalScale(-10),
    textAlign: 'center',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    backgroundColor: '#666',
    letterSpacing: moderateScale(0.4),
  },
  inpNum: {
    width: moderateScale(150),
    marginLeft: moderateScale(10),
  },
  HeadingtextView: {
    width: moderateScale(140),
    height: verticalScale(14),
  },
  helpImageContainer: {
    marginLeft: moderateScale(345),
    alignSelf: 'flex-end',
    top: verticalScale(25),
    position: 'absolute',
  },
  helpImageContainer1: {
    left: moderateScale(257),
    top: verticalScale(45),
    position: 'absolute',
    alignSelf: "flex-end",
  },
  labelText: {
    top: verticalScale(-18),
    left: moderateScale(55),
    color: '#00E',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: moderateScale(0.4),
    zIndex: 1,
  },
  labelText1: {
    top: verticalScale(-18),
    left: moderateScale(55),
    color: 'rgba(0, 0, 0, 0.20)',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: moderateScale(0.4),
    zIndex: 1,
  },
  labelTextCity: {
    top: verticalScale(-18),
    left: moderateScale(165),
    color: 'rgba(0, 0, 0, 0.20)',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: moderateScale(0.4),
    zIndex: 1,
  },
  labelTextProvience: {
    top: verticalScale(-18),
    left: moderateScale(195),
    color: 'rgba(0, 0, 0, 0.20)',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: moderateScale(0.4),
    zIndex: 1,
  },
  labelTextCountry: {
    top: verticalScale(-18),
    left: moderateScale(105),
    color: 'rgba(0, 0, 0, 0.20)',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: moderateScale(0.4),
    zIndex: 1,
  },
  labelTextUnit: {
    top: verticalScale(-18),
    left: moderateScale(45),
    color: '#00E',
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    letterSpacing: moderateScale(0.4),
    zIndex: 1,
  },
  dottedLine: {
    width: moderateScale(272),
    height: 0,
    flexShrink: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(214, 214, 214, 0.93)",
    marginVertical: verticalScale(10),
    alignSelf: 'flex-end',
    left: moderateScale(-178),
    borderStyle: 'dotted',
  },
  dottedLineCity: {
    width: moderateScale(272),
    height: 0,
    flexShrink: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(214, 214, 214, 0.93)",
    marginVertical: verticalScale(10),
    alignSelf: 'flex-end',
    left: moderateScale(40),
    top: verticalScale(33),
    borderStyle: 'dotted',
    position: 'absolute',
  },
  dottedLine1: {
    width: moderateScale(272),
    height: 0,
    flexShrink: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(214, 214, 214, 0.93)",
    marginVertical: verticalScale(10),
    alignSelf: 'flex-end',
    borderStyle: 'dotted',
    top: verticalScale(33),
    left: moderateScale(40),
    position: 'absolute',
  },






  separator: {
    width: 1,
    marginTop: moderateScale(10),
    height: moderateScale(10),
    backgroundColor: "#666",
    marginHorizontal: moderateScale(5), // Adjust as needed
    left: -moderateScale(10),
  },
  separatorUnit: {
    marginTop: moderateScale(10),
    width: 1,
    height: moderateScale(10),
    backgroundColor: "#666",
    marginHorizontal: moderateScale(5), // Adjust as needed
    right: moderateScale(35),
  },
  input2Container: {
    display: "flex",
    width: moderateScale(133),
    height: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  input2: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(2),
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    height: moderateScale(40),
    width: moderateScale(130), // Adjust as needed
    marginVertical: moderateScale(10),
    padding: moderateScale(5),
    fontFamily: 'Montserrat-Regular',
    fontSize: moderateScale(12),
  },
  inputContainerStreet: {
    marginBottom: moderateScale(10),
    flexDirection: 'column', // Adjust to column layout
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    borderWidth: moderateScale(0.5),
    borderColor: '#ccc',
    elevation: Platform.OS === 'android' ? moderateScale(5) : 0,
    width: moderateScale(330),
  },
  labelTextStreet: {
    fontFamily: 'Lato',
    fontSize: moderateScale(12),
    color: '#333', // Adjust the color as needed
    marginBottom: moderateScale(5), // Add margin at the bottom to separate from the input
  },
  inputWrapperStreet: {
    flexDirection: 'row', // Align icon and input horizontally
    alignItems: 'center', // Center vertically
    paddingLeft: moderateScale(10), // Add padding to the left of the input wrapper
    paddingRight: moderateScale(10), // Add padding to the right of the input wrapper
  },
  iconStreet: {
    height: moderateScale(20), // Adjust the height of the icon
    width: moderateScale(20), // Adjust the width of the icon
    alignSelf: 'center',
    left: -moderateScale(20),
  },
  inputStreet: {
    flex: 1, // Take the remaining space in the input wrapper
    height: moderateScale(40),
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(2),
    shadowColor: '#0000001a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    fontSize: moderateScale(12),
    fontFamily: 'Montserrat-Regular',
    padding: moderateScale(3),
    left: -moderateScale(8),
  },
  editButtonStreet: {
    marginTop: moderateScale(5), // Add margin at the top of the edit button
  },
  editButtonTextStreet: {
    color: '#007BFF', // Adjust the color of the edit button text
  },
  dottedLineStreet: {
    width: moderateScale(272),
    height: 0,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "rgba(214, 214, 214, 0.93)",
    marginVertical: moderateScale(10), // Adjust as needed
    position: 'absolute',
    alignSelf: 'flex-end',
    borderStyle: 'dotted',
    top: moderateScale(33),
    left: moderateScale(40),
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    left: -moderateScale(110), // You can adjust the marginLeft as needed
  },
  provinceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(-33),
    left: -moderateScale(110), // You can adjust the marginLeft as needed
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(-33),
    left: -moderateScale(20), // You can adjust the marginLeft as needed
  },
  CheckBoxContainer: {
    height: moderateScale(60), // Adjust the height of the icon
    width: moderateScale(330),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(10),
    top: 0,
  },
  checkbox: {
    width: moderateScale(19),
    height: moderateScale(19),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: "#000",
    marginRight: moderateScale(5),
    alignSelf: 'flex-start',
    right: moderateScale(10),
    top: moderateScale(8),
  },
  checked: {
    backgroundColor: "#00E",
  },
  title: {
    color: "rgba(0, 0, 0, 0.50)",
    fontFamily: "Inter",
    fontSize: moderateScale(10),
    lineHeight: moderateScale(11.65),
    letterSpacing: moderateScale(0.4),
    alignSelf: "center",
    left: moderateScale(20),
    top: -moderateScale(15),
  },
  changebutton: {
    width: moderateScale(67),
    height: moderateScale(16),
  },
 
});

export default CreateJangoAddress;
