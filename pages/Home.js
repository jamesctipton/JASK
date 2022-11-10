import React, { useEffect, useState } from "react";
import { Text, Stack, TextInput, Button, StyleSheet } from "@react-native-material/core";
import SelectDropdown from 'react-native-select-dropdown'
import GlobeLogo from "../assets/GlobeLogo";
import { Animated, View } from "react-native";
import { Easing } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

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


export const Home = ({navigation}) => {

    const [carMake, setCarMake] = React.useState('');
    const [carModel, setCarModel] = React.useState('');
    const [carYear, setCarYear] = React.useState('');

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

    useEffect(() => {
        fetch(url + '/make').then((response) => 
        response.json()).then((json) => {
            for (let index = 0; index < json.length; index++) {
                make_data.push(json[index])
            }
            make_data.sort();

            fetch(url + '/model', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({make: carMake})
             }).then((response) => 
                response.json()).then((json) => {
                    // console.log(json)
                    // model_data = [];
                    for (let index = 0; index < json.length; index++) {
                        model_data.push(json[index]);
                    }
                    model_data.sort();

                    fetch(url + '/year', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*', 
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            make: carMake,
                            model: carModel
                        })
                    }).then((response) => 
                        response.json()).then((json) => {
                            for (let index = 0; index < json.length; index++) {
                                year_data.push(json[index]);
                            }
                            year_data.sort();
                            // console.log(json);
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                })
                .catch((error) => {
                    console.log(error)
                })

        })
        .catch((error) => {
            console.log(error);
        });
    });

    const fetchMakes = () => {
        fetch(url + '/make').then((response) => 
        response.json()).then((json) => {
            for (let index = 0; index < json.length; index++) {
                make_data.push(json[index])
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const fetchModels = (car_make) => {
        setCarMake(car_make);
        setCarModel('');
        setCarYear('');
        fetch(url + '/model', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({make: car_make})
         }).then((response) => 
            response.json()).then((json) => {
                // console.log(json)
                // model_data = [];
                for (let index = 0; index < json.length; index++) {
                    model_data.push(json[index]);
                }
                model_data.sort();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchYears = (car_make, car_model) => {
        setCarModel(car_model);
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
                year_data.sort();
                // console.log(json);
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
                year: carYear,
                make: carMake,
                model: carModel
            })
        }).then((response) => 
            response.json()).then(async (json) => {
                // console.log(json)
                try {
                    const jsonValue = JSON.stringify(json)
                    await AsyncStorage.setItem('@car', jsonValue)
                    navigation.navigate("Start Trip");
                } catch (e) {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const resetDropDowns = () => {
        setCarMake('')
        setCarModel('')
        setCarYear('')
        make_data = model_data = year_data = [];
    }

    return (
        <SafeAreaView style={{backgroundColor: '#F0EAD6'}}>
            <Stack style={{ alignItems: 'center', backgroundColor: '#F0EAD6' }} spacing={20} >
                <Animated.View style={{transform: [{rotate: rotation}], marginTop: '2%' }} >
                    <GlobeLogo />
                </Animated.View>
                <Text variant="h4" style={{ marginTop: 30 }}>Welcome to E-Mission!</Text>
                <Text variant="h7">Please enter your cars make, model, and year</Text>
                <SelectDropdown 
                data={make_data}
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText={(carMake === '') ? "Make" : carMake}
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
                defaultButtonText={(carModel === '') ? "Model" : carModel}
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(selectedItem, index) => {
                    fetchYears(carMake, selectedItem)
                }}
            />
            <SelectDropdown 
                data={year_data}
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                dropdownStyle={dropdownStyle}
                defaultButtonText={(carYear === '') ? "Year" : carYear}
                renderDropdownIcon={isOpened => {
                    return <AntDesign name={isOpened ? "up" : "down"} size={18} color="black" />
                }}
                dropdownIconPosition={"right"}
                buttonTextStyle={{ marginLeft: 20 }}
                onSelect={(selectedItem, index) => {
                    setCarYear(selectedItem);
                }}
            />
            
            <Button title="Submit" variant="contained" color="#4caf50" width={150} onPress={() => { fetchMPG() }} />
            <Button title="Reset" variant="contained" color="#4caf50" width={150} onPress={() => { resetDropDowns() }} />
            </Stack>
        </SafeAreaView>
    )  
}
