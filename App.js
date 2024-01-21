// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import WelcomeScreen from './Screens/Welcome';
// import SignUpScreen from './Screens/Signup';
// import Login from './Screens/login';
// import ForgetPassword from './Screens/ForgotPassword';
// import Menu from './components/Menu';
// import FirstPage from './pages/FirstPage';
// import SecondPage from './pages/SecondPage';
// import ThirdPage from './pages/ThirdPage';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
//         <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
//         <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
//         <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator screenOptions={{drawerStyle: {backgroundColor: '#f7f7f7',width: 262,height:724,
//         },headerStyle: {
//           backgroundColor: 'red',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//       <Drawer.Screen
//         name="FirstPage"
//         options={{
//           drawerLabel: 'Profile',
//           title: 'First Stack',
//         }}
//         component={FirstPage}
//       />
//       <Drawer.Screen
//         name="SecondPage"
//         options={{
//           drawerLabel: 'Second page Option',
//           title: 'Second Stack',
//         }}
//         component={SecondPage}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default App;

import React from "react";


import { NavigationContainer ,useNavigation} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LocationProvider } from './components/LocationContext.js';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
// StatusBar.setBackgroundColor('red');
import Splash from "./Screens/Splash.js";
import WelcomeScreen from "./Screens/Welcome";
import SignUpScreen from "./Screens/Signup";
import Login from "./Screens/login";
import ForgetPassword from "./Screens/ForgotPassword";
import ForgetPin from "./Screens/ForgotPin.js";
import CreateJangoAddress from "./Screens/CreateJangoAddress";
import MainLandingPageGetDirection from "./Screens/mainLandingpagegetDirection";
import MainRouteandDriveTime from "./Screens/mainRouteandDriveTime";
import Menu from "./components/Menu";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Addresses from "./pages/Addresses";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Logout from "./pages/Logout";
import CustomSideMenu from "./components/CustomSideMenu";
import CustomHeader from "./components/CustomHeader";
import { useFonts } from 'expo-font';
import FontLoader from './components/FontLoader.js'; 
import {
  ProfileDrawerLabel,
  AddressesDrawerLabel,
  HorizontalLine,
  NotificationDrawerLabel,
  SettingsDrawerLabel,
  HelpDrawerLabel,
  LogoutDrawerLabel,
} from "./components/CustomDrawerLabel.js";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
 


const StackNavigator = ({ navigation }) => (
  
  <Stack.Navigator initialRouteName="Splash" screenOptions={{
    headerShown: false,
  //   headerLeft: () => {
  //     return (
  //       <Image
  //       source={require('./assets/images/m')}
  //       style={styles.menuIcon}
  //     />
  //     );
  // },
  
  }}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="ForgetPin" component={ForgetPin} />


    
    <Stack.Screen
  name="CreateJangoAddress"
  component={CreateJangoAddress}
  options={({ navigation }) => ({
    ...commonHeaderOptions,
    headerShown: true,
    headerTitle: "Create A Jango Address",
    headerStyle: {
      ...commonHeaderOptions.headerStyle,
      height: 60, // Set the desired height for this screen
    },
    headerLeft: () => (
      <TouchableOpacity
        style={{ marginLeft: moderateScale(10), marginTop: verticalScale(5), marginBottom: verticalScale(5) }}
        onPress={() => navigation.navigate("mainLandingpagegetDirection")}
      >
        <Image
          source={require("./assets/images/back.png")}
          style={{ width: moderateScale(19), height: moderateScale(19), tintColor: "#FFF" }}
        />
      </TouchableOpacity>
    ),
  })}
/>



    {/* <Stack.Screen name="mainLandingpagegetDirection" component={MainLandingPageGetDirection} /> */}
    <Stack.Screen name="mainRouteandDriveTime" component={MainRouteandDriveTime} />
    <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
  </Stack.Navigator>
);

const commonHeaderOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#0000ee',
    height: moderateScale(60),
    position: 'absolute',
    top: 0,
    width: '100%', // Use '100%' for responsive width
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleStyle: {
    color: '#FFF',
    textAlignVertical: 'center',
    lineHeight: verticalScale(60),
    fontFamily: 'Inter',
    fontSize: moderateScale(16),
    fontWeight: '500',
    letterSpacing: moderateScale(0.64),
    lineHeight: moderateScale(23.04),
    flex: 1, // Add this line
  },
};


function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      drawerActiveTintColor={{ backgroundColor: 'red' }}
      drawerContent={(props) => <CustomSideMenu {...props} />}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: moderateScale(10) }}
            onPress={() => navigation.navigate('mainLandingpagegetDirection')}
          >
            <Image
              source={require('./assets/images/back.png')}
              style={{ width: moderateScale(19), height: moderateScale(19), tintColor: '#FFF', alignSelf:'center', }}
            />
          </TouchableOpacity>
        ),
        sceneContainerStyle: {
          backgroundColor: 'white',
        },
        drawerLabelStyle: {
          backgroundColor: 'transparent',
        },
      }}
      contentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'transparent',
        labelStyle: {
          fontSize: moderateScale(16), // Use moderateScale for responsive font size
        },
      }}
    >
      <Drawer.Screen
        name="mainLandingpagegetDirection"
        component={MainLandingPageGetDirection}
        options={{
          headerShown: false,
          drawerLabel: () => null,
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: ({ focused }) => <ProfileDrawerLabel />,
          ...commonHeaderOptions,
        }}
      />

      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          drawerLabel: ({ focused }) => null,
          ...commonHeaderOptions,
        }}
      />

      <Drawer.Screen
        name="My Address"
        component={Addresses}
        options={{
          drawerLabel: ({ focused }) => <AddressesDrawerLabel />,
          ...commonHeaderOptions,
        }}
      />

      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          drawerLabel: () => <NotificationDrawerLabel />,
          ...commonHeaderOptions,
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: ({ focused }) => <SettingsDrawerLabel />,
          ...commonHeaderOptions,
        }}
      />

      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerLabel: ({ focused }) => <HelpDrawerLabel />,
          ...commonHeaderOptions,
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerLabel: ({ focused, onPress, navigation }) => (
            <LogoutDrawerLabel onPress={onPress} focused={focused} />
          ),
          ...commonHeaderOptions,
          headerStyle: {
            ...commonHeaderOptions.headerStyle,
            height: moderateScale(90), // Use moderateScale for responsive height
          },
          activeBackgroundColor: 'red',
        }}
      />
    </Drawer.Navigator>
  );
}


// function DrawerNavigator({ navigation }) {
//   return (
   
//     <Drawer.Navigator
      
//       drawerActiveTintColor={{ backgroundColor: "red" }}
//       drawerContent={(props) => <CustomSideMenu {...props} />}
//       screenOptions={{

//         headerLeft: () => (
//           <TouchableOpacity
//             style={{ marginLeft: 10 }}
//             onPress={() => 
//               navigation.navigate("mainLandingpagegetDirection")}
//           >
//             <Image
//               source={require("./assets/images/back.png")}
//               style={{ width: 24, height: 24, tintColor: "#FFF", }}
//             />
//           </TouchableOpacity>
//         ),
//         // headerShown:false,
//         sceneContainerStyle: {
//           backgroundColor: "white", // Set the background color of the active screen to transparent
//         },
//         drawerLabelStyle: {
//           backgroundColor: "transparent", // Set the background color of the drawer labels to transparent
//         },
//       }}
//       contentOptions={{
//         activeBackgroundColor: "transparent", // Set the background color for the active item to transparent
//         activeTintColor: "transparent", // Set the text color for the active item to transparent
//         labelStyle: {
//           fontSize: 16,
//         },
//       }}
//     >

// <Drawer.Screen
//   name="mainLandingpagegetDirection"
//   component={MainLandingPageGetDirection}
//   options={{
//     headerShown: false,
//     drawerLabel: () => null,
//   }}
// />


