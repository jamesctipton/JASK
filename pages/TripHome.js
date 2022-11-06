import { Flex, Text, View, Button } from "@react-native-material/core";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { BarChart, LineChart } from "react-native-chart-kit";


let locationSubscription = null;
let locations = new Array();
let startTime = 0;
let stopTime = 0;
let fuelType = 1
let mpg = 25;

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
        return (gal * gasCoef) / 1000;
    }
    else if (fuelType == 2) //Diesel
    {
        return (gal * diesCoef) / 1000;
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


export const TripHome = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [update, setUpdate] = useState(false);
    const [tripGoing, toggleTrip] = useState(true);

    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
        })();
    }, []);

    const startTrip = () => {
        getLocation();
        setLocationListener();
        startTime = Date.now();
    }

    // setInterval(() => {
    //     getLocation();
    // }, 300000); // makes sure to update location every 5 minutes

    // 1667718894496
    // 1667719013
    let text;

    const stopTrip = () => {
        if(locationSubscription) {
            toggleTrip(!tripGoing);
            locationSubscription.remove();
            stopTime = Date.now();
        } else return;
    }

    const getCoords = () => {
        let justCoords = locations.map((val) => {
            return {latitude: val.coords.latitude, longitude: val.coords.longitude};
        })
        return justCoords;
    }

    const getSpeeds = () => {
        let justSpeeds = locations.map((val) => {
            if(val.coords.speed == -1) {
                return 0;
            } else {
                return val.coords.speed;
            }
        })
        return justSpeeds;
    }

    const updateArray = (loc) => {
        locations.push(loc);
        // console.log(locations);
        // console.log(locations.length);
        setUpdate(!update);
    }

    const setLocationListener = () => {

        (async () => {
        locationSubscription?.remove()

        locationSubscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation,
                distanceInterval: 0
            },
            (loc) => {
                setLocation(loc);
                updateArray(loc);
            });
        })();
    }

    const getLocation = () => {
        (async () => {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          updateArray(location);
        })();
    }

    normHist = (hist) => {
        let total = 0
        for(let i = 0; i < 9; i++)
        {
            total += hist[i];
        }
        for(let i = 0; i < 9; i++)
        {
            hist[i] = hist[i] / total;
        }
        return hist;
    }

    text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        // text = JSON.stringify(location);
        text = "";
        for (let index = 0; index < locations.length; index++) {
            text += locations[index].coords.speed + " ";
        }
    }

    setInterval(() => {
        text = JSON.stringify(location);
    }, 100);

    let time = (stopTime - startTime) / 1000;
    let mphData = toMph(getSpeeds());
    let hist = getHist(mphData);
    let avgMph = avgSpeed(mphData);
    let dist = getDistance(avgMph, time);
    let avgMpg = getMpg(hist, mpg);
    let gal = getGallons(avgMpg, dist);
    let emissions = getCarbonEm(gal, fuelType);
    let cost = getCost(gal, fuelType);
    let editHist = normHist(hist);

    return (
        <Flex>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
                    {
                    (location == null) ?
                    <Button style={styles.buttons} color="#4caf50" onPress={() => {startTrip()}} title="start trip" titleStyle={{fontSize: 36}} />
                        :
                    <MapView
                    style={styles.map} 
                    initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0041,
                    }}>
                        <Marker
                        coordinate={{ latitude : location.coords.latitude , longitude : location.coords.longitude }}
                        image={{uri: 'data:image/png;base64,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'}}
                        />
                        <Polyline
                            coordinates={getCoords()}
                            strokeColor="#38bbfc" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeWidth={6}
                        />
                    </MapView>
                    // <Text>{text}</Text>
                    
                }
                {/* <Button onPress={getLocation()} title="Refresh location" />  */}
                {(tripGoing) ?
                <Button style={styles.buttons} color="#4caf50" onPress={() => {stopTrip()}} title="End trip" titleStyle={{fontSize: 36}} />
                :
                <Flex style={{marginBottom: 200}}>
                    <Text style = {mystyle}>Trip Statistics</Text>
                    <Text></Text>
                    <Text style = {mystyle}>Average Speed: {avgMph.toFixed(2)} mph</Text>
                    <Text style = {mystyle}>Distance Traveled: {dist.toFixed(2)} mi</Text>
                    <Text style = {mystyle}>Trip MPG: {avgMpg.toFixed(2)} mpg</Text>
                    <Text style = {mystyle}>Fuel Used: {gal.toFixed(2)} gal</Text>
                    <Text style = {mystyle}>Emissions: {emissions.toFixed(2)} kg CO2</Text>
                    <Text style = {mystyle}>Cost: ${cost.toFixed(2)} </Text>
                    <Text> </Text>
                    <Text style = {mystyle}>Frequency at Speed (Mph) </Text>
                    <LineChart
                        data={{
                            labels: ['10', '20',  '30', '40', '50', '60', '70', '80', '90', '100'],
                            datasets: [
                            {
                                data: normHist(getHist(mphData)),
                            },
                            ],
                        }}
                        width={Dimensions.get('window').width - 16}
                        height={220}
                        withDots = {false}
                        fromZero = {true}
                        //xAxisSuffix={'Speed'}
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
                    {/* <Text>{text}</Text> */}
                </Flex>
                }
                
                </ScrollView>
            </SafeAreaView>
        </Flex>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3ffb9',
    flex: 1,
    width: (Dimensions.get('window').width),
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: (Dimensions.get('window').width) * 0.8,
    height: (Dimensions.get('window').height) * 0.5
  },
  scrollView: {
    backgroundColor: '#d3ffb9',
    marginHorizontal: 20,
    width: (Dimensions.get('window').width)
  },
  buttons: {
    marginVertical: 10,
    padding: 14,
    // width: '50%',
  }
});

const mystyle = {
    color: '#005005',
    fontWeight: 'bold',
    fontSize: 24
}