// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Custom drawer label for Profile screen
// export const ProfileDrawerLabel = ({ focused, navigation }) => (
//   <View style={styles.labelContainer}>
//     <Image
//       source={require("../assets/images/user.png")}
//       style={styles.labelIcon}
//     />
//     <Text
//       style={[
//         styles.labelText,
//         focused ? styles.labelTextFocused : null,
//         focused,
//       ]}
//     >
//       Profile
//     </Text>
//   </View>
// );

// // Custom drawer label for My Addresses screen
// export const AddressesDrawerLabel = ({ focused }) => (
//   <View
//     style={[styles.labelContainer, focused && styles.labelContainerFocused]}
//   >
//     <Image
//       source={require("../assets/images/location.png")}
//       style={styles.labelIcon}
//     />
//     <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
//       My Addresses
//     </Text>
//   </View>
// );
// export const HorizontalLine = () => <View style={styles.horizontalLine}></View>;

// // Custom drawer label for Notification screen
// export const NotificationDrawerLabel = ({ focused }) => (
//   <View style={styles.labelContainer}>
//     <Image
//       source={require("../assets/images/notification.png")}
//       style={styles.labelIcon}
//     />
//     <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
//       Notification
//     </Text>
//   </View>
// );

// export const SettingsDrawerLabel = ({ focused }) => (
//   <View style={styles.labelContainer}>
//     <Image
//       source={require("../assets/images/setting.png")}
//       style={styles.labelIcon}
//     />
//     <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
//       Settings
//     </Text>
//   </View>
// );

// export const HelpDrawerLabel = ({ focused }) => (
//   <View style={styles.labelContainer}>
//     <Image
//       source={require("../assets/images/help.png")}
//       style={styles.labelIcon}
//     />
//     <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
//       Help
//     </Text>
//   </View>
// );

// import { TouchableOpacity, Alert } from "react-native";
// import { useNavigation } from '@react-navigation/native';
// import LoadingSpinner from "../components/LoadingSpinner";
// export const LogoutDrawerLabel = ({ focused, onPress }) => {
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);


//   const handlePress = async () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Logout',
//           onPress: async () => {
//             setIsLoading(true);
  
//             try {
//               // Clear all AsyncStorage data
//               await AsyncStorage.clear();
  
//               // Simulate some asynchronous operation
//               await new Promise((resolve) => setTimeout(resolve, 2000));
  
//               // Redirect to the login screen
//               navigation.navigate('Login');
//             } catch (error) {
//               console.error('Error during logout:', error);
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };
  

//   // const handlePress = async () => {
//   //   Alert.alert(
//   //     'Logout',
//   //     'Are you sure you want to logout?',
//   //     [
//   //       {
//   //         text: 'Cancel',
//   //         style: 'cancel',
//   //       },
//   //       {
//   //         text: 'Logout',
//   //         onPress: async () => {
//   //           setIsLoading(true);

//   //           try {
//   //             await AsyncStorage.removeItem('userId');
//   //             await AsyncStorage.removeItem('full_names');
//   //             await AsyncStorage.removeItem('email_address');

//   //             // Simulate some asynchronous operation
//   //             await new Promise((resolve) => setTimeout(resolve, 2000));

//   //             // Redirect to the login screen
//   //             navigation.navigate('Login');
//   //           } catch (error) {
//   //             console.error('Error during logout:', error);
//   //           } finally {
//   //             setIsLoading(false);
//   //           }
//   //         },
//   //       },
//   //     ],
//   //     { cancelable: false }
//   //   );
//   // };

// // export const LogoutDrawerLabel = ({ focused, onPress ,navigation}) => {
// //   const handlePress = () => {
// //     Alert.alert(
// //       "Logout",
// //       "Are you sure you want to logout?",
// //       [
// //         {
// //           text: "Cancel",
// //           style: "cancel",
// //         },
// //         {
// //           text: "Logout",
// //           onPress: async () => {
// //             await AsyncStorage.removeItem("userId");
// //             await AsyncStorage.removeItem("full_names");
// //             await AsyncStorage.removeItem("email_address");

// //             // Redirect to the login screen
// //             navigation.navigate("Login");
// //           },
// //         },
// //       ],
// //       { cancelable: false }
// //     );
// //   };

//   return (
//     <TouchableOpacity onPress={onPress || handlePress}>
//     <View style={styles.labelContainer}>
//       <Image
//         source={require('../assets/images/logout.png')}
//         style={styles.labelIcon}
//       />
//       <Text
//         style={[styles.labelText, focused ? styles.labelTextFocused : null]}
//       >
//         Logout
//       </Text>
//       {isLoading && <LoadingSpinner />}
//     </View>
//   </TouchableOpacity>
//   );
// };


