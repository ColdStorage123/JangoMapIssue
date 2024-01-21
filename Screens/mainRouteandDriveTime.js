import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity,TextInput,searchQuery } from 'react-native';

const MainRouteandDriveTime = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Get Directions');

  const handleTabPress = (screenName, tabName) => {
    navigation.navigate(screenName);
    setSelectedTab(tabName); // Update the selected tab when a tab is pressed
  };
 const [isPressed, setIsPressed] = useState(false);
const [buttonStates, setButtonStates] = useState({
  globalMode: false,
  jangoMode: false,
  aliasMode: false,
});

    const handleButtonPress = (buttonName) => {
  const newButtonStates = { ...buttonStates };
  for (const key in newButtonStates) {
    newButtonStates[key] = key === buttonName;
  }
  setButtonStates(newButtonStates);
};

    
    const [isGlobalModeSelected, setGlobalModeSelected] = useState(false);
const [isJangoModeSelected, setJangoModeSelected] = useState(false);
const [isAliasModeSelected, setAliasModeSelected] = useState(false);


 const handleGlobalModePress = () => {
  setGlobalModeSelected(true);
  setJangoModeSelected(false);
  setAliasModeSelected(false);
};

const handleJangoModePress = () => {
  setGlobalModeSelected(false);
  setJangoModeSelected(true);
  setAliasModeSelected(false);
};

const handleAliasModePress = () => {
  setGlobalModeSelected(false);
  setJangoModeSelected(false);
  setAliasModeSelected(true);
  };
  
   const handleJangoPress = () => {
    // Define your onPress logic here
    console.log("Button pressed");
    // Add your desired functionality here
  };


   const handleAddressingPress = () => {
    // Define your onPress logic here
    console.log("Button pressed");
    // Add your desired functionality here
  };

    const handleFindRoutePress = () => {
    // Define your Find Route button functionality here
    // For example, you can navigate to a screen or perform an action
    console.log("Find Route button pressed");
  };

const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle the search query, e.g., navigate to Google Maps with the address
    // You can use the 'searchQuery' state to access the entered text
  };
  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/menuIcon.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedTab === 'Get Directions' ? styles.selectedTab : styles.tab}

          //   onPress={() => handleTabPress('GetDirections', 'Get Directions')}
          // >
          onPress={() => handleTabPress("mainLandingpagegetDirection", "Get Directions")}
          >
            <Text style={selectedTab === 'Get Directions' ? styles.selectedTabText : styles.tabText}>Get Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedTab === 'Route & Drive Time' ? styles.selectedTab : styles.tab}
          //   onPress={() => handleTabPress('RouteDriveTime', 'Route & Drive Time')}
          // >
          onPress={() =>
            handleTabPress("mainRouteandDriveTime", "Route & Drive Time")
            }  
          >
            <Text style={selectedTab === 'Route & Drive Time' ? styles.selectedTabText : styles.tabText}>Route & Drive Time</Text>
          </TouchableOpacity>
              </View>
              
              <View style={styles.buttoncontainer}>
                  
{/* 1rd button */}
                <TouchableOpacity
  style={[
    styles.editButton,
    buttonStates.globalMode ? styles.editButtonPressed : null,
  ]}
  onPress={() => handleButtonPress('globalMode')}
>
  <Text
    style={[
      styles.editButtonText,
      buttonStates.globalMode ? styles.editButtonTextPressed : null,
    ]}
  >
    Global Mode
  </Text>
</TouchableOpacity>

                   <View style={styles.space}>

<TouchableOpacity
  style={[
    styles.editButton,
    buttonStates.jangoMode ? styles.editButtonPressed : null,
  ]}
  onPress={() => handleButtonPress('jangoMode')}
>
  <Text
    style={[
      styles.editButtonText,
      buttonStates.jangoMode ? styles.editButtonTextPressed : null,
    ]}
  >
    Jango Mode
  </Text>
</TouchableOpacity>
</View>
                   <View style={styles.space1}>

 <TouchableOpacity
  style={[
    styles.editButton,
    buttonStates.aliasMode ? styles.editButtonPressed : null,
  ]}
  onPress={() => handleButtonPress('aliasMode')}
>
  <Text
    style={[
      styles.editButtonText,
      buttonStates.aliasMode ? styles.editButtonTextPressed : null,
    ]}
  >
    Alias Mode
  </Text>
</TouchableOpacity>

     </View>             

              </View>

              <View style={styles.searchBarContainer1}>
                  
                  <TextInput
                      
          style={styles.searchBar}
          placeholder="Your Location"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
  
        </View>

        <View style={styles.searchBarContainer2}>
                  
                  <TextInput
                      
          style={styles.searchBar}
          placeholder="End Destination"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
  
        </View>
        
        <View style={styles.doubleArrowContainer}>
          <Image
              source={require('../assets/images/doublearrow.png')}
              style={styles.doubleArrowIcon}
          /></View>
        

         <View style={styles.threeArrowContainer}>
          <Image
              source={require('../assets/images/threeicon.png')}
              style={styles.threeArrowIcon}
            /></View>

              <View style={styles.showTripContainer}>
                  <TouchableOpacity><Text style={styles.showTriptext}>Show Trip</Text></TouchableOpacity>
        </View>
        
