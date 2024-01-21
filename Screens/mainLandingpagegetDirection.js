

import React, { useEffect, useState ,useRef} from "react";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MapView, { Marker, PROVIDER_GOOGLE , Polyline} from 'react-native-maps';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import AliasAddressModal from "../components/AliasAddressModal";
import JangoAddressModal from "../components/JangoAddressModal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';





import { StatusBar } from 'react-native'
import {
  View,
  // StatusBar,
  Alert,FlatList,ScrollView,
  Share,Linking,
  Text,
  Button,Modal,
  StyleSheet,KeyboardAvoidingView, 
  Image,
  TouchableOpacity,
  TextInput,
  searchQuery,
} from "react-native";
// StatusBar.setBackgroundColor('#00E');
import axios from "axios";
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddressResponseModal from "../components/AddressResponseModal";
import {
  // Other imports
  PermissionsAndroid,
  Platform,
} from "react-native";

const MainLandingPageGetDirection = ({ navigation }) => {
  const [isTripTextVisible, setIsTripTextVisible] = useState(false);
  const [globalAddressModalVisible, setGlobalAddressModalVisible] = useState(false);
  const [jangoAddressModalVisible, setJangoAddressModalVisible] = useState(false);
  const [aliasAddressModalVisible, setAliasAddressModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [userDestination, setUserDestination] = useState('');
  const [searchBarLocation, setSearchBarLocation] = useState(null); // Declare searchBarLocation state
  const [searchBarDestination, setSearchBarDestination] = useState(null); // Declare searchBarDestination state
 
  const [globalAddressModalContent, setGlobalAddressModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
    onPress: () => {},
  });


  const [jangoAddressModalContent, setJangoAddressModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
    buttonTextRoom: "",
    //new added
    addressFound:false,
    onPress: () => { },
    onPressRoom: () => {},
  });

  const [aliasAddressModalContent, setAliasAddressModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
    onPress: () => {},
  });


  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
    onPress: () => {},
  });




  const [internalModalVisible, setInternalModalVisible] = useState(false);
  const [internalModalContent, setInternalModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
    
    onPress: null,
    addressFound:false,
  });




  const mapRef = useRef(null);

  const initialRegion = {
    latitude: latitude || 0,
    longitude: longitude || 0,
    latitudeDelta: 37.0902, // Adjust this value for the desired zoom level
    longitudeDelta: 95.7129, // Adjust this value for the desired zoom level
  };
  async function requestLocationPermission() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }
   }
  const openMapWithDirections = async () => {
    try {
      console.log('Fetching current location...');
      const location = await Location.getCurrentPositionAsync({ timeout: 10000 });
      const currentLatitude = location.coords.latitude;
      const currentLongitude = location.coords.longitude;
  
      console.log('Current Location:', currentLatitude, currentLongitude);
      console.log('Destination Location:', destinationLatitude, destinationLongitude);
  
      // Check if the search field is empty
      if (!searchQuery) {
        setError('Search bar is empty. Please enter a location.');
        return;
      }
  
      // Clear any previous errors
      setError(null);
  
      // Check if the device has a maps app installed
      const scheme = Platform.select({
        ios: 'maps://',
        android: 'geo:',
      });
  
      Linking.canOpenURL(scheme).then((supported) => {
        if (!supported) {
          setError(`Maps app is not installed for scheme: ${scheme}`);
          return;
        }
  
          //const mapsUrl = `${scheme}origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}`;
        // const mapsUrl = `${scheme}origin=${currentLatitude},${currentLongitude}&destination=31.4805,74.3239`;
      
        


      // const mapsUrl = `${scheme}saddr=${currentLatitude},${currentLongitude}&daddr=${destinationLatitude},${destinationLongitude}&dirflg=d`;


//this is directly opening google maps

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}`;
      // const mapsUrl = "https://www.google.com/maps/dir/?api=1&origin=31.4728786,74.3592683&destination=31.6211,74.2824";
     
        console.log(mapsUrl);
     
        Linking.openURL(mapsUrl);
      });
  
      console.log('API Call Coordinates:', {
        originLatitude: currentLatitude,
        originLongitude: currentLongitude,
        destinationLatitude: destinationLatitude,
        destinationLongitude: destinationLongitude,
      });
  
      // Update the API call with the current and destination coordinates
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://jango-api-dev.jangoaddress.com/getJanGoRoute.php?id=bcf1fdd51915f01d&originLatitude=${currentLatitude}&originLongitude=${currentLongitude}&destinationLatitude=${destinationLatitude}&destinationLongitude=${destinationLongitude}`,
       

        headers: {},
      };
  
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // Add any additional logic you want to perform with the API response
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      console.error('Error getting location:', error.message);
      setError('Error getting location. Please try again.');
    }
  };
 

  const handleFindRoute = async () => {
    try {
      // Check if both the current and destination locations are available
      if (!searchBarLocation || !searchBarDestination) {
        setError('Please select both current and destination locations.');
        return;
      }

      // Clear any previous errors
      setError(null);

      // Retrieve the latitude and longitude of the selected destination
      const { latitude: destinationLatitude, longitude: destinationLongitude } = searchBarDestination;

      // Check if the device has a maps app installed
      const scheme = Platform.select({
        ios: 'maps://',
        android: 'geo:',
      });
      
      const origin = `${searchBarLocation.latitude},${searchBarLocation.longitude}`;
      const destination = `${destinationLatitude},${destinationLongitude}`;
      
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&origin=${origin}`;
      console.log('Maps URL:', mapsUrl);
      
      Linking.canOpenURL(scheme).then((supported) => {
        if (!supported) {
          setError(`Maps app is not installed for scheme: ${scheme}`);
          return;
        }
      
        Linking.openURL(mapsUrl);
      });
      

      console.log('API Call Coordinates Two Search Bars:', {
        originLatitude: searchBarLocation.latitude,
        originLongitude: searchBarLocation.longitude,
        destinationLatitude: destinationLatitude,
        destinationLongitude: destinationLongitude,
      });

      // Update the API call with the current and destination coordinates
      console.log(`https://jango-api-dev.jangoaddress.com/getJanGoRoute.php?id=bcf1fdd51915f01d&originLatitude=${searchBarLocation.latitude}&originLongitude=${searchBarLocation.longitude}&destinationLatitude=${destinationLatitude}&destinationLongitude=${destinationLongitude}`)
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://jango-api-dev.jangoaddress.com/getJanGoRoute.php?id=bcf1fdd51915f01d&originLatitude=${searchBarLocation.latitude}&originLongitude=${searchBarLocation.longitude}&destinationLatitude=${destinationLatitude}&destinationLongitude=${destinationLongitude}`,
       
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          // Update the state with route details
          setRouteDetails(response.data);

          // Add any additional logic you want to perform with the API response
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error. Please try again.');
    }
  };


  const [isModalVisible, setModalVisible] = useState(false);
  const [raspNumber, setRaspNumber] = useState("");
  const [unitType, setUnitType] = useState("");
  const [unitTypeModalVisible, setUnitTypeModalVisible] = useState(false);
  const [isModalVisibleAlis, setModalVisibleAlis] = useState(false);
  const [isModalVisibleAlisEdit, setModalVisibleAlisEdit] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [destinationLatitude, setDestinationLatitude] = useState(null);
  const [destinationLongitude, setDestinationLongitude] = useState(null);
  const [locationMarker, setLocationMarker] = useState(null);
