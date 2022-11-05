import React from "react";
import { Text, Stack, TextInput } from "@react-native-material/core";
import SelectDropdown from 'react-native-select-dropdown'

export const Home = ({ state, handleChange }) => {
    return (
        <Stack style={{ alignItems: 'center'}} spacing={20}>
            <Text variant="h4">Welcome to E-Mission!</Text>
            <Text variant="h7">Please enter your cars make, model, and year</Text>
            <SelectDropdown 
                buttonStyle={{ borderRadius: 15, borderWidth: 2, borderColor: '#4caf50', width: '80%'}}
                defaultButtonText="Please select a make"
            />
        </Stack>
    )
    
}