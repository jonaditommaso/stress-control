import { Pressable, StyleSheet, Text, View } from 'react-native';
import ColorPicker from '../../components/ColorPicker';
import { useState } from 'react';
import LetterSize from './LetterSize';
import Language from './Language';

const Option = ({ option, onSelect }) => (
  <View>
    <Pressable onPress={() => onSelect(option)} style={styles.optionContainer}>
      <Text style={styles.optionText}>{option.text}</Text>
    </Pressable>
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
    <View>
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
  containerOptions: {
    marginTop: '10%'
  },
  optionContainer: {
    margin: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8
  },
  optionText: {
    fontSize: 20
  }
});
