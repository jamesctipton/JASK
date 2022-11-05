import React, { useState } from 'react';
import { 
  StyleSheet, 
  View,
  Text,
} from 'react-native';
import { 
  AppBar,
  IconButton,
  HStack,
  Button,
} from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Home } from './pages/Home';
import { TripHome } from './pages/TripHome';
import { History } from './pages/History';
import { Friends } from './pages/Friends';


export default function App() {
  const [screen, setScreen] = useState(<TripHome state={screen} handleChange={setScreen} />);

  return (
    <View style={{flex: 1}}>
      <AppBar 
        variant='bottom'
        color='#4caf50'
        leading={ 
          <Button title="Start Trip" variant='outlined' color='black' trailing={<AntDesign name="car" size={30} color="black" />} onPress={() => setScreen(<TripHome />)}/> }
        trailing={
          <HStack spacing={10}>
            <IconButton icon={<AntDesign name="database" size={34} color="black" />} onPress={() => setScreen(<History />)} />
            <IconButton icon={<AntDesign name="team" size={38} color="black" />} onPress={() => setScreen(<Friends />)}/>  
            <IconButton icon={<Octicons name="home" size={38} color="black" />} onPress={() => setScreen(<Home state={screen} handleChange={setScreen} />)} /> 
          </HStack> 
          }
        style={{ position: "absolute", start: 0, end: 0, bottom: 0, height: 90, justifyContent: "center", paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
      </AppBar>
      <View style={styles.container}>
        {screen}
      </View>

    </View> 
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EAD6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
