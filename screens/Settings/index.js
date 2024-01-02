import { StyleSheet, Text, View } from 'react-native';
import ColorPicker from '../../components/ColorPicker';
import { useState } from 'react';
import LetterSize from './LetterSize';
import Language from './Language';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { LANGUAGES, getStressColors } from '../../utils/constants';
import PrimaryButton from '../../components/PrimaryButton';
import i18n from '../../i18next';
import { useTranslation } from 'react-i18next';

const Option = ({ option, onSelect, valueSetted }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.optionContainer}>
      <Text style={styles.optionText}>{option.text}</Text>
      <View style={styles.optionBottom}>
        <Text>{valueSetted ?? 'derf'}</Text>
        <PrimaryButton title={t('modify')} onChange={() => onSelect(option)} width={100} />
      </View>
    </View>
  );
};

const Settings = ({ stress }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { t } = useTranslation();

  const options = [
    { text: 'Color general', component: <ColorPicker key='general' close={setSelectedOption} label='Selecciona el color general' /> },
    { text: 'Color de contenedores', component: <ColorPicker key='containers' close={setSelectedOption} label='Selecciona el color de los contenedores' /> },
    { text: 'Tiempo de contenedores', component: <LetterSize close={setSelectedOption} /> },
    { text: 'Tamaño de letra', component: <LetterSize close={setSelectedOption} /> },
    { text: t('language'), component: <Language close={setSelectedOption} />, valueSetted: LANGUAGES[i18n.language] }
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <LinearGradient
      colors={getStressColors(stress)}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.containerOptions}>
          {options.map((option) => (
            <Option key={option.text} option={option} onSelect={handleOptionSelect} valueSetted={option.valueSetted} />
          ))}
        </View>
        {selectedOption && selectedOption.component}

      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    stress: state.stress.stress
  };
};

export default connect(mapStateToProps, null)(Settings);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fafafa',
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
