import {React, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
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
import AddItemModal from './AddItemModal';

const ListCategories = () => {
  const [title, setTitle] = useState('');
  const [shoppingItems, setShoppingItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for controlling the visibility of the modal
  const route = useRoute();
  const {type} = route.params;
  // console.log('Type:', type);
  const addshoppingItem = async newItem => {
    console.log('Item added:', newItem);
    try {
      if (newItem && typeof newItem === 'object') {
        console.log('Item added:', newItem);
        const docRef = await addDoc(
          collection(Firebase_DB, 'shopping'),
          newItem,
        );
        console.log('Document written with ID: ', docRef.id);
        setTitle('');
        getShoppingItems();
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const getShoppingItems = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(Firebase_DB, 'shopping'));
      console.log('Query Snapshot:', querySnapshot);

      const items = [];
      querySnapshot.forEach(doc => {
        console.log('Document Data:', doc.data());
        if (doc.data().type === type) {
          items.push({id: doc.id, data: doc.data()});
        }
      });
      console.log('Items:', items);
      setShoppingItems(items);
    } catch (e) {
      console.error('Error fetching shopping items: ', e);
    }
  }, [type]);
  useEffect(() => {
    const fetchData = async () => {
      await getShoppingItems();
    };
    fetchData();
  }, [type, getShoppingItems]);

  const renderItem = ({item}) => (
    <TouchableOpacity key={item.id} style={styles.card}>
      <Image source={item.data.Image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.data.title}</Text>
        <Text style={styles.description}>description</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>Rating: {item.data.rating}</Text>
        </View>
        <Text> Title : {item.data.title}</Text>
        <Text style={styles.price}>{item.data.price}</Text>
        <Text style={styles.discount}>Discount: {item.data.discount}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={shoppingItems}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.content}>
          <Text>Your List is in working progress</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Type Anything"
            value={title}
            onChangeText={text => setTitle(text)}
            onSubmitEditing={() => {
              if (title.trim() !== '') {
                addshoppingItem();
              }
            }}
          />
          {/* AddItem button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttontext}>Add Item</Text>
          </TouchableOpacity>
          {/* AddItemModal component */}
          <AddItemModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAddItem={newItem => {
              newItem.type = type;
              console.log('Item added:', newItem);
              addshoppingItem(newItem);
              setModalVisible(false);
            }}
          />
        </View>
      }
    />
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
    alignItems: 'center',
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
    color: 'black',
  },
  description: {
    marginBottom: 5,
    color: 'black',
  },
  ratingContainer: {
    marginBottom: 5,
    color: 'black',
  },
  rating: {
    color: 'orange',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  discount: {
    color: 'green',
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttontext: {
    color: 'white',
    fontWeight: 'bold',
  },
});
