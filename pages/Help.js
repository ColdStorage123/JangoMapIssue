import * as React from "react";
import { Button, View, Text, SafeAreaView, StyleSheet } from "react-native";

const Help = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.AddressMode}>
        <Text style={styles.Heading}>Address Mode</Text>
        <Text style={styles.Alltext}>
          Understand the different type of addresses jango offers and how to
          apply them.
        </Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.AddressMode}>
        <Text style={styles.Heading}>Create Address</Text>
        <Text style={styles.Alltext}>
          Tips on how to create an address, be it a Jango address or an Alias
          address
        </Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.AddressMode}>
        <Text style={styles.Heading}>Share Address</Text>
        <Text style={styles.Alltext}>
          learn how to provide your address to your contacts.
        </Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.AddressMode}>
        <Text style={styles.Heading}>Navigation</Text>
        <Text style={styles.Alltext}>
          Get accurate paths from one address to another.
        </Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.AddressMode}>
        <Text style={styles.Heading}>Send Feedback</Text>
        <Text style={styles.Alltext}>
          Suggest improvement for wrong addresses and technical problem
        </Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    // flex: 1,
  },
  Alltext: {
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Inter",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 14.4,
    letterSpacing: 0.4,
    top: 20,
    paddingTop: 10,
  },
  Heading: {
    color: "#000",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 17.28,
    letterSpacing: 0.48,
    top: 20,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  AddressMode: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  line: {
    width: 360,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    top: 30,
    marginBottom: 10,
  },
});

export default Help;
