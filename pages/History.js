import React from "react";
import { View } from "react-native";

const data = [
    {id: '1', date: '11/2/2022', gas: 5, CO2: '5kg'},
    {id: '2', date: '11/1/2022', gas: 4, CO2: '3kg'},
    {id: '3', date: '11/3/2022', gas: 10, CO2: '2kg'},
    {id: '4', date: '11/3/2022', gas: 3, CO2: '6kg'},
    {id: '5', date: '11/2/2022', gas: 2, CO2: '2kg'}
]
console.log(data)

export const History = () => {
    return (
        <View style={{ flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' }}>
            {/*<DataTable
                data={data}
                colNames={['id', 'date', 'gas', 'co2']}
                colSettings={[
                    {name: 'id', type: COL_TYPES.INT, width: '10%'},
                    {name: 'date', type: COL_TYPES.STRING, width: '30%'},
                    {name: 'gas', type: COL_TYPES.INT, width: '15%'},
                    {name: 'co2', type: COL_TYPES.STRING, width: '40%' }
                ]}
            />*/}
            
        </View>
    )
}