// import React, { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import { AppLoading } from 'expo';
// import * as Font from 'expo-font';

// export default function FontLoader({ children }) {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     const loadFonts = async () => {
//       try {
//         await Font.loadAsync({
//           'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
//           'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
//           // Add more fonts as needed
//         });

//         // Any additional setup for app initialization

//         // Simulate a delay
//         await new Promise(resolve => setTimeout(resolve, 2000));
//       } catch (error) {
//         console.warn(error);
//       } finally {
//         setAppIsReady(true);
//       }
//     };

//     loadFonts();
//   }, []);

//   if (!appIsReady) {
//     return <AppLoading />;
//   }

//   return <View style={{ flex: 1 }}>{children}</View>;
// }