const [destinationMarker, setDestinationMarker] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
const handleClear = () => {
  setSearchQuery('');
};
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
 
  const toggleModalAlis = () => {
    setModalVisibleAlis(!isModalVisibleAlis);
  };



  const toggleModalAlisEdit = () => {
    setModalVisibleAlisEdit(!isModalVisibleAlisEdit);
  };
  const handleAddRoom = () => {
    toggleModal();
  };
  const  handleCloseModel = () => {
    
    setModalVisible(false);
  };
  const  handleCloseModelAlis = () => {
    
    setModalVisibleAlis(false);
  };

  const  handleCloseModelAlisEdit = () => {
    
    setModalVisibleAlisEdit(false);
  };
  const [alisAddress, setAlisAddress] = useState("");
  const handleAddAlis = () => {
    toggleModalAlis();
  };
  const handleEditAlis = () => {
    toggleModalAlisEdit();
    
  };
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);

  const togglehelpModal = () => {
    setHelpModalVisible(!isHelpModalVisible);
    if (!isHelpModalVisible) {
      setTimeout(() => {
        setHelpModalVisible(false);
      }, 3000);
    }
  };

  const addRaspNumber = async () => {
    try {
      const data = {
        ras_number: parseInt(raspNumber), // Ensure that ras_number is an integer
        ras_type: unitType,
        latitude: latitude,
        longitude: longitude,
        house_plot_nbr: 0, // Check if this value is expected by the server
        house_plot_extension: 'string', // Check if this value is expected by the server
      };
      console.log('Request Data RaspNumber:', data);
      const config = {
        method: 'post',
        url: `https://jango-api-dev.jangoaddress.com/addRaspNumber.php?id=${userId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };
  
      const response = await axios.request(config);
      console.log('Response from the server:', response.data);
      // Handle the response from the server as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle errors, such as displaying an error message
    }
  };
  
  const createAliasAddress = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId"); // Fetch userId from AsyncStorage
  
      const data = JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        alias_name: alisAddress,
      });
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://jango-api-dev.jangoaddress.com/createAliasAddress.php?id=${userId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
  
      const response = await axios.request(config);
  
      if (response.status === 201) {
        console.log('Successful operation:', response.data);
        // Handle the successful response here
      } else {
        console.error(`Error: ${response.status}`, response.data);
        // Handle other responses (400, 401, 500, etc.) here
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const editAliasAddress = () => {
  
  };

  
  const toggleUnitTypeModal = () => {
    setUnitTypeModalVisible(!unitTypeModalVisible);
  };
  const [selectedTab, setSelectedTab] = useState("Get Directions");

  const handleTabPress = (screenName, tabName) => {

    navigation.navigate(screenName);
    setMarkers([]);
    setSelectedTab(tabName); // Update the selected tab when a tab is pressed
  };
  const [isPressed, setIsPressed] = useState(false);
  const [buttonStates, setButtonStates] = useState({
    globalMode: true,
    jangoMode: false,
    aliasMode: false,
  });

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
  const [isTripVisible, setIsTripVisible] = useState(false);
  const tripText =
    'To get directions from your current location to a destination Google address. Enter your destination Google address in the box above and on the blue button that says ‘Google’';

  const handleShowTripPress = () => {
    setIsTripVisible(!isTripVisible);
  };


  const openDrawer = () => {
    //  navigation.openDrawer();
    // navigation.toggleDrawer();
  //  navigation.navigate('DrawerNavigator');
    //  navigation.navigate('CustomSideMenu');
    navigation.dispatch(DrawerActions.openDrawer, { latitude, longitude })
  };

  const handleJangoPress = () => {
    console.log("Button pressed");
    // Add your desired functionality here
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [locationResults, setLocationResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [error, setError] = useState(null);
  // const [debounceTimeout, setDebounceTimeout] = useState(null);


  
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

  const handleSearch = async () => {
    try {
      if (mode === 'globalMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchGlobalAddress.php',
          { id: 'e5b8868dd8a9877b', address: searchQuery }
        );
        setSearchResults(responseData.list);
      } else if (mode === 'jangoMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchJanGoAddresses.php',
          { address: searchQuery, user_id: 'e5b8868dd8a9877b' }
        );
        setSearchResults(responseData.list);
      } else if (mode === 'aliasMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchAliasAddress.php',
          { id: 'e5b8868dd8a9877b', address: searchQuery }
        );
        setSearchResults(responseData.list);
      } else {
        console.log('Unsupported mode selected');
        return;
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
    }
  };
  const handleSearchLocation = async () => {
    try {
      if (mode === 'globalMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchGlobalAddress.php',
          { id: 'e5b8868dd8a9877b', address: userLocation }
        );
        setLocationResults(responseData.list);
      } else if (mode === 'jangoMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchJanGoAddresses.php',
          { address: userLocation, user_id: 'e5b8868dd8a9877b' }
        );
        setLocationResults(responseData.list);
      } else if (mode === 'aliasMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchAliasAddress.php',
          { id: 'e5b8868dd8a9877b', address: userLocation }
        );
        setLocationResults(responseData.list);
      } else {
        console.log('Unsupported mode selected');
        return;
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
    }
  };
  const handleSearchDestination  = async () => {
    try {
      if (mode === 'globalMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchGlobalAddress.php',
          { id: 'e5b8868dd8a9877b', address: userDestination }
        );
        setDestinationResults(responseData.list);
      } else if (mode === 'jangoMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchJanGoAddresses.php',
          { address: userDestination, user_id: 'e5b8868dd8a9877b' }
        );
        setDestinationResults(responseData.list);
      } else if (mode === 'aliasMode') {
        const responseData = await searchModeMethod(
          'https://jango-api-dev.jangoaddress.com/searchAliasAddress.php',
          { id: 'e5b8868dd8a9877b', address: userDestination }
        );
        setDestinationResults(responseData.list);
      } else {
        console.log('Unsupported mode selected');
        return;
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
    }
  };

  const handleAddressSelect = (selectedAddress) => {
    setSearchQuery(selectedAddress.formatted_address);
    // Optionally, you can clear the search results after selecting an address
    setSearchResults([]);
    moveToNewLocation(selectedAddress.latitude, selectedAddress.longitude);
  };
  const handleLocationSelect = (selectedAddress) => {
    setUserLocation(selectedAddress.formatted_address);
  
    // Log latitude and longitude
    console.log('Selected Location Latitude:', selectedAddress.latitude);
    console.log('Selected Location Longitude:', selectedAddress.longitude);
  
    // Store selected location in state
    setSearchBarLocation({
      latitude: selectedAddress.latitude,
      longitude: selectedAddress.longitude,
    });
  
    // Optionally, you can clear the search results after selecting an address
    setLocationResults([]);
    moveToNewLocation(selectedAddress.latitude, selectedAddress.longitude);
  };
  
  const handleDestinationSelect = (selectedAddress) => {
    setUserDestination(selectedAddress.formatted_address);
  
    // Log latitude and longitude
    console.log('Selected Destination Latitude:', selectedAddress.latitude);
    console.log('Selected Destination Longitude:', selectedAddress.longitude);
  
    // Store selected destination in state
    setSearchBarDestination({
      latitude: selectedAddress.latitude,
      longitude: selectedAddress.longitude,
    });
  
    // Optionally, you can clear the search results after selecting an address
    setDestinationResults([]);
    moveToNewLocation(selectedAddress.latitude, selectedAddress.longitude);
  };
  


// It is for alerts if address found or not found 
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


  const handleGlobalAddressResponse = (response) => {
    if (response.data.formatted_address) {
      // addressFound = true;
      setInternalModalContent({
        title: "The Address of your Current Location is",
        message: response.data.formatted_address,
        buttonText: "Share Address",
        onPress: async () => {
          try {
            await Share.share({
              message: response.data.formatted_address,
            });
          } catch (error) {
            console.error('Error sharing address:', error.message);
          }
          setInternalModalVisible(false);
        },
        addressFound :true,
      });
    } else {
      
      setInternalModalContent({
        title: "Address Not Found",
        message: "Sorry, we did not find an address for your location. But No Worries!! We’ve got your back!! If you want an address for this location, click on the button below to create one.",
        buttonText: "Create Address",
        onPress: () => {
          navigation.navigate("CreateJangoAddress");
          console.log('Create Address button pressed');
          setInternalModalVisible(false);

        },
        addressFound :false,
      });
    }
  
    setInternalModalVisible(true);
  };
  
  const handleJangoAddressResponse = (response) => {
    const firstAddress = response.data.list[0];

    if (firstAddress && firstAddress.formatted_address && firstAddress.formatted_address !== "null") {
      setJangoAddressModalContent({
        title: "Jango Address Found",
        message: `The Address of your Current Location is Jango Address:\n${firstAddress.formatted_address}\n\nWhat would you like to do next?`,
        buttonText: "Share Address",
        onPress: () => {
          Share.share({
            message: firstAddress.formatted_address,
          });
          setJangoAddressModalVisible(false);
        },
        buttonTextRoom: "Add Room/Apt/Suite",
        onPressRoom: () => {
          setJangoAddressModalVisible(false);
         toggleModal(true);
        },
        addressFound :true,
      });
      setJangoAddressModalVisible(true);
    } else {
      setJangoAddressModalContent({
        title: "Address Not Found",
        message: "Sorry, we did not find an address for your location. But No Worries!! We’ve got your back!! If you want an address for this location, click on the button below to create one.",
        buttonText: "Create Address",
        onPress: () => {
          navigation.navigate("CreateJangoAddress");
          setJangoAddressModalVisible(false);
        },
        addressFound :false,
      });
      setJangoAddressModalVisible(true);
    }
  };


    useEffect(() => {
    const fetchMyAliasAddresses = async () => {
      try {
        const userId = 'e5b8868dd8a9877b'; // Your user ID, replace with the actual value
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyAliasAddresses.php?id=${userId}`);
        if (response.status === 200) {
          // setMyAliasAddresses(response.data.list); // Assuming the addresses are in the response.data.list
          console.log('Main Langing page MyAliasAddresses API Response:', response.data); // Log the API response
        } else {
          console.error('Failed to fetch MyAliasAddresses. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching MyAliasAddresses:', error);
      }
    };

    fetchMyAliasAddresses();
    }, []);
  
 
  const handleAliasAddressResponse = (response, navigation) => {
    if (response.data.alias) {
      setAliasAddressModalContent({
        title: "You already have an alias for this location",
        message: `You already have an alias for this location\nAlias Address: ${response.data.alias}\n\nClick the button below to edit this alias.`,
        buttonText: "Edit Alias",
        onPress: handleEditAlis,
      });
      setAliasAddressModalVisible(true);
    } else {
      setAliasAddressModalContent({
        title: "Sorry we did not find any Alias Address for your location",
        message: "But No Worries!! We’ve got your back!! If you want an alias address for this location, click on the button below to create one.",
        buttonText: "Create Alias Address",
        onPress: () => {
          handleAddAlis(); // Call your logic for creating the alias
          setAliasAddressModalVisible(false); // Close the modal
        },
      });
      setAliasAddressModalVisible(true);
    }
  };
  
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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [defaultInitialRegion, setDefaultInitialRegion] = useState(null);



    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
       
        const location = await Location.getCurrentPositionAsync({ timeout: 10000 });
        await setLatitude(location.coords.latitude);
        console.log('Updated latitude:', latitude);
        await setLongitude(location.coords.longitude);
        console.log('Updated longitude:', longitude);
        
        await setDefaultInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        console.log("Main Latitude:", location.coords.latitude);
        console.log("Main Longitude:", location.coords.longitude);

        // Add the initial marker for the current location
        await addMarker(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error("Error getting location:", error.message);
      }
    };


  useEffect(() => {
    getLocation();
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

  const moveToNewLocation = (newLatitude, newLongitude) => {
    setLatitude(newLatitude);
    setLongitude(newLongitude);
    console.log("MainLandingPage 1:", newLatitude);
    console.log("MainLandingPage 2:", newLongitude);
  
    // Clear previous markers
    setMarkers([]);
  
    // Call the function to add markers for the new location and destination
    addMarker(newLatitude, newLongitude, 'location');
  
    // Check if searchBarDestination is not null before accessing its properties
    if (newLatitude && newLongitude) {
      addMarker(newLatitude, newLongitude, 'destination');
  
      // Call the function to zoom to the new coordinates
      zoomToMarker(newLatitude, newLongitude);
      setDestinationLatitude(newLatitude);
      setDestinationLongitude(newLongitude);
    } else {
      // Handle the case when searchBarDestination is null
      console.error("Error: searchBarDestination is null");
      // Optionally, you might set a default destination or take another action
    }
  };
  


  const addMarker = (latitude, longitude, type) => {
    setMarkers((prevMarkers) => [...prevMarkers, { latitude, longitude, type }]);
  };
  


  const setDestinationCoordinates = (newDestinationLatitude, newDestinationLongitude) => {
    setDestinationLatitude(newDestinationLatitude);
    setDestinationLongitude(newDestinationLongitude);
  };
  const zoomToMarker = (newLatitude, newLongitude) => {
    console.log("Zooming to Marker - Latitude:", newLatitude, "Longitude:", newLongitude);
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([{ latitude: newLatitude, longitude: newLongitude }], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };



  return (
   
    <View style={styles.container}>
           <View style={styles.headerStrip}><StatusBar barStyle="light-content" hidden={false} backgroundColor={'#00E'} translucent={true} />
          </View>
    <JangoAddressModal
        visible={jangoAddressModalVisible}
        onClose={() => setJangoAddressModalVisible(false)}
        title={jangoAddressModalContent.title}
        message={jangoAddressModalContent.message}
        buttonText={jangoAddressModalContent.buttonText}
        buttonTextRoom={jangoAddressModalContent.buttonTextRoom}
        onPress={jangoAddressModalContent.onPress}
        onPressRoom={jangoAddressModalContent.onPressRoom}
        addressFound={jangoAddressModalContent.addressFound}
      />

      <AliasAddressModal
        visible={aliasAddressModalVisible}
        onClose={() => setAliasAddressModalVisible(false)}
        title={aliasAddressModalContent.title}
        message={aliasAddressModalContent.message}
        buttonText={aliasAddressModalContent.buttonText}
        onPress={aliasAddressModalContent.onPress}
      />

      <AddressResponseModal
        visible={internalModalVisible}
        onClose={() => setInternalModalVisible(false)}
        title={internalModalContent.title}
        message={internalModalContent.message}
        buttonText={internalModalContent.buttonText}
        onPress={internalModalContent.onPress}
        addressFound={internalModalContent.addressFound}
        // response={apiResponse} 
      />

{selectedTab === 'Get Directions' && (

    //     <KeyboardAvoidingView
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // //  style={{ flex: 1 }}
    //     >
    //       <View style={styles.headerStrip}><StatusBar barStyle="light-content" hidden={false} backgroundColor={'#00E'} translucent={true} />
    //       </View>
      <View style={styles.headercontainer}>
        <View style={styles.menuContainer}>
        {/* <TouchableOpacity onPress={openDrawer}>
        <Entypo name="menu" size={24} color="black" />
    </TouchableOpacity> */}
              <TouchableOpacity onPress={openDrawer}>
    <Image
      source={require('../assets/images/menuIcon.png')}
      style={styles.menuIcon}
    />
  </TouchableOpacity>
 
          <TouchableOpacity
            style={
              selectedTab === "Get Directions" ? styles.selectedTab : styles.tab
            }
            onPress={() => handleTabPress("GetDirections", "Get Directions")}
                >
                

            {/* onPress={() => handleTabPress("mainLandingpagegetDirection", "Get Directions")}
              > */}
                
                
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
            
            
            
            {/* onPress={() =>
              handleTabPress("mainRouteandDriveTime", "Route & Drive Time")
              }  
            > */}
              
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
      <Image
        source={require('../assets/images/searchh.png')}
        style={styles.searchIcon}
        resizeMode="cover"
              />

                    {/* {searchQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear}  style={styles.clearContainer}>
           <Image
        source={require('../assets/images/clearIcon.png')}
        style={styles.clearIcon}
        resizeMode="cover"
      />
        </TouchableOpacity>
      )} */}

      <TextInput
        style={styles.searchBar}
        placeholder="Search Google Address"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          // Clear the error when text changes
        }}
        onSubmitEditing={handleSearch}
      />


      <View style={styles.spaceSearchbar}>
        <TouchableOpacity
          style={[
            styles.editButton1,
            buttonStates.globalMode ? styles.editButtonPressed : null,
            {
              backgroundColor: buttonStates.globalMode
                ? "#0000ee"
                : "#0000ee",
            },
          ]}
          onPress={() => handleButtonPress("globalMode")}
        >
          <Text
            style={[
              styles.editButtonText,
              buttonStates.globalMode ? styles.editButtonTextPressed : null,
              { color: buttonStates.globalMode ? "white" : "white" },
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

          {/* Render the list of search results */}
          <FlatList
  style={styles.flatList}
  data={searchResults}
  keyExtractor={(item) => item.id}
  showsVerticalScrollIndicator={false} // Hide the scrollbar
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleAddressSelect(item)}
    >
      <Text style={styles.searchResultText}>{item.formatted_address}</Text>
    </TouchableOpacity>
  )}
/>



        {/* <View style={styles.showTripContainer}>
          <TouchableOpacity onPress={handleShowTripPress}>
            <Text style={styles.showTriptext}>Show Tip</Text>
          </TouchableOpacity>
          </View>  
        <View style={styles.tripContainer}>
          <Text style={styles.tripText}>{tripText}</Text>
              </View> */}
             
            
             <View style={styles.showTripContainer}>
      <TouchableOpacity onPress={handleShowTripPress}>
        <Text style={styles.showTriptext}>Show Tip</Text>
      </TouchableOpacity>

      {isTripVisible && (
        <View style={styles.tripContainer}>
          <Text style={styles.tripText}>{tripText}</Text>
        </View>
      )}
    </View>


      </View>

        // </KeyboardAvoidingView>
        

      )}
      


      {selectedTab === 'Route & Drive Time' && (
    //   <KeyboardAvoidingView
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // //  style={{ flex: 1 }}
    //     >
    //        <View style={styles.headerStrip}><StatusBar barStyle="light-content" hidden={false} backgroundColor={'#00E'} translucent={true} />
    //       </View>
        <View style={styles.headercontainerRoute}>
          
<View style={styles.menuContainer}>
  <TouchableOpacity onPress={openDrawer}>
    <Image
      source={require('../assets/images/menuIcon.png')}
      style={styles.menuIcon}
    />
  </TouchableOpacity>

  <TouchableOpacity
    style={selectedTab === 'Get Directions' ? styles.selectedTab : styles.tab}

    onPress={() => handleTabPress('GetDirections', 'Get Directions')}
  >
  
    <Text style={selectedTab === 'Get Directions' ? styles.selectedTabText : styles.tabText}>Get Directions</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={selectedTab === 'Route & Drive Time' ? styles.selectedTab : styles.tab}
    onPress={() => handleTabPress('RouteDriveTime', 'Route & Drive Time')}
  >
  {/* onPress={() =>
    handleTabPress("mainRouteandDriveTime", "Route & Drive Time")
    }  
  > */}
    <Text style={selectedTab === 'Route & Drive Time' ? styles.selectedTabText : styles.tabText}>Route & Drive Time</Text>
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
            
<View style={styles.searchBarContainer1}>
        <TextInput
          style={styles.searchBar1}
          placeholder="Your Location"
          value={userLocation}
          onChangeText={(text) => setUserLocation(text)}
          onSubmitEditing={handleSearchLocation}
        />
      </View>

      <View style={styles.searchBarContainer2}>
        <TextInput
          style={styles.searchBar1}
          placeholder="End Destination"
          value={userDestination}
          onChangeText={(text) => setUserDestination(text)}
          onSubmitEditing={handleSearchDestination}
        />
      </View>
      <FlatList
  style={styles.flatList}
  data={locationResults}
  keyExtractor={(item) => item.id}
  showsVerticalScrollIndicator={false} // Hide the scrollbar
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleLocationSelect(item)}
    >
      <Text style={styles.searchResultText}>{item.formatted_address}</Text>
    </TouchableOpacity>
  )}
          />
            <FlatList
  style={styles.flatList}
  data={destinationResults}
  keyExtractor={(item) => item.id}
  showsVerticalScrollIndicator={false} // Hide the scrollbar
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleDestinationSelect(item)}
    >
      <Text style={styles.searchResultText}>{item.formatted_address}</Text>
    </TouchableOpacity>
  )}
