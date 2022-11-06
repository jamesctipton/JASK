import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Hist = () => {
    var histogram = new Array();
    // getData()
    for(let i = 1; i < 100; i++) {
        histogram.push(Math.random() * 100);
    }
    var trace = {
        x: x,
        type: 'histogram',
    };
    var data = [trace];
    return data;
}

const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }