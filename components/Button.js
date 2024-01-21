import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress ,style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Customize the background color
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 1,
        alignItems: 'center',
     width: '90%',
  },
  buttonText: {
    color: 'white', // Customize the text color
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default Button;
