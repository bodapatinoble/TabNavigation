import {React, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
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
  const [shoppingItems, setShoppingItems] = useState([]);
  const route = useRoute();
  const {type} = route.params;
  // console.log('Type:', type);
  const addshoppingItem = async () => {
    try {
      if (title.trim() !== '') {
        const docRef = await addDoc(collection(Firebase_DB, 'shopping'), {
          title: title,
          //  isChecked: false,
          type: type,
        });
        console.log('Document written with ID: ', docRef.id, docRef.data());
        setTitle('');
        getShoppingItems();
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const getShoppingItems = useCallback(async () => {
    const querySnapshot = await getDocs(collection(Firebase_DB, 'shopping'));
    const items = [];
    querySnapshot.forEach(doc => {
      if (doc.data().type === type) {
        items.push({id: doc.id, data: doc.data()});
      }
    });
    setShoppingItems(items);
  }, [type]);
  useEffect(() => {
    const fetchData = async () => {
      await getShoppingItems();
    };
    fetchData();
  }, [type, getShoppingItems]);
  return (
    <ScrollView>
      <View style={styles.content}>
        <Text>You List is in working progess</Text>
        {shoppingItems.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.Image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.data.title}</Text>
              <Text style={styles.description}>description</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>Rating: {item.data.title}</Text>
              </View>
              <Text> Title : {item.data.title}</Text>
              {/* Assuming 'name' is a property in your shopping item data */}
              <Text style={styles.price}>{item.data.price}</Text>
              {/* Assuming 'price' is a property in your shopping item data */}
              {/* Add other properties as needed */}
              <Text style={styles.discount}>Discount: {item.data.title}%</Text>
            </View>
          </View>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Type Any thing "
          value={title}
          onChangeText={text => setTitle(text)}
          onSubmitEditing={() => {
            if (title.trim() !== '') {
              addshoppingItem();
            }
          }}
        />
      </View>
    </ScrollView>
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
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#a29bfe',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  ratingContainer: {
    marginBottom: 5,
  },
  rating: {
    color: 'orange',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discount: {
    color: 'green',
  },
});
