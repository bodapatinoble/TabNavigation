import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
function Chat() {
  return (
    <View style={styles.content}>
      <View style={styles.ChatCard}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            style={styles.profileImg}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Title</Text>
            <Text style={styles.timmings}>timmings</Text>
          </View>
          <Text style={styles.subTitle}>SubTitle Title</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ChatCard}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            style={styles.profileImg}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>Title</Text>
            <Text style={styles.timmings}>timmings</Text>
          </View>
          <Text style={styles.subTitle}>SubTitle Title</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
  ChatCard: {
    height: 65,
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    borderRadius: 10,
    marginVertical: 5,
  },
  profileImg: {
    alignItems: 'center',
    padding: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'pink',
    borderRadius: 5,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'purple',
  },
  subTitle: {
    fontSize: 15,
  },
  timmings: {
    fontSize: 20,
    fontFamily: 'cursive',
    textAlign: 'right',
  },
  contentContainer: {
    flex: 1,
    padding: 7,
    paddingLeft: 1,
  },
  avatarContainer: {
    marginRight: 10,
    padding: 5,
  },
});

export default Chat;