// const styles = StyleSheet.create({
//   labelContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 5, // Add vertical margin to separate items
//     height: 20,
//     drawerActiveTintColor: "transparent",
//   },
//   labelContainerFocused: {
//     backgroundColor: "transparent",
//   },
//   labelIcon: {
//     width: 16,
//     height: 16,
//     marginRight: 8,
//   },
//   labelText: {
//     color: "rgba(0, 0, 0, 0.40)", // Text color
//     fontSize: 13, // Font size
//     fontWeight: "400", // Font weight
//     fontFamily: "Poppins-Regular", // Specify your font family
//     letterSpacing: 0.52, // Letter spacing
//     lineHeight: 18.7, // Default text color
//     marginLeft: 20,
//   },
//   labelTextFocused: {
//     color: "red", // Set the text color when focused
//   },
//   labelTextUnfocused: {
//     color: "pink", // Set the text color when not focused
//   },
//   horizontalLine: {
//     height: 1, // Line height
//     width: 202, // Line width
//     backgroundColor: "black", // Line color
//     // marginVertical: 5,
//     top: 10,
//     marginLeft: -10,
//     marginTop: 0,
//   },
// });
// export default {
//   ProfileDrawerLabel,
//   AddressesDrawerLabel,
//   HorizontalLine,
//   NotificationDrawerLabel,
//   SettingsDrawerLabel,
//   LogoutDrawerLabel,
//   HelpDrawerLabel,
// };

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const DrawerLabel = ({ icon, label, focused }) => (
  <View style={[styles.labelContainer, focused && styles.labelContainerFocused]}>
    <Image source={icon} style={styles.labelIcon} />
    <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
      {label}
    </Text>
  </View>
);

export const ProfileDrawerLabel = ({ focused }) => (
  <View style={styles.profileContainer}>
    <DrawerLabel
      icon={require('../assets/images/user.png')}
      label="Profile"
      focused={focused}
    />
  </View>
);

export const AddressesDrawerLabel = ({ focused }) => (
  <View style={styles.addressesContainer}>
    <DrawerLabel
     
      icon={require('../assets/images/location.png')}
      label="My Addresses"
      focused={focused}
    />
   
  </View>
);

export const NotificationDrawerLabel = ({ focused }) => (
  <DrawerLabel
    icon={require('../assets/images/notification.png')}
    label="Notification"
    focused={focused}
  />
);

export const SettingsDrawerLabel = ({ focused }) => (
  <DrawerLabel
    icon={require('../assets/images/setting.png')}
    label="Settings"
    focused={focused}
  />
);

export const HelpDrawerLabel = ({ focused }) => (
  <DrawerLabel
    icon={require('../assets/images/DrawerHelp.png')}
    label="Help"
    focused={focused}
  />
);

export const LogoutDrawerLabel = ({ focused, onPress }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            setIsLoading(true);

            try {
              // Clear all AsyncStorage data
              await AsyncStorage.clear();

              // Simulate some asynchronous operation
              await new Promise((resolve) => setTimeout(resolve, 2000));

              // Redirect to the login screen
              navigation.navigate('Login');
            } catch (error) {
              console.error('Error during logout:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity onPress={onPress || handlePress}>
      <View style={styles.labelContainer}>
        <Image
          source={require('../assets/images/logout.png')}
          style={styles.labelIcon}
        />
        <Text style={[styles.labelText, focused ? styles.labelTextFocused : null]}>
          Logout
        </Text>
        {isLoading && <LoadingSpinner />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(2),
    height: verticalScale(20),
    top: 0,
  },
  // labelContainerFocused: {
  //   backgroundColor: 'transparent',
  // },
  labelIcon: {
    width: scale(16),
    height: verticalScale(16),
    marginRight: scale(8),
  },
  labelText: {
    color: 'rgba(0, 0, 0, 0.40)',
    fontSize: scale(13),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    letterSpacing: scale(0.52),
    lineHeight: verticalScale(18.7),
    marginLeft: scale(20),
  },
  labelTextFocused: {
    color: 'red',
  },
  
  addressesContainer: {
    flexDirection: 'column',
    marginTop: scale(-10),
    paddingTop: verticalScale(10),
  },
  
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(2), // Adjust the margin for ProfileDrawerLabel
    height: verticalScale(20),
    marginBottom: verticalScale(-15),
  },
  
});

export default {
  ProfileDrawerLabel,
  AddressesDrawerLabel,
  NotificationDrawerLabel,
  SettingsDrawerLabel,
  HelpDrawerLabel,
  LogoutDrawerLabel,
};