/>

<View style={styles.doubleArrowContainer}>
  <Image
      source={require('../assets/images/doublearrow.png')}
      style={styles.doubleArrowIcon}
  /></View>


 <View style={styles.threeArrowContainer}>
  <Image
      source={require('../assets/images/threeicon.png')}
      style={styles.threeArrowIcon}
    /></View>

<View style={styles.showTripContainer}>
      <TouchableOpacity onPress={handleShowTripPress}>
        <Text style={styles.showTriptextRoute}>Show Tip</Text>
      </TouchableOpacity>

      {isTripVisible && (
        <View style={styles.tripContainer1}>
          <Text style={styles.tripText}>{tripText}</Text>
        </View>
      )}
    </View>
<View   style={[
styles.findRouteContainer, // Apply the 'editButtonText' style
]}>
<TouchableOpacity
style={styles.editRouteButton}
onPress={handleFindRoute} // Update the button press handler
>
<Text
style={styles.editRouteButtonText}
>
Find Route
</Text>
</TouchableOpacity>
</View>
</View>
// </KeyboardAvoidingView>
)}

      

 

<View style={styles.Mapcontainer}>
  <MapView
    style={styles.map}
    initialRegion={defaultInitialRegion}
    provider={PROVIDER_GOOGLE}
    showsUserLocation={true}
    showsMyLocationButton={true}
    ref={mapRef} // Make sure you have the mapRef defined using useRef()
  >
    {console.log("Provider value:", PROVIDER_GOOGLE)}
    <Marker
 coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
 title="Your Location"
 description="This is where you are"
 pinColor="green"
