// AliasAddressModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const AliasAddressModal = ({ visible, onClose, title, message, buttonText, onPress,addressFound }) => (
  <Modal
    transparent
    visible={visible}
    animationType="slide"
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.messageText}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image
            source={require("../assets/images/close.png")}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 338,
    height:206,
  },
  titleText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 17.28,
  },
  messageText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'GenBkBasB',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20.16,
    letterSpacing: 0.56,
   
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 8.45,
    height: 8.45,
  },
    button: {
        width: 162,
        height: 35,
    //   marginTop: -15,
    backgroundColor: 'blue',
     padding: 5,
    borderRadius: 5,
        alignItems: 'center',
      top:20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
      fontFamily: 'GenBkBasB',
      alignItems: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21.6,
    letterSpacing: 0.6,
  },
});

export default AliasAddressModal;
