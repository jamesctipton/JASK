import React, { useEffect, useState } from "react";
import { Text, Stack, TextInput, Button, StyleSheet } from "@react-native-material/core";
import GlobeLogo from "../assets/GlobeLogo";
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from "react-native";
import { Easing } from "react-native";
import { Home3 } from "./Home3";



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

export const Home2 = ({ state, handleChange }) => {

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

    let model_data = new Array()
    const [makeValue, setMake] = useState("")
    useEffect(() => {
        const firstLoad = async () => {
            try {
                const savedMake = await AsyncStorage.getItem("@make");
                setMake(savedMake);
            } catch (err) {
                console.log(err);
            }
        };
        firstLoad();
    }, []);
    
    const setModel = async (car_model) => {
        try {
            const jsonValue = JSON.stringify(car_model)
            await AsyncStorage.setItem('@model', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    
   
    if(makeValue.length != 0)
    {
        fetch(url + '/model', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                make: makeValue.replace(/['"]+/g, '')
            })
        }).then((response) => 
            response.json()).then((json) => {
                for (let index = 0; index < json.length; index++) {
                    model_data.push(json[index])
                }
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
            <Text variant="h4" style={{ marginTop: 30 , textAlign: 'center'}}>Please enter your cars model now</Text>
            <SelectDropdown 
                data={model_data}
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText="Model"
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(selectedItem, index) => {
                    setModel(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
            />
            <Button title="Next" variant="contained" color="#4caf50" width={150} onPress={() => handleChange(<Home3 state={state} handleChange={handleChange} />)} />
        </Stack>
    )
}
