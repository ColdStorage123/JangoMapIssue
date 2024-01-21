import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch and set notifications from your data source
    // You can filter and organize them into today and yesterday
    const todayNotifications = [
      { message: 'You have successfully created the address 75 Borstal Street', date: '2023-08-12T10:00:00' },
      { message: 'Notification 2', date: '2023-08-12T15:30:00' },
    ]; // Replace with your data
    const yesterdayNotifications = [
      { message: 'Notification 3', date: '2023-08-11T08:45:00' },
      { message: 'Notification 4', date: '2023-08-11T20:15:00' },
    ]; // Replace with your data
    setNotifications({ today: todayNotifications, yesterday: yesterdayNotifications });
  }, []);

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.sectionHeader}>Today</Text>
      <FlatList
        data={notifications.today}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
              <Text style={styles.notificationText}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
      <View>
      <Text style={styles.sectionHeader}>Yesterday</Text>
      <FlatList
        data={notifications.yesterday}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
              <Text style={styles.notificationText}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#F8F8F8',
  },
  sectionHeader: {
    
      color: '#000',
      fontFamily: 'Inter',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 17.28, // This is equivalent to 144% of 12px
      letterSpacing: 0.48,
   
  },
  notificationContainer: {
    width: 328,
    height: 76,
    flexShrink: 0,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  notificationDate: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontFamily: 'Inter',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 11.52,
    letterSpacing: 0.32,
  },
  notificationText: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontFamily: 'Inter',
    fontSize: 9,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 12.96,
    letterSpacing: 0.36,
  },
});

export default Notification;
