import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

function CustomSideMenu(props) {
  
  console.log(props);
  const openDrawer = () => {
    props.navigation.openDrawer(); // Open the drawer
  };
  const closeDrawer = () => {
    props.navigation.closeDrawer(); // Close the drawer
  };

  return (
    <DrawerContentScrollView
      {...props}
      state={props.state}
      navigation={props.navigation}
      contentContainerStyle={styles.drawerContent}
    >
      {/* <DrawerContentScrollView
      {...props}
   
      contentContainerStyle={styles.drawerContent}
    > */}
      {/* Header with your logo */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/jango.png")}
          style={styles.logo}
        />
      </View>

      {/* Drawer content */}
      <DrawerItemList {...props} />

      {/* Close Drawer Icon */}
      <TouchableOpacity style={styles.closeIcon} onPress={closeDrawer}>
        <Image
          source={require("../assets/images/cross.png")}
          style={styles.closeIconImage}
        />
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#F8F8F8",
    height: moderateScale(724), // Use moderateScale for dynamic scaling
    position: "relative",
    transition: "all 0.2s ease",
    flex: 1,
  },
  header: {
    // backgroundColor: "#0000eebf",
    borderBottomRightRadius: moderateScale(194), // Use moderateScale for dynamic scaling
    borderTopRightRadius: 0,
    height: moderateScale(118), // Use moderateScale for dynamic scaling
    width: moderateScale(272), // Use moderateScale for dynamic scaling
    top: 0,
    left: 0,
    marginLeft: moderateScale(10), // Use moderateScale for dynamic scaling
  },
  logo: {
    height: moderateScale(57), // Use moderateScale for dynamic scaling
    width: moderateScale(57), // Use moderateScale for dynamic scaling
    top: moderateScale(10), // Use moderateScale for dynamic scaling
    alignItems: "center",
    marginLeft: moderateScale(100), // Use moderateScale for dynamic scaling
  },
  closeIcon: {
    position: "absolute",
    top: moderateScale(50), // Use moderateScale for dynamic scaling
    right: moderateScale(16), // Use moderateScale for dynamic scaling
  },
  closeIconImage: {
    width: moderateScale(10), // Use moderateScale for dynamic scaling
    height: moderateScale(10), // Use moderateScale for dynamic scaling
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    width: moderateScale(202), // Use moderateScale for dynamic scaling
    marginTop: moderateScale(-235), // Use moderateScale for dynamic scaling
    left: moderateScale(20), // Use moderateScale for dynamic scaling
  },
});

export default CustomSideMenu;
