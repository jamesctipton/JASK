import React from "react";
import { Text, Stack, TextInput, Button } from "@react-native-material/core";
import SelectDropdown from 'react-native-select-dropdown'
import Logo from "../assets/Logo";
import { Animated } from "react-native";
import { Easing } from "react-native";

export const Home = ({ state, handleChange }) => {

    const animation = new Animated.Value(0);

    const rotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      });

    Animated.loop(
        Animated.timing(animation, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true })
    ).start();

    return (
        <Stack style={{ alignItems: 'center', marginTop: -75}} spacing={20} >
            <Animated.View style={{transform: [{rotate: rotation}] }} >
                <Logo />
            </Animated.View>
            <Text variant="h4" style={{ marginTop: 30 }}>Welcome to E-Mission!</Text>
            <Text variant="h7">Please enter your cars make, model, and year</Text>
            <SelectDropdown 
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                defaultButtonText="Please select your cars make"
            />
            <SelectDropdown 
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                defaultButtonText="Please select the model"
            />
            <SelectDropdown 
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%', marginBottom: 20}}
                defaultButtonText="Please select the year"
            />
            <Button title="Submit" variant="contained" color="#4caf50" width={150} onPress={() => {}} />
        </Stack>
    )
    
}