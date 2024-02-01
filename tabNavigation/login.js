import React, {useState} from 'react';
import Tabs from './tabs';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Firebase_Auth} from '../FirebaseConfig';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {createUserWithEmailAndPassword} from 'firebase/auth';

function loginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const uth = Firebase_Auth;

  const handleLogin = () => {
    // Implement your login logic here

    console.log('Username:', username);

    console.log('Password:', password);
    // Add authentication logic as needed
  };
  const auth = getAuth(); // Get the auth instance

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      );
      console.log(response);
      alert('Check your emails!');
    } catch (error) {
      console.log(error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        username,
        password,
      );
      console.log(response);
      alert('check your emails!');
    } catch (error) {
      console.log(error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a29bfe"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a29bfe"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'purple',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#a29bfe',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#a29bfe', // Text color
  },
  button: {
    backgroundColor: '#a29bfe',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
});
export default loginScreen;
