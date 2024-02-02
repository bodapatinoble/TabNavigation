/* eslint-disable no-alert */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import Welcome from '../screens/Settings';
import Categories from '../screens/Categories';
import Chat from '../screens/ChatScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Firebase_Auth} from '../FirebaseConfig';
import USerlist from '../screens/Userlist';

const Stack = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();

/*------------------------------------------- TAB BAR IMPLEMENTATION ----------------------------------------------------*/
function HomeScreen() {
  StatusBar.setBackgroundColor('#a29bfe');
  StatusBar.setBarStyle('light-content');
  return (
    <TabNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: true,
      }}>
      {/*------------------------------------------- HOME SCREEN ----------------------------------------------------*/}

      <TabNav.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Home',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#a29bfe', // Set your desired background color
            shadowColor: 'purple',
            shadowOffset: {
              width: 5,
              height: 15,
            },
            shadowOpacity: 1,
            shadowRadius: 25,
            elevation: 9,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Handle button press for Screen1
                alert('Well catch up later ');
                Firebase_Auth.signOut();
              }}
              style={{marginRight: 10}}>
              <FontAwesome name="logout" size={30} color="black" />
              <Text style={{marginRight: 0}}>LogOut</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={30} color={color} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                // Handle button press for Profile
                alert('Navigate to Profile');
                // You can navigate to the profile screen or perform any other action
                // Example: navigation.navigate('Profile');
              }}
              style={{marginLeft: 16}}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 15, // Adjust the border radius as needed
                  padding: 5,
                }}>
                <FontAwesome name="user-circle" size={35} color="#a29bfe" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      {/*------------------------------------------- Category SCREEN ----------------------------------------------------*/}
      <TabNav.Screen
        name="Category"
        component={Categories}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="list" size={25} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Handle button press for Screen1
                alert('Well catch up later ');
              }}
              style={{marginRight: 15}}>
              <Entypo name="add-to-list" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      {/*------------------------------------------- CHAT SCREEN ----------------------------------------------------*/}
      <TabNav.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTitle: 'Chat',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#a29bfe', // Set your desired background color
          },
          tabBarIcon: ({color, size}) => (
            <Entypo name="chat" size={30} color={color} />
          ),
        }}
      />
      {/*------------------------------------------- SETTINGS SCREEN ----------------------------------------------------*/}
      <TabNav.Screen
        name="Welcome"
        component={Welcome}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="chat" size={30} color={color} />
          ),
        }}
      />
    </TabNav.Navigator>
  );
}

function Tabs() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Welcome} />
        <Stack.Screen name="ChatScreen" component={Chat} />
        <Stack.Screen name="Userlist" component={USerlist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Tabs;
