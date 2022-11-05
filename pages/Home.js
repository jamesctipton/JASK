import React from "react";
import { Text, Stack, TextInput, Button } from "@react-native-material/core";
import SelectDropdown from 'react-native-select-dropdown'
import GlobeLogo from "../assets/GlobeLogo";


export const Home = ({ state, handleChange }) => {
    return (
        <Stack style={{ alignItems: 'center', marginTop: -75}} spacing={20} >
            <GlobeLogo />
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