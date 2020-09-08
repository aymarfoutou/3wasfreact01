import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const App = () => {
  const [sentence, setSentence] = useState('');

  const calcul = (sentence) => {
    /*
    * split la chaîne dans un tableau en fonction de l'espace ' ' 
    * map les mots et on calcule la longueur des mots que si ce n'est pas une chaîne de caractères vide.
    * join permet de rassembler les valeurs dans le tableau dans une chaîne de caractères
    */
    return sentence
        .split(' ')
        .map((w) => { if(w) return w.length })
        .join(' ');
  }

  const onPressReverse = () => {
    if (sentence) {
      setSentence(
        sentence
          .split(' ')
          .map( word  => word.split('').reverse().join('') )
          .join(' ')
      );
    }
  };

  const onClean = () => setSentence('');

  return (
    <View style={styles.container}>
      <Text>Number character(s)</Text>
      <View style={styles.blue}>
      {/** Pensez à réinitialiser sentence avec une chaîne de caractères vide , null posera des problèmes de rendu ici */}
        <TextInput
          style={styles.numberField}
          onChangeText={(sentence) => setSentence(sentence)}
          defaultValue={sentence}
        />
      </View>
      { sentence != '' && (
        <>
          <View style={[styles.sky, styles.numberField]}>
            <Text> {calcul(sentence)} </Text>
          </View>
          <View style={styles.numberField}>
            <Button
              onPress={onPressReverse}
              title="Reverse"
              color="#000"
              accessibilityLabel="Reverse sentense"
            />
          </View>
          <View style={styles.numberField}>
            <Button
              onPress={onClean}
              title="Clean"
              color="#000"
              accessibilityLabel="Clean sentense"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'papayawhip',
  },
  blue: {
    height: 50,
    backgroundColor: 'powderblue',
  },
  sky: {
    height: 50,
    backgroundColor: 'skyblue',
    padding: 5,
    fontSize: 42,
    width: 200,
    margin: 2,
  },
  numberField: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
  },
});
