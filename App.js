
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';

const apiURL = "https://reactnative.dev/movies.json"

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    fetch(apiURL)
    .then((response) => response.json())
    .then((json) => {
      setData(json.movies);
      setTitle(json.title);
      setDescription(json.description);
      
    })
    .catch((error) => alert(error))
    .finally(setLoading(false));
  },[]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator /> 
       ) : (
         <View>
         <Text>{title}</Text>
          <FlatList data={data} keyExtractor={({ id }, index) => id}
          renderItem={({item}) =>(
              <Text>{item.title}, {item.releaseYear}</Text>
          )}
      />
      <Text>{description}</Text>
      </View>
          )}
          
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;