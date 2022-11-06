import React from "react";
import { Flex, Text, View } from "@react-native-material/core";
import { Dimensions, StyleSheet } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

let inputData = [12.1,15.6,20.9,5.3,16.1,67.6,64.8,55.1,41.7,76.1,12.2,3,89,90,86,3,3,34,63,77,23,95,98, 102, 32,45,37,83,12];

const toMph = (inData) => {
    for(let i = 0; i < inData.length; i++) {
        inData[i] = inData[i] * 2.23694;
    }
    return inData;
}

const getHist = (inData) => {
    let histogram = [0,0,0,0,0,0,0,0,0,0];
    // getData()
    let index = 0;
    let value = 0;

    for(let i = 0; i < inData.length; i++) {
        value = Math.floor(inData[i])
        if(value > 105)
        {
            value = 105;
        }
        else if (value > 5)
        {
            index = ((value + 4) / 10);
            histogram[Math.floor(index - 1)] = histogram[Math.floor(index - 1)] + 1;
        }
        else if (value >= -1) {
            index = ((value + 11) / 10);
            histogram[Math.floor(index - 1)] = histogram[Math.floor(index - 1)] + 1;
        }
    }
    return histogram;
}

const avgSpeed = (inData) => {
    let total = 0; //Uses raw data and not histogram because of data loss to histogram
    for(let i = 0; i < inData.length; i++) {
        total += inData[i];
    }
    return (total / inData.length);
}

const getDistance = (mph, time) => {
    return (mph * (time / 3600));
}

const getMpg = (hist, mpg) => {
    //Fuel Effeciency calculated from research papers
    let fuelEffeciency = [0.353846154, 0.575, 0.741935484, 0.901960784, 1, 1, 0.985915493, 0.933333333, 0.843373494, 0.744680851];
    let avgMpg = 0;
    let total = 0;
    for(let i = 0; i < 9; i++)
    {
        total += hist[i]; //Get total amounts of reading
    }
    for(let i = 0; i < 9; i++)
    {
        avgMpg += (hist[i] * mpg * fuelEffeciency[i] / total);
    }
    return avgMpg;

}

const getGallons = (mpg, distance) => {
    return (distance / mpg);
}

const getCarbonEm = (gal, fuelType) => {
    let gasCoef = 8887; //8887 grams of CO_2 per gallon gasoline
    let diesCoef = 10180; //10180 grams of CO_2 per gallon diesel
    if(fuelType == 1) //Gasoline
    {
        return (gal * gasCoef / 1000)
    }
    else if (fuelType == 2) //Diesel
    {
        return (gal * diesCoef / 1000)
    }
    return -1; //error
}


const getCost = (gal, fuelType) => {
    let gasCoef = 3.797;
    let diesCoef = 5.39;
    if(fuelType == 1) //Gasoline cost
    {
        return (gal * gasCoef)
    }
    else if (fuelType == 2) //Diesel cost
    {
        return (gal * diesCoef)
    }
    return -1; //error
}

export const Friends = () => {
    let mpg = 25
    let inputData = [12.1,15.6,20.9,5.3,16.1,37.6,24.8,15.1,41.7,16.1,12.2,3,1,9, 8,3,3,3,6,7,2,9,9.6, 22.1, 32,4.9,37,8.3,12];
    let distance = 5
    let fuelType = 1
    let time = 360

    let mphData = toMph(inputData);
    let hist = getHist(mphData);
    let avgMph = avgSpeed(mphData);
    let dist = getDistance(avgMph, time);
    let avgMpg = getMpg(hist, mpg);
    let gal = getGallons(avgMpg, dist);
    let emissions = getCarbonEm(gal, fuelType);
    let cost = getCost(gal, fuelType);

    return (
        <Flex>
            <Text>Average Speed: {avgMph.toFixed(2)} mph</Text>
            <Text>Distance Traveled: {dist.toFixed(2)} mi</Text>
            <Text>Trip MPG: {avgMpg.toFixed(2)} mpg</Text>
            <Text>Fuel Used: {gal.toFixed(2)} gal</Text>
            <Text>Emissions: {emissions.toFixed(2)} kg CO2</Text>
            <Text>Cost: ${cost.toFixed(2)} </Text>
            <Text> </Text>
            <Text>Frequency at Speed (Mph) </Text>
            <LineChart
                data={{
                    labels: ['10', '20',  '30', '40', '50', '60', '70', '80', '90', '100'],
                    datasets: [
                    {
                        data: getHist(inputData),
                    },
                    ],
                }}
                width={Dimensions.get('window').width - 16}
                height={220}
                withDots = {false}
                fromZero = {true}
                withHorizontalLabels = {false}
                xAxisSuffix={'Speed'}
                chartConfig={{
                    backgroundGradientFrom: '#adcba1',
                    backgroundGradientTo: '#adcba1',
                    decimalPlaces: 2,
                    color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                    style: {borderRadius: 16},
                    
                }}
                bezier style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />     
        </Flex>
    )
}
