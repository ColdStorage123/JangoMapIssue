// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from "@react-navigation/drawer";

// const Logout = ({ navigation, ...props }) => {
//   const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

//   const handleLogout = () => {
//     // Implement your logout logic here
//     // For example, dispatch a logout action or call a logout function
//     console.log("Logout confirmed");
//     // After logout, close the confirmation modal
//     setShowLogoutConfirmation(false);
//   };

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />

//       {/* Your other Drawer items go here */}

//       {/* Logout confirmation modal */}
//       <Modal
//         visible={showLogoutConfirmation}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowLogoutConfirmation(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>
//               Are you sure you want to logout?
//             </Text>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 onPress={handleLogout}
//                 style={styles.confirmButton}
//               >
//                 <Text style={styles.confirmButtonText}>Yes</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => setShowLogoutConfirmation(false)}
//                 style={styles.cancelButton}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Button to trigger the confirmation modal */}
//       <TouchableOpacity onPress={() => setShowLogoutConfirmation(true)}>
//         <Text>Logout</Text>
//       </TouchableOpacity>
//     </DrawerContentScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   confirmButton: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   confirmButtonText: {
//     color: "white",
//   },
//   cancelButton: {
//     backgroundColor: "gray",
//     padding: 10,
//     borderRadius: 5,
//   },
//   cancelButtonText: {
//     color: "white",
//   },
// });

// export default Logout;
// LogoutScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Logout = ({ navigation }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, dispatch a logout action or call a logout function
    console.log("Logout confirmed");
    // Navigate to the initial screen or any other screen after logout
    navigation.navigate("Home"); // Replace 'Home' with the name of your initial screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Are you sure you want to logouts?</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default Logout;
