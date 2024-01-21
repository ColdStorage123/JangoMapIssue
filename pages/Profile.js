// created_by is need to be replaced

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput, 
  TouchableOpacity,
  StyleSheet, Modal,
  Image,Share,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import axios from "axios";
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserData from "../components/useUserData";
import Button from "../components/Button";

const Profile = ({ navigation }) => {

  const [moreModalVisible, setMoreModalVisible] = useState(false);


  // const [updateImage, setUpdateImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  // const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null); // Add this line to declare userName
  const [userEmail, setUserEmail] = useState(null);
  const [jangoAddresses, setJangoAddresses] = useState([]);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  // const { userIds, fullNames, emailAddress } = useUserData();

  // // Log user data to the console
  // console.log('User Data in AlisScreen:', { userIds, fullNames, emailAddress });
  const jangoAddressesToShow = showAllAddresses
    ? jangoAddresses
    : jangoAddresses.slice(0, 4);

  useEffect(() => {
    const getStoredUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const fullNames = await AsyncStorage.getItem("full_names");
        const emailAddress = await AsyncStorage.getItem("email_address");

        console.log("Stored userId:", userId);
        console.log("Stored userName:", fullNames);
        console.log("Stored userEmail:", emailAddress);

        if (userId !== null) {
          // Use the user data here
          setUserId(userId);
          setUserName(fullNames);
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

  // const userId = "efd6bcce14dd1a21";
  const fetchProfileImage = async (userId) => {
    try {
      const response = await fetch(
        `https://jango-api-dev.jangoaddress.com/getProfileImage.php/${userId}`
      );
      console.log(
        `https://jango-api-dev.jangoaddress.com/getProfileImage.php/${userId}`
      );
      if (response.ok) {
        const responseText = await response.text();
        console.log("API Response Text:", responseText);
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

  // Helper function to check if a string is valid JSON

  useEffect(() => {
    fetchProfileImage(userId)
      .then((imageURL) => {
        if (imageURL) {
          console.log("Profile image fetched successfully:", imageURL);
          setProfileImage(imageURL);
        } else {
          console.error("No image URL fetched.");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
  }, [userId]); // Include userId in the dependency array


  useEffect(() => {
    const fetchJangoAddresses = async () => {
      try {
        const response = await axios.get('https://jango-api-dev.jangoaddress.com/getMyJanGoAddresses.php?created_by=e5b8868dd8a9877b');
        if (response.status === 200) {
          setJangoAddresses(response.data.list); // Assuming the addresses are in the response.data.list
          console.log('API Response:', response.data); // Log the API response
        } else {
          console.error('Failed to fetch Jango addresses. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching Jango addresses:', error);
      }
    };
  
    fetchJangoAddresses();
  }, []);
  
  

  //home addrsses
  
  const [homeAddresses, setHomeAddresses] = useState([]);
  // const userId = 'e5b8868dd8a9877b'; // Replace with your actual userId or use the one you retrieve from AsyncStorage

  useEffect(() => {
    // const userId = 'e5b8868dd8a9877b'; // Hardcoded user ID
  
    const fetchData = async () => {
      // try {
      //   const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyHomeAddresses.php?id=${userId}`);
      //   setHomeAddresses(response.data);
      //   console.log('Home Addresses:', response.data);
      // } catch (error) {
      //   console.error('Error fetching home addresses:', error);
      // }
      try {
        const response = await axios.get(`https://jango-api-dev.jangoaddress.com/getMyHomeAddresses.php?id=${userId}`);
        
        // Assuming your API response contains the homeId
        const homeId = response.data.list[0].home_id;
        
        setHomeAddresses(response.data);
        console.log('Home Addresses:', response.data);
        console.log('Home ID:', homeId);
      } catch (error) {
        console.error('Error fetching home addresses:', error);
      }
    };
  
    fetchData();
  }, [userId]); // Empty dependency array to fetch data only once when the component mounts
  

  const handleDeletePress = async () => {
    try {
      if (!homeAddresses || !homeAddresses.list || homeAddresses.list.length === 0) {
        console.error('Home addresses are not available.');
        return;
      }

      const homeId = homeAddresses.list[0].home_id; // Use the first home_id from the list
      const response = await axios.delete(
        `https://jango-api-dev.jangoaddress.com/deleteMyHomeAddress.php?id=${userId}&home_id=${homeId}`
      );

      // Log the response or perform any other actions with the data here
      console.log('API Response:', response.data);

      // Add logic to update your component state or perform other actions if needed
    } catch (error) {
      console.error('Error deleting data:', error);

      // Handle error as needed (show an error message, etc.)
    }
  };
  
  //home address end

  // The empty dependency array means this will run once when the component mounts.
  const handleEditPress = () => {
    // Add your logic here for what should happen when the button is pressed
    navigation.navigate("EditProfile");

    // You can navigate to another screen, show a modal, or perform any other action.
  };



  
  handleNotification = () => {
    // Replace this with your notification handling logic
    console.log("Received a notification");
    // You can add more code to handle the notification here
  };
  const handleMore = () => {
    console.log("Received a more5");
    setMoreModalVisible((prevVisibility) => !prevVisibility); // Toggle modal visibility
  };
  handleViewall = () => {
    // Replace this with your notification handling logic
    console.log("Received a viewall");
    // You can add more code to handle the notification here
  };
  handlegetDirections = () => {
    // Replace this with your notification handling logic
    console.log("Received a directions");
    // You can add more code to handle the notification here
  };
  handleshareAddress = () => {
    // Replace this with your notification handling logic
    console.log("Received a share address");
    // You can add more code to handle the notification here
  };
  const removeImage = () => {
    setCapturedImage(null);
  };

  const ShareProfile = () => {
    // Replace 'Your share message here' with the actual content you want to share
    const shareMessage = 'Your share message here';

    Share.share({
      message: shareMessage,
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };
  const simpleFunction = () => {
    console.log("handlegetDirections called");
    // ... rest of the code
  };
  const handleShareAddress = (jangoAddress) => {
    const shareMessage = `Share this address: ${jangoAddress.modified_formatted_address}`;

    Share.share({
      message: shareMessage,
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };
  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* main screen container */}
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <TouchableOpacity
            onPress={handleNotification}
            style={styles.NotificationIconcontainer}
          >
            <Image
              source={require("../assets/images/notification.png")}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          <View style={styles.headercontainerprofile}>
            <View>
              <Image
                source={{
                  // uri: "https://jango-api-dev.jangoaddress.com/getProfileImage.php/efd6bcce14dd1a21",
                  uri: `https://jango-api-dev.jangoaddress.com/getProfileImage.php/${userId}`,
                }}
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.userNameText}>{userName}</Text>
            <Text style={styles.userEmailText}>{userEmail}</Text>
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={ShareProfile}>
      <Image
        source={require("../assets/images/share.png")} // Replace with the correct path to your image
        style={styles.saveIcon} // Apply custom styles to the image here
      />
      <Text style={styles.savebuttonText}>Share</Text>
    </TouchableOpacity>

          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Image
              source={require("../assets/images/edit.png")} // Replace with the correct path to your image
              style={styles.saveIcon} // Apply custom styles to the image here
            />
            <Text style={styles.savebuttonText}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.headerLine}></View>
        </View>


        <View style={styles.homeAddressContainer}>
  <Text style={styles.homeAddressText}>Home Address</Text>
  <TouchableOpacity onPress={handleMore} style={styles.NotificationIconcontainer}>
    <Image source={require("../assets/images/dots.png")} style={styles.dotIcon} />
  </TouchableOpacity>
  {/* Display the fetched home address */}
  {homeAddresses.list && homeAddresses.list.length > 0 && (
    <View style={styles.addressDetailsContainer}>
     
     <Text style={styles.HomeaddressText}>
  <Text style={styles.homeAddressLine1}>{homeAddresses.list[0].formatted_address.split(',')[0]}</Text>
  {'\n'}
  <Text style={styles.homeAddressLine2}>{homeAddresses.list[0].formatted_address.split(',').slice(1).join(',')}</Text>
</Text>

    </View>
          )}
          <Modal
        transparent
        visible={moreModalVisible}
        animationType="slide"
        onRequestClose={() => setMoreModalVisible(false)}
      >
        <View style={styles.moreModalContainer}>
        <TouchableOpacity style={styles.moreOption} onPress={() => console.log("Edit pressed")}>
      <View style={styles.editContainer}>
        <Image
          source={require('../assets/images/deleteModelIcon.png')}
          style={styles.editImage}
        />
        <Text style={styles.moreOptionText}>Edit</Text>
      </View>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity style={styles.moreOption} onPress={handleDeletePress}>
      <View style={styles.editContainer}>
        <Image
          source={require('../assets/images/deleteModelIcon.png')}
          style={styles.editImage}
        />
        <Text style={styles.moreOptionText}>Delete</Text>
      </View>
    </TouchableOpacity>
        </View>
      </Modal>

</View>


        <View style={styles.saveAddressContainer}>
          <Text style={styles.homeAddressText}>Saved Address</Text>


          <TouchableOpacity
  onPress={() => {
    console.log('Navigating with jangoAddresses:', jangoAddresses);
    navigation.navigate('My Address', { jangoAddresses, created_by: 'e5b8868dd8a9877b' });
    console.log('Sharing address...', jangoAddresses);
  }}
>
  <Text style={styles.ViewAllText}>View All</Text>
</TouchableOpacity>

          
          {/* <TouchableOpacity
  onPress={() => {
   
    navigation.navigate('My Addresses', { screen: 'JangoAddressScreen', params: { jangoAddresses } });
    console.log('Sharing address...',jangoAddresses);
  }}
>
  <Text style={styles.ViewAllText}>View All</Text>
</TouchableOpacity>
 */}






          {/* {!showAllAddresses && (
            
        <TouchableOpacity onPress={() => setShowAllAddresses(true)}>
          <Text style={styles.ViewAllText}>View All</Text>
        </TouchableOpacity>
      )} */}
        
          
        <View style={styles.SubsaveAddressContainer}>
      {Array.isArray(jangoAddressesToShow) && jangoAddressesToShow.length > 0 ? (
        jangoAddressesToShow.map((jangoAddress, index) => (
          <View key={index} style={styles.subAddressItemContainer}>


{/* 
            <View style={styles.NotificationIconcontainer}>
         
  <TouchableOpacity onPress={simpleFunction}>
    <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
  </TouchableOpacity>

            <TouchableOpacity onPress={() => handleShareAddress(jangoAddress)} >
            <Image source={require("../assets/images/shareDirection.png")} style={styles.shareIcon} />
            </TouchableOpacity>
            </View> */}


<View style={styles.NotificationIconcontainer}>
  <TouchableOpacity onPress={simpleFunction}>
    <Image source={require("../assets/images/direction.png")} style={styles.directionIcon} />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleShareAddress(jangoAddress)}>
    <Image source={require("../assets/images/shareDirection.png")} style={styles.shareIcon} />
  </TouchableOpacity>
</View>

<View style={styles.Textcontainer}>
            <Text style={styles.addressText}>
              <Text style={styles.addressLine1}>{jangoAddress.modified_formatted_address.split(', ')[0]}</Text>
              {'\n'}
              <Text style={styles.addressLine2}>{jangoAddress.modified_formatted_address.split(', ').slice(1).join(', ')}</Text>
              </Text>
              </View>
            {/* Add any other address details you want to display */}
          </View>
        ))
      ) : (
        <Text>No Jango Addresses available</Text>
      )}
    </View>

        </View>
      </View>

      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    flex: 1,
    // top: moderateScale(-160), // Use moderateScale for vertical scaling
  },
  headercontainer: {
    height: verticalScale(130),
    width: '100%',
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    top: 0,
  },
  headercontainerprofile: {
    height: verticalScale(81),
    width: verticalScale(81), // Use verticalScale for both width and height
    flex: 1,
    position: 'absolute',
    top: verticalScale(25),
    left: moderateScale(20),
    resizeMode: 'cover',
    borderColor: 'black',
  },
  NotificationIconcontainer: {
    top: verticalScale(15),
    alignSelf: 'flex-end',
    flex: 0.2,
    zIndex: 1,
  },
  shareIcon: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginRight: moderateScale(30),
    marginTop: -verticalScale(15),
    left: moderateScale(25),
  },
  directionIcon: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginRight: moderateScale(20),
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: moderateScale(16),
  },
  icon: {
    height: moderateScale(12),
    width: moderateScale(12),
    marginLeft: moderateScale(20),
  },
  saveIcon: {
    height: moderateScale(15),
    width: moderateScale(15),
    position: 'absolute',
    top: moderateScale(3.5),
    left: moderateScale(10),
  },
  notificationIcon: {
    height: moderateScale(15),
    width: moderateScale(15),
    marginRight: moderateScale(10),
  },
  dotIcon: {
    height: moderateScale(15),
    width: moderateScale(15),
    marginRight: moderateScale(10),
    top: -verticalScale(30),
  },


//   shareIcon: {
//     height: 15,
//     width: 15,
//    marginRight: 10,
// //  marginTop: -30,
   
    
//   },
//   directionIcon: {
//     height: 15,
//     width: 15,
//     marginRight: 35,
//     // top: -15,
  //   },
  
  headerLine: {
    width: moderateScale(360),
    height: verticalScale(1),
    top: verticalScale(25),
    marginRight: moderateScale(10),
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderColor: 'solid',
  },
  shareButton: {
    backgroundColor: '#0000ee1a',
    borderRadius: moderateScale(2),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2),
    height: verticalScale(23),
    width: moderateScale(84),
    justifyContent: 'center',
    alignItems: 'center',
    top: verticalScale(40),
    marginRight: moderateScale(60),
    alignSelf: 'flex-end',
  },
  editButton: {
    backgroundColor: '#0000ee1a',
    borderRadius: moderateScale(2),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(2),
    height: verticalScale(23),
    width: moderateScale(84),
    justifyContent: 'center',
    alignItems: 'center',
    top: verticalScale(16),
    marginLeft: moderateScale(110),
  },
  savebuttonText: {
    color: '#0000ee',
    fontFamily: 'Inter-Regular',
    fontSize: moderateScale(10),
    fontWeight: '400',
    top: 0,
    left: moderateScale(8),
  },
  saveIconcamera: {
    height: verticalScale(15),
    width: moderateScale(15),
    alignSelf: 'center',
    top: verticalScale(8),
  },
  userNameText: {
    color: 'rgba(0, 0, 0, 0.80)',
    fontFamily: 'Inter',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: moderateScale(0.48),
  },
  userEmailText: {
    color: 'rgba(0, 0, 0, 0.80)',
    fontFamily: 'Inter',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: moderateScale(0.48),
  },
  image: {
    width: moderateScale(71),
    height: moderateScale(71),
    borderRadius: moderateScale(50),
  },
  infoContainer: {
    alignSelf: 'center',
    top: verticalScale(20),
    marginLeft: moderateScale(40),
  },
  homeAddressContainer: {
    width: moderateScale(328),
    height: verticalScale(89),
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(1),
    borderColor: 'rgba(0, 0, 238, 0.75)',
    backgroundColor: '#FFF',
    position: 'absolute',
    top: verticalScale(130),
  },


   saveAddressContainer: {
    top: verticalScale(230),
    width: moderateScale(328),
    height: verticalScale(389),
     borderColor: 'rgba(0, 0, 238, 0.75)',
     position: 'absolute',
  },
  homeAddressText: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: verticalScale(17.28),
    letterSpacing: moderateScale(0.48),
    top: verticalScale(10),
    marginLeft: moderateScale(15),
  },
  ViewAllText: {
    color: 'rgba(0, 0, 238, 0.75)',
    fontFamily: 'Inter',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: verticalScale(14.4),
    letterSpacing: moderateScale(0.4),
    alignSelf: 'flex-end',
    marginRight: moderateScale(10),
    top: verticalScale(-5),
  },
  SubsaveAddressContainer: {
    width: moderateScale(328),
    height: verticalScale(443),
    top: verticalScale(10),
  },
  subAddressItemContainer: {
    width: moderateScale(328),
    height: verticalScale(43),
    backgroundColor: 'rgba(0, 0, 238, 0.02)',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  // addressText: {
  // fontFamily: 'Inter',
  // fontSize: 10,
  // fontStyle: 'normal',
  // fontWeight: '400',
  // lineHeight: 14.4,
  //   letterSpacing: 0.4,
  //   // alignSelf: 'center',
  //   top: -20,
  //   paddingLeft:10,
  // },

  Textcontainer: {
    flex: 1,
    // top: 10,
    // backgroundColor:'red',
  },
  addressText: {
    // flexDirection: 'column', // Ensure each nested Text component is rendered in a new line
    paddingLeft: moderateScale(10),
    position: 'absolute',
    alignItems: 'flex-start',
    top: verticalScale(-5),
  },
  addressLine1: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28),
    letterSpacing: moderateScale(0.48),

    // position: 'absolute',
  },
  addressLine2: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(14.4),
    letterSpacing: moderateScale(0.4),
    // position: 'absolute',
  },
  HomeaddressText: {
    fontFamily: 'Inter',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(14.4),
    letterSpacing: moderateScale(0.4),
    // alignSelf: 'center',
    top: 0,
    paddingLeft: moderateScale(10),
    position:'absolute',
  },
  homeAddressLine1: {
    paddingLeft: moderateScale(10),
    color: '#000',
    fontFamily: 'Inter',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28),
    letterSpacing: moderateScale(0.48),

  },
  homeAddressLine2: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: moderateScale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28),
    letterSpacing: moderateScale(0.48),
  },







  moreModalContainer: {
    width: moderateScale(67),
    height: moderateScale(50),
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: moderateScale(0.2),
    borderColor: 'rgba(0, 0, 0, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: moderateScale(0.4),
    shadowRadius: moderateScale(4),
    elevation: moderateScale(4), // For Android shadow
    marginVertical: moderateScale(10), // Adjust the margin as needed
    position: 'absolute',
    right: moderateScale(10), // Adjust as needed
    top: moderateScale(220), // Adjust as needed
  },
  moreOption: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreOptionText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: moderateScale(17.28),
    letterSpacing: moderateScale(0.48),
  },
  editImage: {
    height: moderateScale(10),
    width: moderateScale(10),
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
    top: moderateScale(5),
    right: moderateScale(5),
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: moderateScale(67),
    height: moderateScale(0.2),
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    // Add any additional styles for the line if needed
  },
});

export default Profile;