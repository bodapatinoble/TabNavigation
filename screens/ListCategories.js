import {React, useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
  Firebase_Auth,
  getFirestore,
  Firebase_DB,
  collection,
  addDoc,
  getDocs,
} from '../FirebaseConfig';

const ListCategories = () => {
  const [title, setTitle] = useState('');
  const addshoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(Firebase_DB, 'shopping'), {
        title: title,
        isChecked: false,
      });
      console.log('Document written with ID: ', docRef.id);
      setTitle('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const getshoppingItems = async () => {
    const querySnapshot = await getDocs(collection(Firebase_DB, 'shopping'));
    querySnapshot.forEach(doc => {
      console.log(doc.id, doc.data());
    });
  };
  useEffect(() => {
    getshoppingItems();
  }, []);
  return (
    <View style={styles.content}>
      <Text>You List is in working progess</Text>
      <TextInput
        style={styles.input}
        placeholder="Type ANy thing "
        value={title}
        onChangeText={text => setTitle(text)}
        onSubmitEditing={addshoppingItem}
      />
    </View>
  );
};
export default ListCategories;
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
