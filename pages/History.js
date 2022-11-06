import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, SafeAreaView, View } from "react-native";
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const data = [
    {id: '1', date: '11/2/2022', gas: 5, CO2: 5},
    {id: '2', date: '11/1/2022', gas: 4, CO2: 3},
    {id: '3', date: '11/3/2022', gas: 10, CO2: 2},
    {id: '4', date: '11/3/2022', gas: 3, CO2: 6},
    {id: '5', date: '11/2/2022', gas: 2, CO2: 1}
]
//console.log(data)

export const History = () => {
    const [page, setPage] = useState(0);
    const [pageItems, setPageItems] = useState(7);
    const [carValue, setCar] = useState({})

    useEffect(() => {
        const firstLoad = async () => {
            try {
                const savedCar = await AsyncStorage.getItem("@car")
                setCar(savedCar)
            } catch (err) {
                console.log(err);
            }
        };
        firstLoad();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <DataTable style={{ opacity: 100, borderWidth: 2, borderRadius: 4 }}>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title numeric>Gas Used</DataTable.Title>
                    <DataTable.Title numeric>CO2 Emitted</DataTable.Title>
                </DataTable.Header>
            </DataTable>
            {data.map((item, idx) => (
                <DataTable.Row key={idx} style={{ opacity: 100, borderRadius: 4, width: '100%'}}>
                    <DataTable.Cell>{item.id}</DataTable.Cell>
                    <DataTable.Cell>{item.date}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.gas}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.CO2}</DataTable.Cell>
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