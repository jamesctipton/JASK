import { Flex, Text, View, Button } from "@react-native-material/core";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
// import * as TaskManager from 'expo-task-manager';

export const TripHome = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getLocation();
        setLocationListener();
    }, []);

    setInterval(() => {
        getLocation();
    }, 300000);

    let text;

    const setLocationListener = () => {
        Location.watchPositionAsync(
            {accuracy: Location.Accuracy.Balanced,
            timeInterval: 100},
            // (loc) => {setLocation(loc)}
            (loc) => {setLocation(loc)}
            );
    }

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

    setInterval(() => {
        text = JSON.stringify(location);
    }, 100);

    return (
        <Flex>
            {
            (location == null) ?
            <Text>{text}</Text>
                :
            // <MapView
            // style={styles.map} 
            // initialRegion={{
            // latitude: location.coords.latitude,
            // longitude: location.coords.longitude,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
            // }}>
            //     <Marker
            //     coordinate={{ latitude : location.coords.latitude , longitude : location.coords.longitude }}
            //     image={{uri: 'data:image/png;base64,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'}}
            //     />
            // </MapView>
            <Text>{text}</Text>
            
        }   
        </Flex>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3ffb9',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: (Dimensions.get('window').width) * 0.8,
    height: (Dimensions.get('window').height) * 0.5
  }
});

