// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import Menu from '../components/Menu'; // Import the MainLandingPage component

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         {/* <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        
//         {/* Add the MainLandingPage screen to the drawer navigator */}
//         <Drawer.Screen name="Menu" component={Menu} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }



import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  Share,Modal,FlatList,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  searchQuery,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  // Other imports
  PermissionsAndroid,
  Platform,
} from "react-native";

const MainLandingPageGetDirection = ({ navigation }) => {


  const [isModalVisible, setModalVisible] = useState(false);
  const [raspNumber, setRaspNumber] = useState("");
  const [unitTypeModalVisible, setUnitTypeModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddRoom = () => {
    toggleModal();
  };
  const toggleUnitTypeModal = () => {
    setUnitTypeModalVisible(!unitTypeModalVisible);
  };
  const [selectedTab, setSelectedTab] = useState("Get Directions");

  const handleTabPress = (screenName, tabName) => {
    navigation.navigate(screenName);
    setSelectedTab(tabName); // Update the selected tab when a tab is pressed
  };
  const [isPressed, setIsPressed] = useState(false);
  const [buttonStates, setButtonStates] = useState({
    globalMode: true,
    jangoMode: false,
    aliasMode: false,
  });
  // var mode = "globalMode";

  // const handleButtonPress = (buttonName) => {
  //   mode = buttonName;
  //   const newButtonStates = { ...buttonStates };
  //   for (const key in newButtonStates) {
  //     newButtonStates[key] = key === buttonName;
  //   }
  //   setButtonStates(newButtonStates);
  // };
  const [mode, setMode] = useState("globalMode");

const handleButtonPress = (buttonName) => {
  setMode(buttonName);
  const newButtonStates = { ...buttonStates };
  for (const key in newButtonStates) {
    newButtonStates[key] = key === buttonName;
  }
  setButtonStates(newButtonStates);
};

  const [isGlobalModeSelected, setGlobalModeSelected] = useState(false);
  const [isJangoModeSelected, setJangoModeSelected] = useState(false);
  const [isAliasModeSelected, setAliasModeSelected] = useState(false);

  const handleGlobalModePress = () => {
    setGlobalModeSelected(true);
    setJangoModeSelected(false);
    setAliasModeSelected(false);
  };

  const handleJangoModePress = () => {
    setGlobalModeSelected(false);
    setJangoModeSelected(true);
    setAliasModeSelected(false);
  };

  const handleAliasModePress = () => {
    setGlobalModeSelected(false);
    setJangoModeSelected(false);
    setAliasModeSelected(true);
  };
  const [tripText, setTripText] = useState("");
  const handleShowTripPress = () => {
    // If the trip text is currently visible, hide it; otherwise, show it
    setTripText((prevTripText) =>
      prevTripText
        ? "" // Set to an empty string to hide the text
        : "To get directions from your current location to a destination Google address. Enter your destination Google address in the box above and on the blue button that says ‘Google’"
    );
  };
  const openDrawer = () => {
    navigation.navigate('DrawerNavigator');
  };
  
  const handleJangoPress = () => {
    console.log("Button pressed");
    // Add your desired functionality here
  };


  // Function to handle the search based on the mode
  


  const [searchQuery, setSearchQuery] = useState("");

  const searchModeMethod = async (url, params) => {
    try {
      const response = await axios.get(url, { params });
      console.log('Request URL:', url);
      console.log('Request Params:', params);
      console.log('Response Data:', response.data);
      
      if (response.status === 200) {
        // Handle successful response (status code 200)
        return response.data;
      } else {
        // Handle other status codes
        console.error('Unexpected status code:', response.status);
        console.error('Response Data:', response.data);
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in searchModeMethod:", error);
      throw error;
    }
  };
  
  //
  // const handleSearch = async () => {
  //   try {
  //     console.log("Current mode:", mode);
  
  //     if (mode === "globalMode") {
  //       const responseData = await searchModeMethod(
  //         'https://jango-api-dev.jangoaddress.com/searchGlobalAddress.php',
  //         { id: userId, address: searchQuery }
  //       );
  //       console.log('Response Data:', responseData);
  //     } else if (mode === "jangoMode") {
  //       const responseData = await searchModeMethod(
  //         'https://jango-api-dev.jangoaddress.com/searchJanGoAddresses.php',
  //         { address: searchQuery, user_id: userId }
  //       );
  //       console.log('Response Data:', responseData);
  //     } else if (mode === "aliasMode") {
  //       const responseData = await searchModeMethod(
  //         'https://jango-api-dev.jangoaddress.com/searchAliasAddress.php',
  //         { id: userId, address: searchQuery }
  //       );
  //       console.log('Response Data:', responseData);
  //     } else {
  //       console.log("Unsupported mode selected");
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error in handleSearch:", error);
  //   }
  // }
  
  //
  const handleSearch = async () => {
    try {
      console.log("Current mode:", mode);
  
      if (mode === "globalMode") {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchGlobalAddress.php',
          { id: 'e5b8868dd8a9877b', address: searchQuery }
        );
        console.log('Response Data:', responseData);
      } else if (mode === "jangoMode") {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchJanGoAddresses.php',
          { address: searchQuery, user_id: 'e5b8868dd8a9877b' }
        );
        console.log('Response Data:', responseData);
      } else if (mode === "aliasMode") {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchAliasAddress.php',
          { id: 'e5b8868dd8a9877b', address: searchQuery }
        );
        console.log('Response Data:', responseData);
      } else {
        console.log("Unsupported mode selected");
        return;
      }
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  };
  
  
  // Call the handleSearch function
  (async () => {
    await handleSearch();
  })();
  
  



  const ModeMethod = async (api, params, navigation) => {
    try {
      const response = await axios.get(api, { params });
  
      console.log("API Response:", response);
  
      if (response.status === 200) {
        console.log("Success! Data:", response.data);
  
        if (api === "https://jango-api-dev.jangoaddress.com/checkGlobalAddress.php") {
          handleGlobalAddressResponse(response, navigation);
        } else if (api === "https://jango-api-dev.jangoaddress.com/checkJanGoAddress.php") {
          handleJangoAddressResponse(response);
        } else if (api === "https://jango-api-dev.jangoaddress.com/checkAliasAddress.php") {
          handleAliasAddressResponse(response, navigation);
        } else {
          console.log("Unexpected API:", api);
        }
      } else {
        console.log("API Error. Status Code:", response.status);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  
  const handleGlobalAddressResponse = (response, navigation) => {
    if (response.data.formatted_address) {
      Alert.alert(
        "The Address of your Current Location is",
        response.data.formatted_address,
        [
          {
            text: "Share Address",
            onPress: () => {
              Share.share({
                message: response.data.formatted_address,
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Address Not Found",
        "Sorry, we did not find an address for your location. But No Worries!! We’ve got your back!! If you want an address for this location, click on the button below to create one.",
        [
          {
            text: "Create Address",
            onPress: () => {
              navigation.navigate("CreateJangoAddress");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  




  // const handleJangoAddressResponse = (response) => {
  //   if (response.data.formatted_address) {
  //     Alert.alert(
  //       "Jango Address Found",
  //       "The Address of your Current Location is Jango Address:\n${response.data.formatted_address}\n\nWhat would you like to do next?",
  //       [
  //         {
  //           text: "Share Address",
  //           onPress: () => {
  //             Share.share({
  //               message: response.data.formatted_address,
  //             });
  //           },
  //         },
  //         {
  //           text: "Add Room/Apt/Suite",
  //           onPress: () => {
  //             // Add your logic for handling the "Add Room/Apt/Suite" action
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   } else {
  //     Alert.alert(
  //       "Address Not Found",
  //       "Sorry, we did not find an address for your location. But No Worries!! We’ve got your back!! If you want an address for this location, click on the button below to create one.",
  //       [
  //         {
  //           text: "Create Address",
  //           onPress: () => {
  //             // Handle the "Create Address" action
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // };
  

  const handleJangoAddressResponse = (response) => {
    const firstAddress = response.data.list[0];
  
    if (firstAddress && firstAddress.formatted_address) {
      Alert.alert(
        "Jango Address Found",
        `The Address of your Current Location is Jango Address:\n${firstAddress.formatted_address}\n\nWhat would you like to do next?`,
        [
          {
            text: "Share Address",
            onPress: () => {
              Share.share({
                message: firstAddress.formatted_address,
              });
            },
          },
          {
            text: "Add Room/Apt/Suite",
            onPress: handleAddRoom,
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Address Not Found",
        "Sorry, we did not find an address for your location. But No Worries!! We’ve got your back!! If you want an address for this location, click on the button below to create one.",
        [
          {
            text: "Create Address",
            onPress: () => {
             navigation.navigate("CreateJangoAddress")
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleAliasAddressResponse = (response, navigation) => {
    if (response.data.alias) {
      Alert.alert(
        "Alias Address Found",
        "You already have an alias for this location\nAlias Address: ${response.data.alias}\n\nClick the button below to edit this alias.",
        [
          {
            text: "Edit Alias",
            onPress: () => {
              // Add your logic for handling the "Edit Alias" action
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Alias Not Found",
        "Sorry, we did not find any Alias Address for your location. But No Worries!! We’ve got your back!! If you want an alias address for this location, click on the button below to create one.",
        [
          {
            text: "Create Alias Address",
            onPress: () => {
              // Handle the "Create Alias Address" action
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  
  // Usage example:
  // handleGlobalAddressResponse(response, navigation);
  // handleJangoAddressResponse(response);
  // handleAliasAddressResponse(response, navigation);
  
  // const ModeMethod = async (api, params, navigation) => {
  //   try {
  //     const response = await axios.get(api, { params });
  
  //     console.log("API Response:", response);
  
  //     if (response.status === 200) {
  //       console.log("Success! Data:", response.data);
  
  //       if (response.data.formatted_address) {
  //         // Handle the case where the address is directly available
  //         console.log("Address found:", response.data.formatted_address);
  //         Alert.alert(
  //           "Found Address",
  //           response.data.formatted_address,
  //           [
  //             {
  //               text: "Share Address",
  //               onPress: () => {
  //                 Share.share({
  //                   message: response.data.formatted_address,
  //                 });
  //               },
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       } else if (response.data.list && response.data.list.length > 0) {
  //         // Handle the case where the address is present in the list array
  //         const firstAddress = response.data.list[0];
  //         console.log("Address found:", firstAddress.formatted_address);
  //         Alert.alert(
  //           "Found Address",
  //           firstAddress.formatted_address,
  //           [
  //             {
  //               text: "Share Address",
  //               onPress: () => {
  //                 Share.share({
  //                   message: firstAddress.formatted_address,
  //                 });
  //               },
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       } else if (response.data.message === "No official address" || response.data.message === "No Alias Address") {
  //         console.log("No official or alias address found");
  //         Alert.alert(
  //           "Address Not Found",
  //           "Sorry, we did not find an official or alias address for your location. But No Worries!! We’ve got your back!! If you want an address for this location, click on the button below to create one.",
  //           [
  //             {
  //               text: "Create Address",
  //               onPress: () => {
  //                 navigation.navigate("CreateJangoAddress");
  //               },
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       } else {
  //         console.log("Unexpected response data:", response.data);
  //       }
  //     } else {
  //       console.log("API Error. Status Code:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //   }
  // };
  
  const handleAddressingPress = async () => {
    try {
      console.log("Current mode:", mode);

      if (mode === "globalMode") {
        await ModeMethod(
          "https://jango-api-dev.jangoaddress.com/checkGlobalAddress.php",
          { id: userId, latitude, longitude },
          navigation
        );
      } else if (mode === "jangoMode") {
        await ModeMethod(
          "https://jango-api-dev.jangoaddress.com/checkJanGoAddress.php",
          { id: userId, latitude, longitude },
          navigation
        );
      } else if (mode === "aliasMode") {
        await ModeMethod(
          "https://jango-api-dev.jangoaddress.com/checkAliasAddress.php",
          { id: userId, latitude, longitude },
          navigation
        );
      } else {
        console.log("Unsupported mode selected");
        return;
      }
    } catch (error) {
      console.error("Error in handleAddressingPress:", error);
    }
  };
  const [userId, setUserId] = useState(null);
  const [latitude, setLatitude] = useState(null); // Declare latitude state variable
  const [longitude, setLongitude] = useState(null);
 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);

        console.log("Main Latitude:", location.coords.latitude);
        console.log("Main Longitude:", location.coords.longitude);
      } catch (error) {
        console.error("Error getting location:", error.message);
      }
    })();
  }, []);
  useEffect(() => {
    const getStoredUserData = async () => {
      try {
        const Id = await AsyncStorage.getItem("userId");
        const full_names = await AsyncStorage.getItem("full_names");
        const email_address = await AsyncStorage.getItem("email_address");

        if (Id !== null) {
          // Use the user data here
          console.log("MainLandingPage userId:", Id);
          setUserId(Id);
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
  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.menuContainer}>
        <TouchableOpacity onPress={openDrawer}>
      <Image
        source={require("../assets/images/menuIcon.png")}
        style={styles.menuIcon}
      />
    </TouchableOpacity>

          <TouchableOpacity
            style={
              selectedTab === "Get Directions" ? styles.selectedTab : styles.tab
            }
            onPress={() => handleTabPress("GetDirections", "Get Directions")}
          >
            <Text
              style={
                selectedTab === "Get Directions"
                  ? styles.selectedTabText
                  : styles.tabText
              }
            >
              Get Directions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              selectedTab === "Route & Drive Time"
                ? styles.selectedTab
                : styles.tab
            }
            onPress={() =>
              handleTabPress("RouteDriveTime", "Route & Drive Time")
            }
          >
            <Text
              style={
                selectedTab === "Route & Drive Time"
                  ? styles.selectedTabText
                  : styles.tabText
              }
            >
              Route & Drive Time
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttoncontainer}>
          {/* 1rd button */}
          <TouchableOpacity
            style={[
              styles.editButton,
              buttonStates.globalMode ? styles.editButtonPressed : null,
            ]}
            onPress={() => handleButtonPress("globalMode")}
          >
            <Text
              style={[
                styles.editButtonText,
                buttonStates.globalMode ? styles.editButtonTextPressed : null,
              ]}
            >
              Global Mode
            </Text>
          </TouchableOpacity>

          <View style={styles.space}>
            <TouchableOpacity
              style={[
                styles.editButton,
                buttonStates.jangoMode ? styles.editButtonPressed : null,
              ]}
              onPress={() => handleButtonPress("jangoMode")}
            >
              <Text
                style={[
                  styles.editButtonText,
                  buttonStates.jangoMode ? styles.editButtonTextPressed : null,
                ]}
              >
                Jango Mode
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space1}>
            <TouchableOpacity
              style={[
                styles.editButton,
                buttonStates.aliasMode ? styles.editButtonPressed : null,
              ]}
              onPress={() => handleButtonPress("aliasMode")}
            >
              <Text
                style={[
                  styles.editButtonText,
                  buttonStates.aliasMode ? styles.editButtonTextPressed : null,
                ]}
              >
                Alias Mode
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Google Address"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          {/* <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
        </TouchableOpacity> */}

          {/* search barbutton */}

          <View style={styles.spaceSearchbar}>
            <TouchableOpacity
              style={[
                styles.editButton,
                buttonStates.globalMode ? styles.editButtonPressed : null,
                {
                  backgroundColor: buttonStates.globalMode
                    ? "#0000ee"
                    : "#0000ee",
                }, // Set the same background color for all states
              ]}
              onPress={() => handleButtonPress("globalMode")}
            >
              <Text
                style={[
                  styles.editButtonText,
                  buttonStates.globalMode ? styles.editButtonTextPressed : null,
                  { color: buttonStates.globalMode ? "white" : "white" }, // Set the text color to white for all states
                ]}
              >
                {buttonStates.globalMode
                  ? "Global "
                  : buttonStates.jangoMode
                  ? "Jango "
                  : "Alias "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.showTripContainer}>
          <TouchableOpacity onPress={handleShowTripPress}>
            <Text style={styles.showTriptext}>Show Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tripContainer}>
          <Text style={styles.tripText}>{tripText}</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.Jangobutton} onPress={handleJangoPress}>
          <Text style={styles.JangobuttonText}>Jango</Text>
          <Image
            source={require("../assets/images/locationnav.png")} // Replace with the actual path to your image
            style={styles.Jangolocationimage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Adressbutton}
          onPress={handleAddressingPress}
        >
          <Text style={styles.AddressingbuttonText}>Addressing</Text>
          <Image
            source={require("../assets/images/locationaddress.png")} // Replace with the actual path to your image
            style={styles.Addresslocationimage}
          />
        </TouchableOpacity>


{/* modal
*/}
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >



        <View style={styles.Modal}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field3.png")}
            style={styles.icon}
          />
      
          <TextInput
            style={styles.input}
            placeholder="RASP Number"
            value={raspNumber}
            onChangeText={(text) => {
              setRaspNumber(text);
              // Hide the help dialog for this field
              
            }}
          />
          <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={() => setUnitTypeModalVisible(true)}>
              <Image
                source={require("../assets/images/jangoAdress/down.png")}
                style={styles.dropdownArrow}
              />
            </TouchableOpacity>
          </View>

       
        </View>
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
      </Modal>




      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headercontainer: {
    backgroundColor: "#0000eebf",
    height: 170,
    position: "absolute",
    top: 0,
    width: 360,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  menuIcon: {
    height: 21,
    width: 34,
  },
  tab: {
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  tabText: {
    color: "grey",
  },
  selectedTabText: {
    color: "white",
  },

  buttoncontainer: {
    top: 20,
    left: 25,
  },

  editButton: {
    backgroundColor: "#0000ee", // You can replace this color with your desired color
    borderRadius: 4,
    height: 30,
    width: 103,
    // position: 'absolute',
    top: 0,
    left: 0,
    //  marginLeft: -90,
  },
  editButtonPressed: {
    backgroundColor: "white", // Background color when pressed
  },
  editButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "400",
    fontFamily: "Inter-SemiBold",
    letterSpacing: 0.32,
    lineHeight: 14.4,
    textAlign: "center",
    padding: 4.5,
  },
  editButtonTextPressed: {
    color: "#0000ee", // Text color when pressed
  },
  space: {
    top: -30, // Adjust this height to control the spacing
    marginLeft: 110, //
  },
  space1: {
    top: -60, // Adjust this height to control the spacing
    marginLeft: 220,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    width: 332,
    marginLeft: 15,
    top: -25,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    height: 30,
    marginLeft: 10, // Adjust this value for spacing
    padding: 5,
  },
  searchButton: {
    backgroundColor: "#0000ee",
    // borderRadius: '0 4px 4px 0',
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  spaceSearchbar: {
    gap: 65,
  },
  showTripContainer: {
    top: -20,
  },
  showTriptext: {
    top: 0,
    marginLeft: 25,
    color: "#ffffff",
    fontFamily: "Inter-Medium",
    fontSize: 10,
    fontWeight: "500", // Use a string value for fontWeight
    left: 0,
    letterSpacing: 0.4,
    lineHeight: 14.4,
    position: "absolute", // Use 'absolute' for fixed positioning in React Native
    top: 0,
    whiteSpace: "nowrap",
  },
  tripContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    marginTop: 0,
  },
  tripText: {
    color: "#656565",
    fontFamily: "GenBkBasR",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18.72,
    letterSpacing: 0.52,
  },
  footerContainer: {
    backgroundColor: "#ffffff",
    height: 45,
    width: 360,
    position: "absolute",
    top: 0,
    left: 0,
    top: 650,
  },
  Jangobutton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 45,
    alignItems: "center",
  },

  JangobuttonText: {
    color: "#ffffff",
    fontFamily: "Inter-Medium", // Make sure to load the 'Inter-Medium' font
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.56,
    lineHeight: 20.2,
    textAlign: "center",
    top: 10,
  },
  Jangolocationimage: {
    width: 13,
    height: 17,
    top: -30,
  },
  Adressbutton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 45,
    alignItems: "center",
    marginLeft: 180,
    top: -45,
  },
  AddressingbuttonText: {
    color: "#0000eebf",
    fontFamily: "Inter-Medium", // Make sure to load the 'Inter-Medium' font
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.56,
    lineHeight: 20.2,
    textAlign: "center",
    top: 10,
  },
  Addresslocationimage: {
    width: 23,
    height: 37,
    top: -30,
  },
});

export default MainLandingPageGetDirection;