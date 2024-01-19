import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
function Chat() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers(prevUsers => [...prevUsers, ...data.data]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };
  const renderItem = ({item}) => (
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
            <Text style={styles.title}>
              {item.first_name} {item.last_name}
            </Text>
            <Text style={styles.timmings}>timmings</Text>
          </View>
          <Text style={styles.subTitle}>Email : {item.email}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
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
    borderRadius: 2,
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
