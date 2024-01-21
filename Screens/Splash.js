// // Splash.js
// import React, { useEffect, useState } from 'react';
// import { View, Image, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as SplashScreen from 'expo-splash-screen';
// import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
// export default function Splash({ navigation }) {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         // Perform any tasks needed for app initialization here

//         // Simulate a delay for the splash screen
//         await new Promise(resolve => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//         SplashScreen.hideAsync(); // Hide the splash screen when the app is ready
//       }
//     }

//     prepare();
//   }, []);

//   if (!appIsReady) {
//     return (
//       <LinearGradient
//         colors={['#00E', '#75FFF7']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.container}
//       >
//         {/* You can customize the splash screen UI here */}
//         <Image source={require('../assets/images/Splash.png')} style={styles.logo} />
//       </LinearGradient>
//     );
//   }

//   // Once the app is ready, navigate to the desired screen
//   // In this example, it navigates to the "Welcome" screen
//   navigation.navigate('Welcome');

//   return null; // Render nothing if the app is ready (the splash screen is already hidden)
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7', // Add a background color if needed
//   },
//   logo: {
//     width: scale(96.607), // Use scale for responsiveness
//     height: verticalScale(130.35), // Use verticalScale for responsiveness
//     flexShrink: 0,
//     resizeMode: 'contain',
//   },
// });



// Splash.js
// Splash.js

import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import useUserData from '../components/useUserData';

const Splash = ({ navigation }) => {
  const { rememberToken } = useUserData();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Perform any tasks needed for app initialization here

        // Simulate a delay for the splash screen
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync(); // Hide the splash screen when the app is ready
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Check if the remember token is available
      if (rememberToken) {
        // User is logged in, navigate to the home screen or wherever needed
        navigation.navigate('DrawerNavigator'); // Update with your actual home screen
      } else {
        // User is not logged in, navigate to the login screen
        navigation.navigate('Login'); // Update with your actual login screen
      }
    }
  }, [appIsReady, rememberToken, navigation]);

  if (!appIsReady) {
    return (
      <LinearGradient
        colors={['#00E', '#75FFF7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        {/* You can customize the splash screen UI here */}
        <Image source={require('../assets/images/Splash.png')} style={styles.logo} />
      </LinearGradient>
    );
  }

  return null; // Render nothing if the app is ready (the splash screen is already hidden)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7', // Add a background color if needed
  },
  logo: {
    width: scale(96.607), // Use scale for responsiveness
    height: verticalScale(130.35), // Use verticalScale for responsiveness
    flexShrink: 0,
    resizeMode: 'contain',
  },
});

export default Splash;
