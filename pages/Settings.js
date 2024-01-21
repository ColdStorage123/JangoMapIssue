
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

const Settings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [contactAccessEnabled, setContactAccessEnabled] = useState(false);
  const [shareAddressEnabled, setShareAddressEnabled] = useState(false);
  const handleDeleteAccount = () => {
    // Perform any necessary logic before deleting the account

    // Show an alert to confirm deletion
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Perform the deletion action
            // For demonstration purposes, we'll just set a state to simulate deletion
            setAccountDeleted(true);
          },
        },
      ]
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Notification View */}
        <View style={styles.viewContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Notification</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={(value) => setNotificationEnabled(value)}
              style={styles.toggleButton1}
            />
          </View>
          <Text style={styles.description}>
            Enable notification to display over other apps
          </Text>
        </View>
        <View style={styles.line} />

        {/* Contact View */}
        <View style={styles.viewContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Contact</Text>
            <Switch
              value={contactAccessEnabled}
              onValueChange={(value) => setContactAccessEnabled(value)}
              style={styles.toggleButton2}
            />
          </View>
          <Text style={styles.description}>
            Allow Jango to access the contact list
          </Text>
        </View>
        <View style={styles.line} />

        {/* Share Address View */}
        <View style={styles.viewContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Share Address</Text>
            <Switch
              value={shareAddressEnabled}
              onValueChange={(value) => setShareAddressEnabled(value)}
              style={styles.toggleButton3}
            />
          </View>
          <Text style={styles.description}>
            Enable share the address with friends and contacts
          </Text>
        </View>
        <View style={styles.line} />

        {/* Language View */}
        <View style={styles.viewContainer}>
          <Text style={styles.heading}>Language</Text>
          <Text style={styles.description}>
            Choose the language of your choice
          </Text>
        </View>
        <View style={styles.line} />

        {/* Delete Account View */}
        <View style={styles.deleteAccountContainer}>
          <Text style={styles.heading}>Delete Account</Text>
          <Text style={styles.deletedescription}>
            Account will be deleted permanently
          </Text>
          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={styles.NotificationIconcontainer}
          >
            <Image
              source={require("../assets/images/delete_bucket.png")}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          {/* Add image here */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  viewContainer: {
    width: scale(360),
    padding: scale(10),
    alignItems: 'flex-start',
  },
  deleteAccountContainer: {
    width: scale(360),
    padding: scale(10),
    backgroundColor: 'rgba(248, 32, 32, 0.10)',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Inter',
    fontSize: scale(12),
    fontWeight: '400',
    color: '#000',
    fontStyle: 'normal',
    letterSpacing: scale(0.48),
    marginBottom: scale(5),
  },
  description: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: scale(14.4),
    letterSpacing: scale(0.4),
  },
  deletedescription: {
    color: '#860505',
    fontFamily: 'Inter',
    fontSize: scale(10),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: scale(14.4),
    letterSpacing: scale(0.4),
  },
  toggleButton1: {
    alignSelf: 'flex-end',
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    left: scale(220),
  },
  toggleButton2: {
    alignSelf: 'flex-end',
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    left: scale(245),
  },
  toggleButton3: {
    alignSelf: 'flex-end',
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    left: scale(200),
  },
  line: {
    width: scale(360),
    height: scale(1),
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  notificationIcon: {
    height: verticalScale(21),
    width: scale(21),
    top: verticalScale(-30),
    alignSelf: 'flex-end',
  },
  
});

export default Settings;
