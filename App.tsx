/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import Tabs from './tabNavigation/tabs';
import Login from './tabNavigation/login';
import {User, onAuthStateChanged} from 'firebase/auth';
import {Firebase_Auth} from './FirebaseConfig';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(Firebase_Auth, user => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return user ? <Tabs /> : <Login />;
}
export default App;
