import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, SafeAreaView, View } from "react-native";
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const History = () => {
    const [page, setPage] = useState(0);
    const [pageItems, setPageItems] = useState(7);
    const [tripsValue, setTrip] = useState([])

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

    console.log('history',tripsValue)

    return (
        <SafeAreaView style={styles.container}>
            <DataTable style={{ opacity: 100, borderWidth: 2, borderRadius: 4 }}>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title numeric>Trip Length</DataTable.Title>
                    <DataTable.Title numeric>Avg MPG</DataTable.Title>
                    <DataTable.Title numeric>CO2 Emitted</DataTable.Title>
                </DataTable.Header>
            </DataTable>
            {[tripsValue].map((item, idx) => (
                <DataTable.Row key={idx} style={{ opacity: 100, borderRadius: 4, width: '100%' }}>
                    <DataTable.Cell>{idx}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.time}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.mpg}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.emissions}</DataTable.Cell>
                </DataTable.Row>
            ))}
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