//       <Drawer.Screen
   
// name="Profile"
// component={Profile}
// options={{
//   drawerLabel: ({ focused }) => <ProfileDrawerLabel />, // Use the custom drawer label component
//   headerTitle: "Profile", // Set a custom header title
//   headerTitleAlign: "center", // Set a custom header
//   headerStyle: {
//     backgroundColor: "#0000ee",
//     height: 60,
//     position: "absolute",
//     top: 0,
//     width: 360,
//     elevation: 5, // Simulates box-shadow
//   },
//   headerTitleStyle: {
//     color: "#ffffff",
//     fontFamily: "Inter", // Use the actual font family name here
//     fontSize: 16,
//     fontWeight: "500",
//     letterSpacing: 0.64,
//     lineHeight: 23,
//     alignSelf:'center', // Center the text
//   },
// }}
// />

// <Drawer.Screen
// name="EditProfile"
// component={EditProfile}
// options={{
//   drawerLabel: ({ focused }) => null, // Set drawerLabel to null to hide the label
//   headerTitle: "Edit Profile", // Set a custom header title
//   headerTitleAlign: "center",
//   headerStyle: {
//     backgroundColor: "#0000ee", // Same as the Profile screen
//     height: 60, // Adjusted height for vertical centering
//     // position: "absolute",
//     top: 0,
//     alignSelf: "center",
//     width: 360,
//     elevation: 5, // Simulates box-shadow
//     alignItems: 'center', // Center vertically
//     justifyContent: 'center', // Center horizontally
//   },
//   headerTitleStyle: {
//     color: "#ffffff",
//     fontFamily: "Inter", // Same as the Profile screen
//     fontSize: 16,
//     fontWeight: "500",
//     letterSpacing: 0.64,
//     lineHeight: 23,
//   },
// }}
// />


// <Drawer.Screen
// name="My Addresses"
// component={Addresses}
// options={{
//   drawerLabel: ({ focused }) => <AddressesDrawerLabel />, // Use the custom drawer label component
//   headerTitle: "My Addresses", // Set a custom header title
//   headerTitleAlign: "center",
//   headerStyle: {
//     backgroundColor: "#0000ee", // Same as the Profile screen
//     height: 60, // Adjusted height for vertical centering
//     // position: "absolute",
//     top: 0,
//     alignSelf: "center",
//     width: 360,
//     elevation: 5, // Simulates box-shadow
//     alignItems: 'center', // Center vertically
//     justifyContent: 'center', // Center horizontally
//   },
//   headerTitleStyle: {
//     color: "#ffffff",
//     fontFamily: "Inter", // Same as the Profile screen
//     fontSize: 16,
//     fontWeight: "500",
//     letterSpacing: 0.64,
//     lineHeight: 23,
//   },
// }}
// />



//       {/* Add a Group or Custom Drawer Item here */}

//       {/* <Drawer.Screen name="My Addresses" component={Addresses} /> */}
//       <Drawer.Screen
// name="Notification"
// component={Notification}
// options={{
//   drawerLabel: () => <NotificationDrawerLabel />, // Use the custom drawer label component
//   headerTitle: "Notification", // Set a custom header title
//   headerTitleAlign: "center",
//   headerStyle: {
//     backgroundColor: "#0000ee", // Same as the Profile screen
//     height: 60, // Adjusted height for vertical centering
//     position: "absolute",
//     top: 0,
//     alignSelf: "center",
//     width: 360,
//     elevation: 5, // Simulates box-shadow
//     alignItems: 'center', // Center vertically
//     justifyContent: 'center', // Center horizontally
//   },
//   headerTitleStyle: {
//     color: "#ffffff",
//     fontFamily: "Inter", // Same as the Profile screen
//     fontSize: 16,
//     fontWeight: "500",
//     letterSpacing: 0.64,
//     lineHeight: 23,
//   },
// }}
// />


