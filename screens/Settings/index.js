import { Button, StyleSheet, Text, View } from 'react-native';
import ColorPicker from '../../components/ColorPicker';
import { useState } from 'react';
import LetterSize from './LetterSize';
import Language from './Language';

const Option = ({ option, onSelect }) => (
  <View style={styles.optionContainer}>
    <Text style={styles.optionText}>{option.text}</Text>
    <View style={styles.optionBottom}>
      <Text>Espanol</Text>
      <Button title='Modificar' onPress={() => onSelect(option)} />
    </View>
  </View>
);

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { text: 'Color general', component: <ColorPicker key='general' close={setSelectedOption} label='Selecciona el color general' /> },
    { text: 'Color de contenedores', component: <ColorPicker key='containers' close={setSelectedOption} label='Selecciona el color de los contenedores' /> },
    { text: 'Tiempo de contenedores', component: <LetterSize close={setSelectedOption} /> },
    { text: 'Tamaño de letra', component: <LetterSize close={setSelectedOption} /> },
    { text: 'Idioma', component: <Language close={setSelectedOption} /> }
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerOptions}>
        {options.map((option) => (
          <Option key={option.text} option={option} onSelect={handleOptionSelect} />
        ))}
      </View>
      {selectedOption && selectedOption.component}

    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1
  },
  containerOptions: {
    marginTop: '5%'
  },
  optionContainer: {
    margin: 10,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 100
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600'
  },
  optionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '5%'
  }
});
