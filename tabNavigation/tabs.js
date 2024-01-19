import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, TouchableOpacity, Settings} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import Welcome from '../screens/Settings';
import Chat from '../screens/ChatScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Firebase_Auth} from '../FirebaseConfig';
import USerlist from '../screens/Userlist';

const Stack = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();
function HomeScreen() {
  return (
    <TabNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: true,
      }}>
      <TabNav.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Handle button press for Screen1
                alert('Well catch up later ');
                Firebase_Auth.signOut();
              }}
              style={{marginRight: 16}}>
              <Text>LogOut</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
      <TabNav.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="chat" size={30} color={color} />
          ),
        }}
      />
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
