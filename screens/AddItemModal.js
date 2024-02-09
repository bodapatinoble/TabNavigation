import React, {useState} from 'react';
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Import ImagePicker

const AddItemModal = ({visible, onClose, onAddItem}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State to store the selected image URI

  // Function to handle image selection
  // const pickImage = () => {
  //   ImagePicker.launchImageLibrary({}, response => {
  //     if (!response.didCancel) {
  //       setImage(response.uri); // Set the selected image URI to the state
  //       console.log('Result----->>', response);
  //     }
  //   });
  // };
  const openCameraLib = async () => {
    console.log('Pres----->>');
    const result = await launchCamera();
    setImage(result?.assets[0].uri);
    console.log('Result----->>', result);
  };
  const pickImage = async () => {
    console.log('Pres----->>');
    const result = await launchImageLibrary();
    setImage(result?.assets[0].uri);
    console.log('Result----->>', result);
  };
  const handleAddItem = () => {
    // Validate input fields and add item
    if (
      title.trim() !== '' &&
      price.trim() !== '' &&
      description.trim() !== ''
    ) {
      onAddItem({title, price, description, image});
      // Clear input fields
      setTitle('');
      setPrice('');
      setDescription('');
      setImage(null);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Item</Text>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            {image ? (
              <Image source={{uri: image}} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imageButtonText}>Select Image</Text>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={text => setPrice(text)}
          />
          <TextInput
            style={[styles.input, {height: 100}]}
            placeholder="Description"
            multiline={true}
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    shadowColor: '#a29bfe',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#a29bfe',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#7e74e3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: '#a29bfe',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default AddItemModal;
