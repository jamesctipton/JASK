import React, { useState } from "react";
import { Text, Stack, TextInput, Button, StyleSheet } from "@react-native-material/core";
import SelectDropdown from 'react-native-select-dropdown'
import GlobeLogo from "../assets/GlobeLogo";
import { Animated } from "react-native";
import { Easing } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const dropdownStyle = {
    width: '80%',
    height: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
}

const url = "http://10.7.69.231:8888/car"

export const Home = ({ state, handleChange }) => {

    const animation = new Animated.Value(0);
    const rotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });

    Animated.loop(
        Animated.timing(animation, {
            toValue: 1,
            duration: 20000,
            easing: Easing.linear,
            useNativeDriver: true })
    ).start();


    let make_data = new Array();
    let model_data = new Array();
    let year_data = new Array();
    let car_data = {
        make: "",
        model: "",
        year: ""
    }

    fetch(url + '/make').then((response) => 
        response.json()).then((json) => {
            for (let index = 0; index < json.length; index++) {
                make_data.push(json[index])
            }
        })
        .catch((error) => {
            console.error(error);
    });

    const fetchModels = (car_make) => {
        console.log(car_make)
        fetch(url + '/model', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({make: car_make})
         }).then((response) => 
            response.json()).then((json) => {
                console.log(json)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Stack style={{ alignItems: 'center', marginTop: -75}} spacing={20} >
            <Animated.View style={{transform: [{rotate: rotation}] }} >
                <GlobeLogo />
            </Animated.View>
            <Text variant="h4" style={{ marginTop: 30 }}>Welcome to E-Mission!</Text>
            <Text variant="h7">Please enter your cars make, model, and year</Text>
            <SelectDropdown 
                data={make_data}
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText="Make"
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(selectedItem, index) => {
                    car_data.make = selectedItem
                    fetchModels(selectedItem)
                }}
                
            /> 
            <SelectDropdown 
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText="Model"
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(e) => setCarSpecs({...carSpecs, model: e.target.value})}
            />
            <SelectDropdown 
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText="Year"
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(e) => setCarSpecs({...carSpecs, year: e.target.value})}
            />
            <Button title="Submit" variant="contained" color="#4caf50" width={150} onPress={() => {}} />
        </Stack>
    )  
}