/>

    {markers.map((marker, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: parseFloat(marker.latitude),
          longitude: parseFloat(marker.longitude),
        }}
        title={`Location ${index + 1}`}
        description={`This is location ${index + 1}`}
        pinColor="red"
      />
    ))}
  </MapView>
</View>

{(selectedTab === 'Route & Drive Time') && routeDetails && (
  <View style={styles.routeDetails}>
    <Text>DriveTime: {routeDetails.duration}</Text>
    <Text>Distance(Km): {routeDetails.distance_km}</Text>
    <Text>Distance(miles): {routeDetails.distance_miles} </Text>
  </View>
)}

<View style={styles.footerContainer}>
  {error && (
    <View
      style={[
        styles.errorMessageContainer,
        { position: 'absolute', zIndex: 2, top: -22, alignSelf: 'center' },
      ]}
    >
      <Text style={{ color: 'red' }}>{error}</Text>
    </View>
  )}

  <TouchableOpacity
    style={styles.Jangobutton}
    onPress={() => {
      console.log(
        'Button pressed with coordinates:',
        destinationLatitude,
        destinationLongitude
      );
      openMapWithDirections(destinationLatitude, destinationLongitude);
    }}
  >
    <View style={styles.centerContent}>
      <Text style={styles.JangobuttonText}>Jango</Text>
      <Image
        source={require('../assets/images/locationnav.png')}
        style={styles.Jangolocationimage}
      />
    </View>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.Adressbutton}
    onPress={handleAddressingPress}
  >
    <Text style={styles.AddressingbuttonText}>Addressing</Text>
    <Image
      source={require('../assets/images/locationaddress.png')}
      style={styles.Addresslocationimage}
    />
  </TouchableOpacity>
</View>


<Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >

          <View style={styles.Modal}>
            
          <TouchableOpacity onPress={handleCloseModel}>
              <Image
                source={require("../assets/images/close.png")}
                style={styles.closeImage}
              />
            </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/jangoAdress/field3.png")}
            style={styles.icon}
          />
              <Text style={styles.RASPtext}>RASP Number</Text>




              <TouchableOpacity
  style={styles.helpButton}
  onPress={togglehelpModal}
>
  <Image
    source={require("../assets/images/help.png")}
    style={styles.Helpicon}
  />
</TouchableOpacity>

<Modal
  animationType="slide"
  transparent={true}
  visible={isHelpModalVisible}
  onRequestClose={togglehelpModal}
>
  <View style={styles.HelpmodalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.HelpmodalText}>
        Use this to specify the address of a Room, Apartment, Suite, or Plot within a compound or large building.
      </Text>
    
    </View>
  </View>
</Modal>


           <View style={styles.inputnumberView}>  
              <TextInput
                
               
            style={styles.input}
            placeholder="Enter a Number"
            value={raspNumber}
            onChangeText={(text) => {
              setRaspNumber(text);
              // Hide the help dialog for this field
              
            }}
                />
                </View> 

              <View style={styles.line}></View> 

              <View style={styles.selectTypeContainer}>
        <Text style={styles.selectTypeText}>
          {unitType ? unitType : "Select Type"}
        </Text></View>

        <View style={styles.Arrow}>
        <TouchableOpacity onPress={() => setUnitTypeModalVisible(true)}>
          <Image
            source={require("../assets/images/jangoAdress/down.png")}
            style={styles.dropdownArrow}
          />
        </TouchableOpacity>
        </View>
       

      
            </View>
            
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity onPress={addRaspNumber}><Text style={styles.saveButtonText}>SAVE</Text>
              </TouchableOpacity>
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

<Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibleAlis}
        onRequestClose={toggleModalAlis}
      >

          <View style={styles.Modal}>
            
          <TouchableOpacity onPress={handleCloseModelAlis}>
              <Image
                source={require("../assets/images/close.png")}
                style={styles.closeImage}
              />
            </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/AlisShare.png")}
            style={styles.icon}
          />
              <Text style={styles.RASPtext}>Alis</Text>


           <View style={styles.inputAlisView}>  
              <TextInput
                
               
            style={styles.input}
            placeholder="Enter Alis Address"
            value={alisAddress}
            onChangeText={(text) => {
              setAlisAddress(text);
              // Hide the help dialog for this field
              
            }}
                />
                </View> 
       

      
            </View>
            
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity  onPress={createAliasAddress}  >
              <Text style={styles.saveButtonText}>SAVE</Text>
              </TouchableOpacity>
            </View>

        </View>
      </Modal>


        {/* ending */}



        {/* //adding modal EDIT AlisADDRESS */}

<Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibleAlisEdit}
        onRequestClose={toggleModalAlisEdit}
      >

          <View style={styles.Modal}>
            
          <TouchableOpacity onPress={handleCloseModelAlisEdit}>
              <Image
                source={require("../assets/images/close.png")}
                style={styles.closeImage}
              />
            </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/AlisShare.png")}
            style={styles.icon}
          />
              <Text style={styles.RASPtext}>Alis</Text>


           <View style={styles.inputAlisView}>  
              <TextInput
                
               
            style={styles.input}
            placeholder="Edit Alis Address"
            value={alisAddress}
            onChangeText={(text) => {
              setAlisAddress(text);
              // Hide the help dialog for this field
              
            }}
                />
                </View> 
       

      
            </View>
            
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity  onPress={editAliasAddress}  >
              <Text style={styles.saveButtonText}>SAVE</Text>
              </TouchableOpacity>
            </View>

        </View>
      </Modal>


        {/* ending */}
        
  


      {/* bb */}
      



   

      </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // position:'relative',
  },
  headerStrip: {
    height: verticalScale(25),
    width: scale(360),
    backgroundColor:'#00E',
  },
  headercontainer: {
    backgroundColor: '#0000eebf',
    height: verticalScale(170),
   
    // top:verticalScale(25),
    width: scale(360),

  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  menuIcon: {
    height: verticalScale(25),
    width: scale(37),
    tintColor:"#FFF",
  },
  tab: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.60)',
  },
  selectedTabText: {
    color: '#FFF',
  },
  buttoncontainer: {
    top: verticalScale(20),
    left: scale(25),
  },
  editButton: {
    backgroundColor: '#0000ee',
    borderRadius: moderateScale(4),
    height: verticalScale(30),
    width: scale(103),
    top: 0,
    left: 0,
  },
  editButton1: {
    backgroundColor: '#0000ee',
    borderTopRightRadius: verticalScale(4),  // Adjust the radius as needed
    borderBottomRightRadius:verticalScale(4),
    height: verticalScale(30),
    width: scale(103),
    top: 0,
    left: 0,
  },
  editButtonPressed: {
    backgroundColor: 'white',
  },
  editButtonText: {
    color: 'white',
    fontSize: moderateScale(10),
    fontWeight: '400',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: moderateScale(0.32),
    lineHeight: moderateScale(14.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    paddingTop: moderateScale(8.5),
  },
  editButtonTextPressed: {
    color: '#0000ee',
  },
  space: {
    top: verticalScale(-30),
    marginLeft: scale(110),
  },
  space1: {
    top: verticalScale(-60),
    marginLeft: scale(220),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    width: scale(332),
    marginLeft: scale(15),
    top: verticalScale(-25),
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFF',
    // borderRadius: moderateScale(4),
    borderTopLeftRadius: moderateScale(4), // Adjust the radius as needed
    borderBottomLeftRadius: moderateScale(4), 
    height: verticalScale(30),
    paddingLeft: 45,
    marginLeft: scale(10),
    padding: moderateScale(5),
    fontFamily: "Inter",
    color: "rgba(0, 0, 0, 0.80)",
     textDecorationLine: 'none',
    fontSize: 12,
    // fontWeight: 400,
   letterSpacing:0.4,
    position: 'relative', 
    // alignSelf:'center',
  },
  searchBar1: {
    flex: 1,
    backgroundColor: '#FFF',
     borderRadius: moderateScale(4),
  lineHeight:14.4,
    height: verticalScale(30),
    paddingLeft: 25,
    marginLeft: scale(10),
    // padding: moderateScale(5),
    fontFamily: "Inter",
    color: "rgba(0, 0, 0, 0.80)",
    fontSize: 12,
    lineHeight:14.4,
   // fontWeight: 400,
   letterSpacing:0.4,
    position: 'relative', 
    // alignSelf:'center',
  },
  searchButton: {
    backgroundColor: '#0000ee',
    height: verticalScale(30),
    width: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    left: moderateScale(25),
    zIndex: 1,
    tintColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    bottom:8,
  },
  clearContainer: {
    zIndex: 1,
    
  },
  clearIcon: {
    width: moderateScale(10),
    height: moderateScale(10),
    left: moderateScale(200),
    alignSelf: 'center',
    justifyContent:'center',
    zIndex:1,
    justifyContent:'flex-end',
    position: 'absolute', 
  },
  
  spaceSearchbar: {
    gap: scale(65),
  },
  showTripContainer: {
    top: verticalScale(-20),
   
  },
  showTriptext: {
 
    marginLeft: scale(25),
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: moderateScale(10),
    fontWeight: '500',
    top: verticalScale(5),
    letterSpacing: moderateScale(0.4),
    lineHeight: moderateScale(14.4),
    position: 'absolute',
   

  },

  tripContainer: {
    backgroundColor: '#FFF',
    padding: moderateScale(0),
    alignSelf: 'center',
    top: verticalScale(30),
    zIndex: 1,
    position: 'absolute',
      width: scale(340),
      height: verticalScale(85),
    justifyContent: 'center',
    marginRight: scale(5),
    borderRadius: moderateScale(2),
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: moderateScale(4),
      },
      android: {
        elevation: moderateScale(2),
      },
    }),
    
  },
  tripContainer1: {
  //   backgroundColor: '#FFF',
  //   padding: moderateScale(0),
  //  alignSelf: 'center',
  //  top: verticalScale(230),
  //   zIndex: 1,
    //   position: 'absolute',
    
    backgroundColor: '#FFF',
    height: verticalScale(85),
    width: scale(340),
    alignSelf: 'center',
    top: verticalScale(-13),
    zIndex: 1,
    position: 'absolute',
  justifyContent:'center',
   
    marginRight: scale(5),
    borderRadius: moderateScale(2),
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: moderateScale(4),
      },
      android: {
        elevation: moderateScale(2),
      },
    }),
  },
  tripText: {
    color: '#656565',
    fontFamily: 'GenBkBasR',
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(18.72),
    letterSpacing: moderateScale(0.52),
    position: 'relative',
    left:5,
  //  marginLeft:5,
    // width: scale(340),
    // height: verticalScale(85),
  },
  footerContainer: {
    backgroundColor: '#ffffff',
    height: verticalScale(45),
    width: scale(360),
   
      // position: 'absolute',
    bottom: verticalScale(0),
    justifyContent: 'space-between',
  //  flexDirection: 'row',
  },
  
  
  Jangobutton: {
    backgroundColor: 'blue',
    padding: moderateScale(10),
    // borderRadius: moderateScale(5),
    width: scale(180),
    height: verticalScale(45),
    alignItems: 'center',
  },
  JangobuttonText: {
    color: 'white',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(14),
    fontWeight: '500',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.16),
    textAlign: 'center',
    alignSelf:'center',
    textAlignVertical: 'center', 
 bottom: verticalScale(-12),
  },
  Jangolocationimage: {
    width: moderateScale(13),
    height: moderateScale(18),
    alignSelf: 'center',
    justifyContent:'center',
    bottom: verticalScale(24),
    // top: verticalScale(-25),
    
  },
  
  Adressbutton: {
    backgroundColor: '#ffffff',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    width: scale(180),
    height: verticalScale(45),
    alignItems: 'center',
    marginLeft: scale(180),
    top: verticalScale(-45),
  },
  AddressingbuttonText: {
    color: '#0000eebf',
    fontFamily: 'GenBkBasB',
    fontSize: moderateScale(14),
    fontWeight: '500',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.16),
    textAlign: 'center',
    alignSelf:'center',
    textAlignVertical: 'center', 
    bottom: verticalScale(-12),
    // top: verticalScale(10),
  },
  Addresslocationimage: {
    // width: moderateScale(12.5),
    // height: moderateScale(17),
    // top: verticalScale(-25),


justifyContent:'center',
    width: moderateScale(14.5),
    height: moderateScale(20),
    alignSelf: 'center',
    bottom: verticalScale(25),
  },
  Modal: {
    width: scale(338),
    height: verticalScale(179),
    alignSelf: 'center',
    backgroundColor: '#F6F6F6',
    top: verticalScale(180),
  },
  inputContainer: {
    top: verticalScale(50),
    alignSelf: 'center',
    marginBottom: verticalScale(10),
    flexDirection: "row", // Align icon and input horizontally
    alignItems: "center", // Center vertically
    backgroundColor: "#ffffff", // Light white background color
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#ccc", // Light gray border color
    elevation: Platform.OS === "android" ? verticalScale(5) : 0,
    height: verticalScale(50),
    width: scale(328),
  },
  dropdownArrow: {
    height: verticalScale(20),
    width: scale(20),
    marginLeft: scale(130),
    alignSelf: 'flex-end',
  },
  
  saveButtonContainer: {
    width: scale(162),
    height: verticalScale(35),
    borderRadius: 3,
    backgroundColor: '#00E', 
    alignSelf: 'center',
    top: verticalScale(60),
  },
  
  saveButtonText: {
    color: '#FFF',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'GenBkBasB', // Assuming Gentium Book Basic is available in your project
    fontSize: scale(15),
    paddingTop: verticalScale(5),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(21.6),
    letterSpacing: scale(0.6),
  },
  
  modalContainer: {
    width: scale(122),
    height: verticalScale(89),
    top: verticalScale(330),
    flexShrink: 0,
    borderRadius: scale(4),
    backgroundColor: '#FFF',
    shadowColor: '#000',
    alignSelf: 'flex-end',
  },
  
  RASPtext: {
    color: '#00E',
    fontFamily: 'Lato',
    fontSize: scale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28), // This corresponds to 144% of font-size: 12px
    letterSpacing: scale(0.48),
    marginLeft: scale(20),
    alignSelf: 'flex-start',
    left:verticalScale(10),
  },
  
  Helpicon: {
    height: verticalScale(20),
    width: scale(20),
    marginLeft: scale(20),
    top: -verticalScale(14),
  },
  
  HelpmodalContainer: {
    top: verticalScale(200),
    width: scale(332),
    height: verticalScale(55),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', 
  },
  
  HelpmodalText: {
    color: '#0B1719',
    fontFamily: 'Lato',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: scale(0.48),
    textAlign: 'center',
  },
  
  modalItem: {
    color: 'rgba(0, 0, 0, 0.80)',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: scale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: scale(0.48),
  },
  
  inputnumberView: {
    top: verticalScale(10),
    marginLeft: scale(-120),
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(120),
  },
  
  inputAlisView: {
    top: verticalScale(10),
    marginLeft: scale(-20),
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(320),
  },
  
  line: {
    width: scale(1),
    height: verticalScale(14),
    flexShrink: 0,
    alignSelf: 'center',
    marginLeft: scale(20),
    bottom: -verticalScale(10),
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(14.4),
    backgroundColor: '#666',
    letterSpacing: scale(0.4),
  },
  
  selectTypeContainer: {
    marginLeft: scale(15),
    marginTop: verticalScale(35),
    height: verticalScale(40),
  },
  
  Arrow: {
    height: verticalScale(10),
    width: scale(20),
    top: verticalScale(3),
    marginLeft: scale(10),
  },
  
  icon: {
    marginLeft: scale(8),
    height: verticalScale(20),
    width: scale(22),
  },
  
  closeImage: {
    height: verticalScale(10),
    width: scale(10),
    top: verticalScale(10),
    marginRight: scale(10),
    alignSelf: 'flex-end',
  },
  
  Mapcontainer: {
    height: verticalScale(650),
    width: '100%',
    top: 0,
    zIndex: -1,
    flex: 1,
  },
  
  map: {
    width: '100%',
    height: '100%',
    //  flex: 1,
  },
  
  flatList: {
    position: 'absolute',
    top: verticalScale(190),
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'white',
    elevation: 5,
  },
  
  searchResultItem: {
    padding: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: '#ccc',
  },
  
  searchResultText: {
    fontSize: scale(16),
    color: '#333',
  },
  
  // Selected tab styles
  
  searchBarContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    width: scale(272),
    top: -verticalScale(25),
    alignSelf: 'center',
  },
  
  editRouteButton: {
    borderRadius: scale(4),
    height: verticalScale(30),
    width: scale(103),
    top: 0,
    left: 0,
    backgroundColor: '#ffffff',
  },
  
  editRouteButtonText: {
    color: '#00E',
    fontSize: scale(10),
    fontWeight: '400',
    fontFamily: 'Inter',
    letterSpacing: scale(0.4),
    lineHeight: verticalScale(14.4),
    textAlign: 'center',
 textAlignVertical:"center",
    padding: scale(8),
  },
  
  findRouteContainer: {
    top: -verticalScale(80),
    alignSelf: 'center',
  },
  
  searchBarContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    width: scale(272),
    top: -verticalScale(15),
    alignSelf: 'center',
  },
  
  headercontainerRoute: {
    backgroundColor: '#0000eebf',
    height: verticalScale(231),
    // position: 'absolute',
    // top: verticalScale(25),
    width: scale(360),
  },
  
  doubleArrowContainer: {
    top: -verticalScale(60),
    alignSelf: 'flex-end',
    marginRight: scale(20),
  },
  
  doubleArrowIcon: {
    height: verticalScale(15),
    width: scale(16),
  },
  
  threeArrowContainer: {
    top: -verticalScale(90),
    alignSelf: 'flex-start',
    marginLeft: scale(30),
  },
  
  threeArrowIcon: {
    height: verticalScale(59),
    width: scale(15),
  },
  
  showTriptextRoute: {
    top: 0,
    marginLeft: scale(25),
    color: '#ffffff',
    fontFamily: 'Inter-Medium, Helvetica',
    fontSize: scale(10),
    fontWeight: '500',
    left: 0,
    letterSpacing: scale(0.4),
    lineHeight: verticalScale(14.4),
    position: 'absolute',
    top: -verticalScale(40),
    whiteSpace: 'nowrap',
  },
  routeDetails: {
    alignSelf: 'flex-start',
    marginLeft:10,
  },
  
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   headercontainer: {
//     backgroundColor: "#0000eebf",
//     height: 170,
//     position: "absolute",
//     top: 0,
//     width: 360,
//   },
//   menuContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   menuIcon: {
//     height: 21,
//     width: 34,
//   },
//   tab: {
//     borderBottomWidth: 2,
//     borderBottomColor: "transparent",
//   },
//   selectedTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: "white",
//   },
//   tabText: {
//     color: "grey",
//   },
//   selectedTabText: {
//     color: "white",
//   },

//   buttoncontainer: {
//     top: 20,
//     left: 25,
//   },

//   editButton: {
//     backgroundColor: "#0000ee", // You can replace this color with your desired color
//     borderRadius: 4,
//     height: 30,
//     width: 103,
//     // position: 'absolute',
//     top: 0,
//     left: 0,
//     //  marginLeft: -90,
//   },
//   editButtonPressed: {
//     backgroundColor: "white", // Background color when pressed
//   },
//   editButtonText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "400",
//     fontFamily: "Inter-SemiBold",
//     letterSpacing: 0.32,
//     lineHeight: 14.4,
//     textAlign: "center",
//     padding: 4.5,
//   },
//   editButtonTextPressed: {
//     color: "#0000ee", // Text color when pressed
//   },
//   space: {
//     top: -30, // Adjust this height to control the spacing
//     marginLeft: 110, //
//   },
//   space1: {
//     top: -60, // Adjust this height to control the spacing
//     marginLeft: 220,
//   },
//   searchBarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     margin: 0,
//     width: 332,
//     marginLeft: 15,
//     top: -25,
//   },
//   searchBar: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     borderRadius: 4,
//     height: 30,
//     marginLeft: 10, // Adjust this value for spacing
//     padding: 5,
//   },
//   searchButton: {
//     backgroundColor: "#0000ee",
//     // borderRadius: '0 4px 4px 0',
//     height: 30,
//     width: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: "white",
//   },
//   spaceSearchbar: {
//     gap: 65,
//   },
//   showTripContainer: {
//     top: -20,
//   },
//   showTriptext: {
//     top: 0,
//     marginLeft: 25,
//     color: "#ffffff",
//     fontFamily: "Inter-Medium, Helvetica",
//     fontSize: 10,
//     fontWeight: "500", // Use a string value for fontWeight
//     left: 0,
//     letterSpacing: 0.4,
//     lineHeight: 14.4,
//     position: "absolute", // Use 'absolute' for fixed positioning in React Native
//     top: 0,
//     whiteSpace: "nowrap",
//   },
//   tripContainer: {
//     backgroundColor: "#FFF",
//     padding: 10,
//     marginTop: 0,
//   },
//   tripText: {
//     color: "#656565",
//     fontFamily: "Gentium Book Basic",
//     fontSize: 13,
//     fontStyle: "normal",
//     fontWeight: "400",
//     lineHeight: 18.72,
//     letterSpacing: 0.52,
//   },
//   footerContainer: {
//     backgroundColor: "#ffffff",
//     height: 45,
//     width: 360,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     top: 650,
//   },
//   Jangobutton: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//     width: 200,
//     height: 45,
//     alignItems: "center",
//   },

//   JangobuttonText: {
//     color: "#ffffff",
//     fontFamily: "Inter-Medium", // Make sure to load the 'Inter-Medium' font
//     fontSize: 14,
//     fontWeight: "500",
//     letterSpacing: 0.56,
//     lineHeight: 20.2,
//     textAlign: "center",
//     top: 10,
//   },
//   Jangolocationimage: {
//     width: 13,
//     height: 17,
//     top: -30,
//   },
//   Adressbutton: {
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 5,
//     width: 200,
//     height: 45,
//     alignItems: "center",
//     marginLeft: 180,
//     top: -45,
//   },
//   AddressingbuttonText: {
//     color: "#0000eebf",
//     fontFamily: "Inter-Medium", // Make sure to load the 'Inter-Medium' font
//     fontSize: 14,
//     fontWeight: "500",
//     letterSpacing: 0.56,
//     lineHeight: 20.2,
//     textAlign: "center",
//     top: 10,
//   },
//   Addresslocationimage: {
//     width: 23,
//     height: 37,
//     top: -30,
//   },
// });

export default MainLandingPageGetDirection;