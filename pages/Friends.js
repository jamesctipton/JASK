import React from "react";
import { Flex, Text, View } from "@react-native-material/core";


export const Friends = () => {

    return (
        <Flex style={{justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 50, fontWeight: 'bold', marginRight: 'auto', marginLeft: 'auto'}}>Our E-Mission</Text>
            <Text></Text>
            <Text style={{fontSize: 20, marginRight: 10, marginLeft: 10}}>
            {'\t'}Our goal for E-Mission is to provide users with a means to understand how their daily driving habits impact the environment. One of the biggest factors in climate change is the emission of greenhouse gases. Since driving gas-powered vehicles contributes so much to these emissions, becoming cognizant of how our individual driving habits affect the planet is crucial for us to take steps to reach a happier, healthier planet. {'\n'}{'\t'}This app is designed to allow you to track these emissions one driving trip at a time. To get started, enter your car information (make, model, and year). Then once you're ready to start driving, hit the start button. You will be able to see a map of where you are driving. Once finished with your trip, hit the stop button to end tracking and view the statistics of your drive such as total emissions and fuel cost. {'\n'}{'\t'} You can navigate to trip logs to view the information about this trip, as well as an entire history of all your trips taken.
            </Text>
        </Flex>
    )
}
