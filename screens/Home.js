import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from './Settings';
import Chat from './ChatScreen';
import userlist from './Userlist';
const Home = ({navigation}) => {
  return (
    <View style={styles.homebckgrnd}>
      <Text style={styles.text}> You are in JAgan Do nt feel sad </Text>
      <Button
        title="Go to Screen 1"
        onPress={() => navigation.navigate(Welcome)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  homeBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1', // Set your desired background color
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50', // Set your desired text color
  },
});
export default Home;
