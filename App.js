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
import { Home } from './pages/Home';
import { TripHome } from './pages/TripHome';
import { History } from './pages/History';
import { Friends } from './pages/Friends';
import { Profile } from './pages/Profile';


export default function App() {
  const [screen, setScreen] = useState(<Home state={screen} handleChange={setScreen} />);

  return (
    <View style={{flex: 1}}>
      <AppBar 
        variant='bottom'
        color='#4caf50'
        leading={ 
          <Button title="Start Trip" variant='outlined' color='black' trailing={<IconButton disabled icon={<AntDesign name="car" size={30} color="black" />} />} onPress={() => setScreen(<TripHome />)}/> }
        trailing={
          <HStack spacing={10}>
            <IconButton icon={<AntDesign name="database" size={34} color="black" />} onPress={() => setScreen(<History state={screen} handleChange={setScreen} />)} />
            <IconButton icon={<AntDesign name="team" size={38} color="black" />} onPress={() => setScreen(<Friends />)}/>  
            <IconButton icon={<AntDesign name="user" size={38} color="black" />} onPress={() => setScreen(<Profile />)} /> 
          </HStack> 
          }
        style={{ position: "absolute", start: 0, end: 0, bottom: 0, height: 85, justifyContent: "center", paddingLeft: 20, paddingRight: 20 }}>
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
