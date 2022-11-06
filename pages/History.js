import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, SafeAreaView, Text } from "react-native";
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

let tempTrips = Array();

const data = [
    {time: 34.34, mpg: 14.5, emission: 5.1},
    {time: 145.22, mpg: 20.2, emission: 14.2},
    {time: 75.17, mpg: 19.1, emission: 9.7},
    {time: 13.29, mpg: 14.1, emission: 4.9},
    {time: 90.79, mpg: 19.9, emission: 12.1},
    {time: 25.78, mpg: 16.2, emission: 8.2}
]

export const History = () => {
    const [page, setPage] = useState(0);
    const [pageItems, setPageItems] = useState(7);
    const [tripsValue, setTrip] = useState(Array())

    useEffect(() => {
        const firstLoad = async () => {
            try {
                const savedTrips = await AsyncStorage.getItem("@trips")
                setTrip(savedTrips)
            } catch (err) {
                console.log(err);
            }
        };
        firstLoad();
    }, []);

    const getTrips = () => {
        let x = JSON.parse(tripsValue);
        return tempTrips;
    }

    //console.log('history',tripsValue)
    //console.log(typeof(tripsValue))

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="h1" style={{ marginBottom: 20, marginTop: 10, fontSize: 45, fontWeight: 'bold' }}>Trip Log</Text>
            <DataTable style={{ opacity: 100, borderWidth: 2, borderRadius: 4 }}>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title numeric>Trip Length</DataTable.Title>
                    <DataTable.Title numeric>Avg MPG</DataTable.Title>
                    <DataTable.Title numeric>CO2 Emitted</DataTable.Title>
                </DataTable.Header>
            </DataTable>
            {data.map((item, idx) => (
                <DataTable.Row key={idx} style={{ opacity: 100, borderRadius: 4, width: '100%' }}>
                    <DataTable.Cell>{idx}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.time}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.mpg}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.emission}</DataTable.Cell>
                </DataTable.Row>
            ))
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#d3ffb9',
      flex: 1,
      width: (Dimensions.get('window').width),
      alignItems: 'center',
    }
});