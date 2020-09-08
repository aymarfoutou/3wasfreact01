import React, { useReducer } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';

const initialState = {
  candidates: [
    { choice_1: 'Alan', choice_2: 'Juliette' }, // 0
    { choice_1: 'Phi', choice_2: 'Bernard' }, //  1
    { choice_1: 'Lisa', choice_2: 'Elise' }, // 2
    { choice_1: 'Cecilia', choice_2: 'Alice' }, // 3
  ],
  count: 0,
  choices: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHOICE':
      return {
        ...state,
        count: state.count + 1,
        choices: state.choices.concat(action.choice),
      };

    case 'RESET':

      return {
        ...state,
        count : 0,
        choices : []
      }

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const candidate = state.candidates[state.count];

  if (state.count < state.candidates.length)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.btnStyle}>
          <TouchableOpacity
            onPress={() =>
              dispatch({ type: 'CHOICE', choice: candidate.choice_1 })
            }>
            <Text>{candidate.choice_1}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnStyle}>
          <TouchableOpacity
            onPress={() =>
              dispatch({ type: 'CHOICE', choice: candidate.choice_2 })
            }>
            <Text>{candidate.choice_2}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state.choices}
        renderItem={({ item }) => (
          <View style={styles.btnStyle}>
            <Text style={{color : 'black'}}>{item}</Text>
          </View>
        )}
        keyExtractor={({ item, index }) => index}
      />
       <View style={ styles.btnStylReset}>
          <TouchableOpacity
            onPress={() =>
              dispatch({ type: 'RESET' })
            }>
            <Text style={ {color : 'white' } }>Reset</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  btnStyle: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'center',
    backgroundColor: '#f9c2ff',
  },
   btnStylReset : {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'center',
    backgroundColor: '#333'
  }
});
