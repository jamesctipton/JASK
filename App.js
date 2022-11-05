import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View,
  Text,
} from 'react-native';
import { 
  Button,
  AppBar,
  IconButton,
  Spacer,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  let text;

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // text = 'Waiting...';
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }

  text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  } 

  return (
    <View style={{flex: 1}}>
      <AppBar 
        variant='bottom'
        color='#4caf50'
        leading={ <IconButton icon={<Icon name="menu" size={34} />} /> }
        trailing={ <IconButton icon={props => <Icon name="magnify" size={34} />} /> }
        style={{ position: "absolute", start: 0, end: 0, bottom: 0, height: 75, justifyContent: "center", padding: 15 }}>
      </AppBar>
      <View style={styles.container}>
        <Button 
          title="Refresh"
          onPress={getLocation()} // refreshes every
          // onPress={() => getLocation()} // only on click
        />
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3ffb9',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
