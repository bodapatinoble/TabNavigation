import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

const DashboardArticle = () => {
  // Example data for the list
  const [listData, setListData] = useState([
    {
      userId: 1,
      //  userImage: 'https://example.com/user1.jpg',
      userImage: require('../assets/imgpr.jpeg'),
      username: 'JohnDoe',
      postId: 1,
      postTitle: 'Example Post 1',
      postDescription: 'This is the description for Example Post 1',
      // postImage: 'https://example.com/post1.jpg',
      postImage: require('../assets/imgpr.jpeg'),
      postLink: 'https://gumroad.com/',
      timestamp: '2022-03-01T12:00:00Z',
    },
    {
      userId: 2,
      //   userImage: 'https://example.com/user2.jpg',
      userImage: require('../assets/imgpr.jpeg'),
      username: 'JaneSmith',
      postId: 2,
      postTitle: 'Example Post 2',
      postDescription: 'This is the description for Example Post 2',
      //  postImage: 'https://example.com/post2.jpg',
      postImage: require('../assets/imgpr.jpeg'),
      postLink: 'https://gumroad.com/',
      timestamp: '2022-03-02T10:30:00Z',
    },
    // Add more data as needed
  ]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.userInfo}>
        {/* <Image source={{uri: item.userImage}} style={styles.userImage} /> */}
        <Image style={styles.userImage} source={item.userImage} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.postTitle}</Text>
        <Text style={styles.postDescription}>{item.postDescription}</Text>
        {/* <Image source={{uri: item.postImage}} style={styles.postImage} /> */}
        <Image style={styles.postImage} source={item.postImage} />
        <TouchableOpacity
          onPress={() => handlePostClick(item.postLink)}
          style={styles.postLinkButton}>
          <Text style={styles.postLinkButtonText}>Read more</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handlePostClick = link => {
    // Handle post link click (e.g., navigate to the post link)
    console.log(link);
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        keyExtractor={item => item.postId.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 5,
  },
  postLinkButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  postLinkButtonText: {
    color: 'white',
  },
});

export default DashboardArticle;
