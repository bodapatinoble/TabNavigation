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
import {useRoute, useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();
  const {type} = route.params;
  console.log('Type:', type);
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
  return (
    <FlatList
      data={shoppingItems}
      keyExtractor={item => item.id}
      // renderItem={renderItem}
      renderItem={({item}) => {
        return (
          <>
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => {
                console.log('Navigating to FullScreen withr type:', item);
                navigation.navigate('FullDetailsScreen', {
                  item: item,
                });
              }}>
              <Image
                source={
                  item.data.image === null
                    ? require('../assets/imgpr.jpeg')
                    : {
                        uri: item.data.image,
                        cache: 'reload', // Optionally force reload the image
                      }
                }
                style={styles.image}
              />
              <View style={styles.details}>
                <Text style={styles.title}>{item.data.Title}</Text>
                <Text style={styles.rating}>
                  {item.data.TotalQuantity == item.data.Quantity
                    ? 'Stock Unavailable'
                    : `Only ${item.data.TotalQuantity} Left`}
                  {/*  (item.data.TotalQuantity < 5
                    ? `Only ${item.data.TotalQuantity} Left`
                 : 'InStock')}*/}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.price}>
                    Rs.{item.data.Price - item.data.Discount}
                  </Text>
                  <Text style={styles.discount}>
                    ₹{item.data.Discount} /- OFF
                  </Text>
                </View>
                <Text style={styles.description}>{item.data.Description}</Text>
              </View>
            </TouchableOpacity>
           {/*  <View style={styles.content}>
              // AddItem button 
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.buttontext}>Add Item</Text>
              </TouchableOpacity>
              // AddItemModal component 
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
            </View> */}
          </>
        );
      }}
      ListHeaderComponent={({items}) => {
        <View style={styles.content}>
          {
            <Text>
              {items == null ? 'Your List is in working progress' : 'No item '}
            </Text>
          }
        </View>;
      }}
      ListFooterComponent={
        <View style={styles.content}>
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
    width: 120,
    height: 120,
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
    flexDirection: 'row',
  },
  rating: {
    color: 'orange',
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    // marginBottom: 5,
    color: 'black',
    // backgroundColor: 'red',
    borderRadius: 5,
    // width: '35%',
    // textAlign: 'center',
    fontSize: 18,
  },
  discount: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'green',
    borderRadius: 5,
    marginLeft: 15,
    width: '45%',
    textAlign: 'center',
    padding: 5,
  },
  addButton: {
    backgroundColor: '#a29bfe',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
    width: '70%',
  },
  buttontext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
