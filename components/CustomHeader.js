import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const CustomHeader = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/images/ep_back.png')} style={styles.backImage} />
      </TouchableOpacity> */}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#0000ee',
    height: moderateScale(60), // Use moderateScale for dynamic scaling
    width: moderateScale(360),
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: moderateScale(10),
  },
  backImage: {
    width: moderateScale(24), // Adjust the width and height using moderateScale
    height: moderateScale(24),
  },
  headerTitle: {
    color: '#ffffff',
    fontFamily: 'Inter-Medium',
    fontSize: moderateScale(16), // Use moderateScale for dynamic scaling
    fontWeight: '500',
    letterSpacing: moderateScale(0.64),
    lineHeight: moderateScale(23),
  },
});

export default CustomHeader;
