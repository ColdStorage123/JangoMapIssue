// useUserData.js

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useUserData = () => {
  const [userId, setUserId] = useState(null);
  const [fullNames, setFullNames] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [rememberToken, setRememberToken] = useState(null);

  useEffect(() => {
    const getStoredUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData Login');
    
        if (storedUserData !== null) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserId(parsedUserData.userId);
          setFullNames(parsedUserData.full_names);
          setEmailAddress(parsedUserData.email_address);
          setRememberToken(parsedUserData.remember_token);
        } else {
          console.error('User data is not stored in AsyncStorage.');
          // Handle the case where user data is not available in AsyncStorage
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    getStoredUserData();
  }, []);

  return { userId, fullNames, emailAddress, rememberToken };
};

export default useUserData;


// const useUserData = () => {
//   const [userId, setUserId] = useState(null);
//   const [fullNames, setFullNames] = useState(null);
//   const [emailAddress, setEmailAddress] = useState(null);

//   useEffect(() => {
//     const getStoredUserData = async () => {
//       try {
//         const storedUserData = await AsyncStorage.getItem('userData Login');
    
//         if (storedUserData !== null) {
//           const parsedUserData = JSON.parse(storedUserData);
//           setUserId(parsedUserData.userId);
//           setFullNames(parsedUserData.full_names);
//           setEmailAddress(parsedUserData.email_address);
//         } else {
//           console.error('User data is not stored in AsyncStorage.');
//           // Handle the case where user data is not available in AsyncStorage
//         }
//       } catch (error) {
//         console.error('Error retrieving user data from AsyncStorage:', error);
//       }
//     };
    
//     // const getStoredUserData = async () => {
//     //   try {
//     //     const storedUserId = await AsyncStorage.getItem('userId');
//     //     const storedFullNames = await AsyncStorage.getItem('full_names');
//     //     const storedEmailAddress = await AsyncStorage.getItem('email_address');

//     //     if (storedUserId !== null) {
//     //       setUserId(storedUserId);
//     //       setFullNames(storedFullNames);
//     //       setEmailAddress(storedEmailAddress);
//     //     } else {
//     //       console.error('User data is not stored in AsyncStorage.');
//     //       // Handle the case where user data is not available in AsyncStorage
//     //     }
//     //   } catch (error) {
//     //     console.error('Error retrieving user data from AsyncStorage:', error);
//     //   }
//     // };

//     getStoredUserData();
//   }, []);

//   return { userId, fullNames, emailAddress };
// };

// export default useUserData;
