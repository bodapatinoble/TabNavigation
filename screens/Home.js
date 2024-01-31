import React from 'react';
import {Text, View, Button, StyleSheet, Dimensions, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from './Settings';
import Chat from './ChatScreen';
import userlist from './Userlist';
import Video from 'react-native-video';
const Home = ({navigation}) => {
  return (
    <View style={styles.homeBackground}>
      <Text style={styles.backgroundColorCard}>
        You are in JAgan Do nt feel sad
      </Text>
      <View style={styles.cardContainer}>
        <Video
          source={{
            uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          }} // Can be a URL or a local file.
          // ref={(ref: any) => {
          //   this.player = ref;
          // }}
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          audioOnly={false}
          controls={true}
          style={styles.backgroundVideo}
        />
      </View>
      <Text style={styles.backgroundColorCard}>
        You are in JAgan Do nt feel sad
      </Text>
      <View sty le={styles.cardContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/imgpr.jpeg')}
        />
        <Text style={styles.text}> Mini Bake</Text>
        <Text style={styles.Subtext}> You are in color Do nt feel sad </Text>
      </View>
      <Text style={styles.backgroundColorCard}>Video's List</Text>
      <View style={styles.cardContainer}>
        <Video
          source={{
            uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
          }} // Can be a URL or a local file.
          // ref={(ref: any) => {
          //   this.player = ref;
          // }}
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          audioOnly={false}
          controls={true}
          style={styles.backgroundVideo}
        />
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
    height: 220,
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
    height: 165,
    width: deviceWidth - 25,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
});
export default Home;
