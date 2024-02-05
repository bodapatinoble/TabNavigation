import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import navigation hook

import Entypo from 'react-native-vector-icons/Entypo';
const data = [
  {id: '1', iconName: 'tools', title: 'Gadgets'},
  {id: '2', iconName: 'medal', title: 'Jewelary'},
  {id: '3', iconName: 'aircraft-take-off', title: 'Bikes'},
  {id: '4', iconName: 'colours', title: 'Art'},
  {id: '5', iconName: 'suitcase', title: 'Cosmetics'},
  {id: '6', iconName: 'price-ribbon', title: 'Clothes'},

  // Add more items as needed
];

const CategoryCard = ({iconName, title}) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate('ListCategories');
  };
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPressHandler}>
      <Entypo name={iconName} size={50} color="white" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
const Categories = () => {
  const renderCategoryCard = ({item}) => (
    <CategoryCard iconName={item.iconName} title={item.title} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderCategoryCard}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a29bfe',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    elevation: 2, // for Android shadow
    shadowColor: '#a29bfe',
    // shadowColor: '#000', // for iOS shadow
    shadowOpacity: 0.2, // for iOS shadow
    shadowOffset: {width: 0, height: 2}, // for iOS shadow
    shadowRadius: 2, // for iOS shadow
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
export default Categories;
