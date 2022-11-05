import React from "react";
import { Button, Flex, Text, View } from "@react-native-material/core";
import { Friends } from "./Friends";

export const History = ({ state, handleChange }) => {
    return (
        <Flex>
            <Text>History</Text>  
            <Button title="Change State of App" onPress={() => handleChange(<Friends />)}></Button>    
        </Flex>
    )
}