import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
const FullDetailsScreen = ({route}) => {
  const {description, price, image, type, title, NumOfAvailableItems} =
    route.params.item.data;
  console.log(
    'afssdfsdfadsf534-----------------.........>>>>>',
    route.params.item.data,
  );
  const [numOfAvailableItems, setNumOfAvailableItems] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const animatedValue = new Animated.Value(0);

  const decreaseAvailableItems = () => {
    if (numOfAvailableItems > 0) {
      setNumOfAvailableItems(
        numOfAvailableItems - 1 == 0 ? 1 : numOfAvailableItems - 1,
      );
    }
  };

  const increaseAvailableItems = () => {
    if (numOfAvailableItems == NumOfAvailableItems) {
    } else {
      setNumOfAvailableItems(numOfAvailableItems + 1);
    }
  };
  const openModal = () => {
    setModalVisible(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <>
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
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Price: ${price}</Text>
            <Text style={styles.discount}>Price: ${price}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.availabilityContainer}>
            Remaining Items {NumOfAvailableItems - numOfAvailableItems} Left
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseAvailableItems}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{numOfAvailableItems}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseAvailableItems}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.addToCartButton]}
            onPress={
              //() =>
              //   console.log(NumOfAvailableItems - numOfAvailableItems)
              openModal
            }>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buyNowButton]}
            onPress={() => console.log('Buying now')}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
      <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={closeModal}>
          <Animated.View
            style={[
              styles.modalContainer,
              {transform: [{translateY: translateY}]},
            ]}>
            <Text style={styles.modalText}>Item added to cart!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
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
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 5,
  },
  discount: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'green',
    marginLeft: 15,
    textAlign: 'center',
    padding: 5,
    width: '30%',
    height: 30,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: 'blue',
  },
  buyNowButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  space: {
    //padding: 20,
    marginBottom: 10, // Adjust this value as needed
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  availability: {
    fontSize: 16,
    marginRight: 10,
    color: 'red',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    width: '30%',
  },
  quantityButton: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    color: 'red',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'red',
  },
  closeButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default FullDetailsScreen;