<View   style={[
      styles.findRouteContainer, // Apply the 'editButtonText' style
    ]}>
<TouchableOpacity
  style={styles.editRouteButton}
  onPress={() => handleButtonPress('findRoute')} // Update the button press handler
>
  <Text
   style={styles.editRouteButtonText}
  >
    Find Route
  </Text>
</TouchableOpacity>
</View>
      </View>

      <View style={styles.footerContainer}>

        <TouchableOpacity style={styles.Jangobutton} onPress={handleJangoPress}>
         
          <Text style={styles.JangobuttonText}>Jango</Text>
           <Image
        source={require('../assets/images/locationnav.png')} // Replace with the actual path to your image
        style={styles.Jangolocationimage}
      />
        </TouchableOpacity>
        
         <TouchableOpacity style={styles.Adressbutton} onPress={handleAddressingPress}>
          <Text style={styles.AddressingbuttonText}>Addressing</Text>
           <Image
        source={require('../assets/images/locationaddress.png')} // Replace with the actual path to your image
        style={styles.Addresslocationimage}
      />
    </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headercontainer: {
    backgroundColor: '#0000eebf',
    height: 231,
    position: 'absolute',
    top: 30,
    width: 360,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  menuIcon: {
    height: 21,
    width: 34,
  },
  tab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'grey',
  },
  selectedTabText: {
    color: 'white',
    },
  
    buttoncontainer: {
        top: 20,
        left: 25,
         
        
  },
  
  editButton: {
   
         backgroundColor: '#0000ee', // You can replace this color with your desired color
    borderRadius: 4,
    height: 30,
    width: 103,
    // position: 'absolute',
    top: 0,
    left: 0,
    //  marginLeft: -90,
  },
  editButtonPressed: {
    backgroundColor: 'white', // Background color when pressed
  },
  editButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.32,
    lineHeight: 14.4,
      textAlign: 'center',
    padding: 4.5,
  },
  editButtonTextPressed: {
    color: '#0000ee', // Text color when pressed
    },
   space: {
       top:-30, // Adjust this height to control the spacing
       marginLeft: 110, //
    },
   space1: {
       top: -60, // Adjust this height to control the spacing
       marginLeft:220,
    },
     searchBarContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
         margin: 0,
         width: 272,
      
       top: -25,
    alignSelf: 'center',
  },
      searchBarContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
         margin: 0,
         width: 272,
      
       top: -15,
    alignSelf: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    height: 30,
    marginLeft: 10, // Adjust this value for spacing
      padding: 5,
   
  },
  searchButton: {
    backgroundColor: '#0000ee',
    // borderRadius: '0 4px 4px 0',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  spaceSearchbar: {
    gap: 65,
  },
  showTripContainer: {
    top: 10,
  },
   showTriptext: {
     top: 0,
     marginLeft: 25,
     color: '#ffffff',
    fontFamily: "Inter-Medium, Helvetica",
    fontSize: 10,
    fontWeight: '500', // Use a string value for fontWeight
    left: 0,
    letterSpacing: 0.4,
    lineHeight: 14.4,
    position: 'absolute', // Use 'absolute' for fixed positioning in React Native
    top: -75,
    whiteSpace: 'nowrap',
  },
  footerContainer: {
      backgroundColor: '#ffffff',
    height: 45,
    width: 360,
    position: 'absolute',
    top: 0,
    left: 0,
    top: 650,
  },
  Jangobutton: {
     backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 200,
    height:45,
    alignItems: 'center',
  },
  
  JangobuttonText: {
     color: '#ffffff',
    fontFamily: 'Inter-Medium', // Make sure to load the 'Inter-Medium' font
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.56,
    lineHeight: 20.2,
    textAlign: 'center',
    top:10,
  },
  Jangolocationimage: {
     width: 13,
    height: 17,
     top: -30,
  },
  Adressbutton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    width: 200,
     height:45,
    alignItems: 'center',
    marginLeft: 180,
   top: -45,
  },
    AddressingbuttonText: {
    color: '#0000eebf',
    fontFamily: 'Inter-Medium', // Make sure to load the 'Inter-Medium' font
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.56,
    lineHeight: 20.2,
      textAlign: 'center',
    top:10,
  },
    Addresslocationimage: {
     width: 23,
    height: 37,
     top: -30,
  },
  doubleArrowContainer: {
    top: -60,
    alignSelf: 'flex-end',
     marginRight: 20,
  },
  doubleArrowIcon: {
    height: 15,
    width: 16,
  },
   threeArrowContainer: {
     top: -90,
     alignSelf: 'flex-start',
     marginLeft: 30,
  },
  threeArrowIcon: {
    height: 59,
    width: 14,
  },
  findRouteContainer: {
    top: -80,
    alignSelf:'center',
    
  },
  editRouteButton: {
     // You can replace this color with your desired color
    borderRadius: 4,
    height: 30,
    width: 103,
    top: 0,
    left: 0,
    backgroundColor: '#ffffff',
  },
   editRouteButtonText: {
    color: '#0000eebf',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.32,
    lineHeight: 14.4,
      textAlign: 'center',
    padding: 4.5,
  },
});

export default MainRouteandDriveTime;