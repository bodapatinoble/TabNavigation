import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

const UserDetailsModal = ({visible, onClose, item, extraFields}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>User Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailText}>
              {item.first_name} {item.last_name}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailText}>{item.email}</Text>
          </View>
          {extraFields &&
            Object.entries(extraFields).map(([key, value]) => (
              <View key={key} style={styles.detailItem}>
                <Text style={styles.detailLabel}>{key}:</Text>
                <Text style={styles.detailText}>{value}</Text>
              </View>
            ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            //  onPress={() => handleCall(item)}
              style={[styles.button, styles.callButton]}>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => handleChat(item)}
              style={[styles.button, styles.chatButton]}>
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.closeButton]}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
  },
  modalContent: {
    backgroundColor: '#fff', // White background
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5, // Add elevation for Android shadow
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark text color
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#666', // Medium gray text color
  },
  detailText: {
    flex: 1,
    color: '#333', // Dark text color
  },
  closeButton: {
    backgroundColor: 'red',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  callButton: {
    backgroundColor: 'green',
  },
  chatButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserDetailsModal;
