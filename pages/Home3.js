import React, { useEffect, useState } from "react";
import { Text, Stack, TextInput, Button, StyleSheet } from "@react-native-material/core";
import GlobeLogo from "../assets/GlobeLogo";
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from "react-native";
import { Easing } from "react-native";
import { TripHome } from "./TripHome";
import { ip } from "../constants";

const dropdownStyle = {
    width: '80%',
    height: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
}
const url = "http://" + ip + ":8888/car"

export const Home3 = ({ state, handleChange }) => {
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

    let year_data = new Array()
    var year = ""
    const [modelValue, setModel] = useState("")
    const [makeValue, setMake] = useState("")

    useEffect(() => {
        const firstLoad = async () => {
            try {
                const savedModel = await AsyncStorage.getItem("@model")
                setModel(savedModel)

                const savedMake = await AsyncStorage.getItem("@make")
                setMake(savedMake)
            } catch (err) {
                console.log(err);
            }
        };
        firstLoad();
    }, []);

    const submitCar = async (car_year) => {
        try {
            const jsonValue = JSON.stringify(car_year)
            await AsyncStorage.setItem('@year', jsonValue)
        } catch (e) {
            console.log(e)
        }

        fetch(url + '/full', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                year: car_year,
                make: makeValue.replace(/['"]+/g, ''),
                model: modelValue.replace(/['"]+/g, '')
            })
        }).then((response) => 
            response.json()).then(async (json) => {
                //console.log(json)
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
        handleChange(<TripHome state={state} handleChange={handleChange} />)
    }

    if(modelValue.length != 0)
    {
        //console.log("Got model", modelValue)
        fetch(url + '/year', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: modelValue.replace(/['"]+/g, '')
            })
        }).then((response) => 
            response.json()).then((json) => {
                for(let index = 0; index < json.length; index++) {
                    year_data.push(json[index])
                }
                //console.log(year_data)
            })
            .catch((e) => {
                console.log(e)
            })
        
    }

    return (
        <Stack style={{ alignItems: 'center', marginTop: -75}} spacing={20} >
            <Animated.View style={{transform: [{rotate: rotation}] }} >
                <GlobeLogo />
            </Animated.View>
            <Text variant="h4" style={{ marginTop: 30 , textAlign: 'center'}}>What year what your car made?</Text>
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
                    year = selectedItem
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
            />
            <Button title="Submit" variant="contained" color="#4caf50" width={150} onPress={() => submitCar(year)} />
        </Stack>
    )
}