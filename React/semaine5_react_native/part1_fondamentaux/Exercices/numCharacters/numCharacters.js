import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

const App = () => {

  const [sentence, setSentence ] = useState(null);

  const calcul = sentence => sentence.split(' ').map( w =>w && w.length ).join(' ');

  return (
    <View style={styles.container}>
      <View style={styles.blue}>
       <TextInput
        onChangeText={ sentence => setSentence(sentence) }
        defaultValue={sentence}
        />
       </View>
        { sentence && 
        <View style={styles.sky}>
          <Text> { /* sentence.split(' ').map( w => w && w.length ).join(' ') */ 
          calcul(sentence) 
          } </Text>
        </View>
        }
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    blue: {
        height: 50,
        backgroundColor: 'powderblue'
    },
    sky: {
        height: 50,
        backgroundColor: 'skyblue',
        padding: 10, fontSize: 42
    }
});