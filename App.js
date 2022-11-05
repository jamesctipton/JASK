import React from 'react';
import { 
  StyleSheet, 
  View,
} from 'react-native';
import { 
  Button,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";




export default function App() {
  return (
      <AppBar 
        variant='bottom'
        color='#4caf50'
        title='E-Mission'
        leading={props => (
          <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
        )}
        trailing={props => (
          <IconButton
            icon={props => <Icon name="magnify" {...props} />}
            {...props}
          />
        )}
        style={{ position: "absolute", start: 0, end: 0, bottom: 0, height: 75, justifyContent: "center" }}>
      </AppBar>  
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3ffb9',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
