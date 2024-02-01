import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from './Settings';
import Chat from './ChatScreen';
import userlist from './Userlist';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-snap-carousel';

const data = [
  {
    key: '4',
    type: 'carousel',
  },
  {
    key: '1',
    title: 'You are in Popular. Do not feel sad.',
    type: 'video',
    source:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    key: '2',
    title: 'You are in Noble. Do not feel sad.',
    type: 'image',
    imageSource: require('../assets/imgpr.jpeg'),
    text: 'Mini Bake',
    subText: 'You are in color. Do not feel sad.',
  },
  {
    key: '3',
    title: 'Video List',
    type: 'video',
    source:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  // Add the carousel item here
];
const renderItem = ({item}) => {
  if (item.type === 'video') {
    return (
      <View style={styles.homeBackground}>
        <Text style={styles.backgroundColorCard}>{item.title}</Text>
        <TouchableOpacity style={styles.cardContainer}>
          <Video
            source={{uri: item.sorce}}
            controls={true}
            style={styles.backgroundVideo}
          />
        </TouchableOpacity>
      </View>
    );
  } else if (item.type === 'image') {
    return (
      <View style={styles.homeBackground}>
        <Text style={styles.backgroundColorCard}>{item.title}</Text>
        <TouchableOpacity style={styles.cardContainer}>
          <Image style={styles.imageStyle} source={item.imageSource} />
          <Text style={styles.text}>{item.text}</Text>
          <Text style={styles.Subtext}>{item.subText}</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (item.type === 'carousel') {
    return (
      <View style={styles.carouselContainer}>
        <Carousel
          data={data} // your advertisement data
          renderItem={AdvertisementBanner}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 40}
        />
      </View>
    );
  }
};
const AdvertisementBanner = ({item}) => {
  return (
    <View style={styles.advertisementContainer}>
      <Image style={styles.advertisementImage} source={item.imageSource} />
      <Text style={styles.advertisementText}>{item.text}</Text>
      <Text style={styles.advertisementSubText}>{item.subText}</Text>
    </View>
  );
};

const Home = ({navigation}) => {
  return (
    <>
      <View style={styles.searchBarContainer}>
        <FontAwesome
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput placeholder="Search..." placeholderTextColor="#888" />

        {/* Additional search bar elements can be added here */}
      </View>
      {/* Advertisement Banner Carousel
      <Carousel
        data={data} // your advertisement data
        renderItem={AdvertisementBanner}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 40}
      /> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />

      <TouchableOpacity
        title="Go to Screen 1"
        onPress={() => navigation.navigate(Welcome)}
      />
    </>
  );
};
const deviceWidth = Math.round(Dimensions.get('window').width);
const radius = 20;
const styles = StyleSheet.create({
  homeBackground: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#6c5ce7', // Set your desired background color
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
    marginBottom: 20,

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
    marginTop: 20,
  },
  imageStyle: {
    height: 165,
    width: deviceWidth - 25,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
  searchBarContainer: {
    flexDirection: 'row', // Align icon and input horizontally
    alignItems: 'center', // Center vertically
    width: '97%',
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: '#fff', // Soft background color
    borderRadius: 20, // Rounded corners
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 15,
    shadowColor: '#a29bfe', // Soft shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android elevation
  },
  searchIcon: {
    marginRight: 10, // Spacing between icon and input field
  },
  advertisementContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  advertisementImage: {
    width: '100%',
    height: 75,
    borderRadius: 20,
    marginBottom: 10,
  },
  advertisementText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  advertisementSubText: {
    fontSize: 16,
  },
  // backgroundVideo: {
  //   height: '50%',
  //   width: '55%',
  // },
});
export default Home;
