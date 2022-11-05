import { Flex, Text, View, Button } from "@react-native-material/core";
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export const TripHome = () => {

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
        <Flex>
            <Text>{text}</Text>      
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
});

