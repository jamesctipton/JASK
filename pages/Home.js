import React, { useEffect, useState } from "react";
import { Text, Stack, TextInput, Button, StyleSheet } from "@react-native-material/core";
import SelectDropdown from 'react-native-select-dropdown'
import GlobeLogo from "../assets/GlobeLogo";
import { Animated, View } from "react-native";
import { Easing } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Home2 } from "./Home2";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const dropdownStyle = {
    width: '80%',
    height: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
}
const url = "http://"+ ip + ":8888/car"

export const Home = () => {

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

    useEffect(() => {
        fetch(url + '/make').then((response) => 
        response.json()).then((json) => {
            for (let index = 0; index < json.length; index++) {
                make_data.push(json[index])
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }, [make_data, model_data]);

    const fetchModels = (car_make) => {
        car_data.make = car_make
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
                // model_data = [];
                for (let index = 0; index < json.length; index++) {
                    model_data.push(json[index]);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchYears = (car_make, car_model) => {
        car_data.model = car_model
        fetch(url + '/year', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                make: car_make,
                model: car_model
            })
        }).then((response) => 
            response.json()).then((json) => {
                for (let index = 0; index < json.length; index++) {
                    year_data.push(json[index]);
                }
                console.log(json);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchMPG = () => {
        fetch(url + '/full', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                year: car_data.year,
                make: car_data.make.replace(/['"]+/g, ''),
                model: car_data.model.replace(/['"]+/g, '')
            })
        }).then((response) => 
            response.json()).then(async (json) => {
                console.log(json)
                try {
                    const jsonValue = JSON.stringify(json)
                    await AsyncStorage.setItem('@car', jsonValue)
                } catch (e) {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <SafeAreaView style={{backgroundColor: '#F0EAD6'}}>
            <Stack style={{ alignItems: 'center', backgroundColor: '#F0EAD6' }} spacing={20} >
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
                    fetchModels(selectedItem)
                }}
                
            /> 
            <SelectDropdown 
                data={model_data}
                // disabled={(model_data.length) == 0 ? true : false}
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText="Model"
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(selectedItem, index) => {
                    fetchYears(car_data.make, selectedItem)
                }}
            />
            <SelectDropdown 
                data={year_data}
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText="Year"
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(selectedItem, index) => {
                    car_data.year = selectedItem;
                }}
            />
            
            <Button title="Submit" variant="contained" color="#4caf50" width={150} onPress={() => { fetchMPG() }} />
            </Stack>
        </SafeAreaView>
    )  
}