// <Drawer.Screen
// name="Settings"
// component={Settings}
// options={{
//   drawerLabel: ({ focused }) => <SettingsDrawerLabel />, // Use the custom drawer label component
//   headerTitle: "Settings", // Set a custom header title
//   headerTitleAlign: "center",
//   headerStyle: {
//     backgroundColor: "#0000ee", // Same as the Profile screen
//     height: 60, // Adjusted height for vertical centering
//     position: "absolute",
//     top: 0,
//     alignSelf: "center",
//     width: 360,
//     elevation: 5, // Simulates box-shadow
//     alignItems: 'center', // Center vertically
//     justifyContent: 'center', // Center horizontally
//   },
//   headerTitleStyle: {
//     color: "#ffffff",
//     fontFamily: "Inter", // Same as the Profile screen
//     fontSize: 16,
//     fontWeight: "500",
//     letterSpacing: 0.64,
//     lineHeight: 23,
//   },
// }}
// />


// <Drawer.Screen
// name="Help"
// component={Help}
// options={{
//   drawerLabel: ({ focused }) => <HelpDrawerLabel />, // Use the custom drawer label component
//   headerTitle: "Help", // Set a custom header title
//   headerTitleAlign: "center",
//   headerStyle: {
//     backgroundColor: "#0000ee", // Same as the Profile screen
//     height: 60, // Adjusted height for vertical centering
//     position: "absolute",
//     top: 0,
//     alignSelf: "center",
//     width: 360,
//     elevation: 5, // Simulates box-shadow
//     alignItems: 'center', // Center vertically
//     justifyContent: 'center', // Center horizontally
//   },
//   headerTitleStyle: {
//     color: "#ffffff",
//     fontFamily: "Inter", // Same as the Profile screen
//     fontSize: 16,
//     fontWeight: "500",
//     letterSpacing: 0.64,
//     lineHeight: 23,
//   },
// }}
// />

// <Drawer.Screen
// name="Logout"
// component={Logout}
// options={{
//   drawerLabel: ({ focused, onPress, navigation }) => (
//     <LogoutDrawerLabel onPress={onPress} focused={focused} />
//   ),
//   headerTitle: "Logout", // Set a custom header title
//   headerStyle: {
//     backgroundColor: "#0000ee", // Same as the Profile screen
//     height: 90, // Adjusted height for vertical centering
//     position: "absolute",
//     top: 0,
//     alignSelf: "center",
//     width: 360,
//     elevation: 5, // Simulates box-shadow
//     alignItems: 'center', // Center vertically
//     justifyContent: 'center', // Center horizontally
//   },
//   headerTitleStyle: {
//     color: "#ffffff",
//     fontFamily: "Inter", // Same as the Profile screen
//     fontSize: 16,
//     fontWeight: "500",
//     letterSpacing: 0.64,
//     lineHeight: 23,
//   },
// }}
// />

//       {/* <Drawer.Screen
//         name="Logout"
//         component={Logout}
//         options={{
//           drawerLabel: ({ focused }) => <LogoutDrawerLabel />, // Use the custom drawer label component
//         }}
//       /> */}
       
//     </Drawer.Navigator>
//   );
// }

function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Helvetica': require('./assets/fonts/Helvetica.ttf'),
    'Inter': require('./assets/fonts/Inter.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'GenBkBasR': require('./assets/fonts/GenBkBasR.ttf'),
    'GenBkBasB': require('./assets/fonts/GenBkBasB.ttf'),
    'Gentium Book Basic': require('./assets/fonts/Gentium Book Basic.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LocationProvider>
    <NavigationContainer>
     
     <StackNavigator />
     {/* <DrawerNavigator/> */}
      </NavigationContainer>
      </LocationProvider>
  );



}
// const App = () => {
//   return (
//     <NavigationContainer>
//       <StackNavigator />
//       <DrawerNavigator />
//     </NavigationContainer>
//   );
// };
export default App;
