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
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
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
        title='E-Mission'
        leading={props => (
          <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
        )}
        trailing={props => (
          <IconButton
            icon={props => <Icon name="magnify" {...props} />}
            {...props}
          />
        )}
        style={{ position: "absolute", start: 0, end: 0, bottom: 0, height: 75, justifyContent: "center" }}>
      </AppBar>
      <View style={styles.container}>
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
