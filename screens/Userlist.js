import {query} from 'firebase/firestore';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import filter from 'lodash.filter';

const USerlist = () => {
  const [users, setUsers] = useState([]);
  const [fulldata, setFullData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  function contains(user, query) {
    // Assuming user is an object with properties you want to search through
    for (let key in user) {
      if (
        typeof user[key] === 'string' &&
        user[key].toLowerCase().includes(query)
      ) {
        return true;
      }
    }
    return false;
  }
  const handleSearch = () => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fulldata, user => {
      return contains(user, formattedQuery);
    });
  };
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      // console.log(data);
      setUsers(prevUsers => [...prevUsers, ...data.data]);
      setFullData(data);
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
    <View style={styles.userContainer}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={query => handleSearch(query)}
      />
      <Text>
        {item.first_name} {item.last_name}
      </Text>
      <Text>Email: {item.email}</Text>
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
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loadingContainer: {
    paddingVertical: 20,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default USerlist;
