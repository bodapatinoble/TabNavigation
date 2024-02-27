import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import filter from 'lodash.filter';
import UserDetailsModal from '../screens/UserDetailsModal'; // Import the UserDetailsModal component

const Welcome = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fulldata, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function contains(user, query) {
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

  const handleSearch = query => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fulldata, user => {
      return contains(user, formattedQuery);
    });
    setUsers(filteredData);
  };

  const extraFieldsMap = {
    1: {
      Role: 'Associate Analyst',
      Skills: 'Javascript, Python, .Net, SwiftUI frameworks',
      ProjectStatus: 'Client Name',
      ProjectHistory: 'Clients list',
    },
    2: {
      Role: 'Senior Analyst',
      Skills: 'Java, C#, SQL',
      ProjectStatus: 'Project Alpha',
      ProjectHistory: 'Project Beta',
    },
    3: {
      Role: 'Associate Analyst',
      Skills: 'Javascript, Python, .Net, SwiftUI frameworks',
      ProjectStatus: 'Client Name',
      ProjectHistory: 'Clients list',
    },
    4: {
      Role: 'Senior Analyst',
      Skills: 'Java, C#, SQL',
      ProjectStatus: 'Project Alpha',
      ProjectHistory: 'Project Beta',
    },
    5: {
      Role: 'Associate Analyst',
      Skills: 'Javascript, Python, .Net, SwiftUI frameworks',
      ProjectStatus: 'Client Name',
      ProjectHistory: 'Clients list',
    },
    6: {
      Role: 'Senior Analyst',
      Skills: 'Java, C#, SQL',
      ProjectStatus: 'Project Alpha',
      ProjectHistory: 'Project Beta',
    },
    // Add more fields for other IDs as needed
  };

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers(prevUsers => [...prevUsers, ...data.data]); // appending new users to the existing users array
      setFullData(prevData => [...prevData, ...data.data]); // appending new users to the existing full data array
      console.log('data --------->', [...users, ...data.data]);
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

  const renderItem = ({item}) => {
    console.log('Rendering item:', item);
    return (
      <TouchableOpacity
        onPress={() => showAlert(item)}
        style={styles.userContainer}>
        <Text style={styles.textStyle}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.textStyle}>Email: {item.email}</Text>
      </TouchableOpacity>
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showAlert = item => {
    // // console.log('Showing alert for:', item);
    // // Alert.alert('Hi ' + item.first_name);
    // const mergedItem = {...item, ...extraFieldsMap[item.id]};

    // // Construct alert message with merged item
    // const alertMessage = Object.entries(mergedItem)
    //   .map(([key, value]) => `${key}: ${value}`)
    //   .join('\n');
    // Alert.alert('User Details', alertMessage);
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={query => handleSearch(query)}
      />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        style={{marginTop: 10}} // Add margin between TextInput and FlatList
      />
      {showModal && (
        <UserDetailsModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          item={selectedItem}
          extraFields={extraFieldsMap[selectedItem.id]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: '#a29bfe',
    margin: 2,
    borderRadius: 10,
    shadowColor: '#a29bfe', // Soft shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  loadingContainer: {
    paddingVertical: 20,
  },
  searchBox: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: '#a29bfe',
    borderWidth: 4,
    borderRadius: 10,
    margin: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Welcome;
