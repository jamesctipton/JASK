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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './pages/Home';
import { TripHome } from './pages/TripHome';
import { History } from './pages/History';
import { Friends } from './pages/Friends';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator()

function App() {
  const [screen, setScreen] = useState(<TripHome state={screen} handleChange={setScreen} />);

  return (
    <NavigationContainer>
      <Tab.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#4caf50', },
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#000000'
          }}
          sceneContainerStyle={{
            flex: 1,
            backgroundColor: '#F0EAD6'
          }}>
        <Tab.Screen name='Home' component={Home}/>
        <Tab.Screen name='Start Trip' component={TripHome} />
        <Tab.Screen name="Mission" component={Friends} />
        <Tab.Screen name='History' component={History} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EAD6',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;