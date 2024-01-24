import React from 'react';
import {Text, View, Button, StyleSheet, Dimensions, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from './Settings';
import Chat from './ChatScreen';
import userlist from './Userlist';
const Home = ({navigation}) => {
  return (
    <View style={styles.homeBackground}>
      <Text style={styles.backgroundColorCard}>
        You are in JAgan Do nt feel sad
      </Text>
      <View style={styles.cardContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/imgpr.jpeg')}
        />
        <Text style={styles.text}> Mini Bake</Text>
        <Text style={styles.Subtext}> You are in color Do nt feel sad </Text>
      </View>
      <Button
        title="Go to Screen 1"
        onPress={() => navigation.navigate(Welcome)}
      />
    </View>
  );
};
const deviceWidth = Math.round(Dimensions.get('window').width);
const radius = 20;
const styles = StyleSheet.create({
  homeBackground: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c5ce7', // Set your desired background color
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    //color: '#7c3e40', // Set your desired text color
    borderRadius: 20,
  },
  Subtext: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    //color: '#7c3e40', // Set your desired text color
    borderRadius: 20,
  },
  cardContainer: {
    width: deviceWidth - 25,
    backgroundColor: '#a29bfe',
    height: 200,
    borderRadius: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  backgroundColorCard: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  imageStyle: {
    height: 150,
    width: deviceWidth - 25,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
});
export default Home;
