import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image,ScrollView} from 'react-native';
import Button from '../components/Button';
import { useFonts, GentiumBookBasic_400Regular } from '@expo-google-fonts/dev';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
const WelcomeScreen = ({ navigation }) => {

   const [fontsLoaded] = useFonts({
    GentiumBookBasic_400Regular,
  });

  if (!fontsLoaded) {
    // You can return a loading indicator here
    return null;
  }

  const handleLogin = () => {
    // Implement your button's logic here
    // You can navigate to another screen or perform any action on button press
    navigation.navigate('Login');
  };
  const handleSignUpPress = () => {
    // Navigate to the next screen when "Sign Up" is pressed
    navigation.navigate('Signup'); // Replace 'SignUpScreen' with the actual screen name
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
     
      <Image
    source={require('../assets/images/jango.png')} // Replace with the correct path to your image
    style={styles.image} // Apply custom styles to the image here
      /> 
       <Image
    source={require('../assets/images/backmain.png')} // Replace with the correct path to your image
    style={styles.backgroundmain} // Apply custom styles to the image here
      /> 
      <Image
    source={require('../assets/images/radiobtn.png')} // Replace with the correct path to your image
    style={styles.rbtn} // Apply custom styles to the image here
        />
        {/* <Image
    source={require('../assets/images/background.png')} // Replace with the correct path to your image
    style={styles.background_complete} // Apply custom styles to the image here
      /> 
       <Image
    source={require('../assets/images/character.png')} // Replace with the correct path to your image
    style={styles.character} // Apply custom styles to the image here
      /> 
       <Image
    source={require('../assets/images/device.png')} // Replace with the correct path to your image
    style={styles.device} // Apply custom styles to the image here
      />  */}
     
       
      <View style={styles.textContainer}>
      <Text style={[styles.welcomeText, { fontFamily: 'Gentium Book Basic' }]}>
      Enabling Street Addressing & GPS Navigation Anywhere On The Globe
    </Text>
       <Text style={styles.subText}>When there are no officials addresses create your personal address for GPS Navigation </Text>
     </View>
      <View style={styles.buttonContainer}>
        {/* <Button
          title="LOGIN"
          onPress={handleLogin}
          style={styles.loginButton} // Apply custom styles here
        /> */}
         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

          </View>
           {/* <TouchableOpacity onPress={handleSignUpPress}>
        <Text style={styles.signUpText}>
          DONT HAVE AN ACCOUNT?{'      '}
          <Text style={styles.signUpText1}>SIGN UP</Text>
        </Text>
      </TouchableOpacity> */}
           <View style={styles.signUpContainer}>
  <Text style={styles.signUpText}>DONT HAVE AN ACCOUNT?{"      "}</Text>
  <TouchableOpacity onPress={handleSignUpPress}>
    <Text style={styles.signUpText1}>SIGN UP</Text>
  </TouchableOpacity>
</View>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Customize the background color
  },

  //
  
  

  image: {

    borderRadius: moderateScale(21.5), // Half of the height (43px) to make it circular
    height: verticalScale(43),
    width: verticalScale(43),
    top: verticalScale(30),
  },
  backgroundmain: {
    width: moderateScale(297),
    height: verticalScale(258),
    overflow: 'hidden',
    top: verticalScale(100),
  },
  rbtn: {
     position: 'relative',
    top: verticalScale(140),
    left: 0,
    alignSelf: 'center',
    width: verticalScale(38),
    height: verticalScale(9),
  },
  character: {
    height: verticalScale(213),
    width: moderateScale(77),
  },
  textContainer: {
    marginTop: verticalScale(190),
  },



  welcomeText: {
    color: 'rgba(0, 0, 0, 0.70)',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: moderateScale(23.04),
    letterSpacing: moderateScale(0.64),
    textTransform: 'capitalize',
    marginTop:moderateScale(-40),
  },
  subText: {
    fontSize: moderateScale(12),
    marginTop: moderateScale(18),
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.70)',
    fontFamily: 'GenBkBasR',
    fontWeight: '400',
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
    marginTop: moderateScale(60),
    top: verticalScale(-80),
  },
  loginButton: {
    width: '100%',
    height: verticalScale(40),
    backgroundColor: '#0000ee',
    borderRadius: moderateScale(5),
    marginTop: moderateScale(50),
    color: '#000000b2',
    fontFamily: 'Helvetica',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    letterSpacing: moderateScale(0.64),
    lineHeight: moderateScale(23),
    textAlign: 'center',
    width: moderateScale(328),
  },
  signUpText: {
    top: verticalScale(-60),
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Helvetica',
    fontSize: moderateScale(12),
    fontWeight: '500',
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    alignSelf: 'flex-start',
    marginLeft: moderateScale(-70),
  },
  signUpText2: {
    color: '#00E',
    paddingBottom: verticalScale(30),
    top: verticalScale(-83),
    fontFamily: 'Inter',
    fontSize: moderateScale(14),
    fontWeight: '600',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.16),
    alignSelf: 'flex-end',
    left: moderateScale(70),
    fontStyle: 'normal',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: moderateScale(20.16),
    letterSpacing: moderateScale(0.56),
    textTransform: 'uppercase',
  },
  loginButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.2),
    textAlign: 'center',
    paddingTop: verticalScale(10),
    top: 0,
    left: 0,
  },
  signUpContainer: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center items vertically
    position: 'absolute', //
bottom: verticalScale(40),
  },
  
  signUpText: {
    // marginTop: verticalScale(30),
    // marginLeft: -moderateScale(90),
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Helvetica',
    fontSize: moderateScale(12),
    fontWeight: '500',
    letterSpacing: moderateScale(0.48),
    lineHeight: moderateScale(17.3),
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  signUpText1: {
    color: '#0000ee',
    // top: -verticalScale(20),
    // left: scale(130),
    fontFamily: 'Helvetica',
    // marginTop: verticalScale(30),
    fontSize: moderateScale(14),
    fontWeight: '600',
    letterSpacing: moderateScale(0.56),
    lineHeight: moderateScale(20.2),
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default WelcomeScreen;
