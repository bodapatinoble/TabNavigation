import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const FullDetailsScreen = ({route}) => {
  const {description, price, image, type, title, NumOfAvailableItems} =
    route.params.item.data;
  console.log('afssdfsdfadsf534-----------------.........>>>>>',route.params.item.data);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={
          image === null
            ? require('../assets/gadgets.jpeg')
            : {uri: image, cache: 'reload'}
        }
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text style={styles.price}>
          NumOfAvailableItems: {NumOfAvailableItems}
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.addToCartButton]}
          onPress={() => console.log('Added to cart')}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buyNowButton]}
          onPress={() => console.log('Buying now')}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  discount: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: 'blue',
  },
  buyNowButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  space: {
    //padding: 20,
    marginBottom: 10, // Adjust this value as needed
  },
});
export default FullDetailsScreen;
