import { StyleSheet, Text, View } from 'react-native';
import ColorPicker from '../../components/ColorPicker';
import { useMemo, useState } from 'react';
import Language from './Language';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { LANGUAGES, getStressColors } from '../../utils/constants';
import PrimaryButton from '../../components/PrimaryButton';
import i18n from '../../i18next';
import { useTranslation } from 'react-i18next';
import StressLevels from './StressLevels';
import StressSupport from './StressSupport';
import { defineColorByStress } from '../../utils/defineColorByStress';
import LittleCircles from '../../components/ColorPicker/LittleCircles';

const Option = ({ option, onSelect, valueSetted }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.optionContainer}>
      <Text style={styles.optionText}>{option.text}</Text>
      <View style={styles.optionBottom}>
        {typeof valueSetted === 'function' ? valueSetted() : <Text>{valueSetted}</Text>}
        <PrimaryButton title={t('modify')} onChange={() => onSelect(option)} width={100} />
      </View>
    </View>
  );
};

const Settings = ({ currentStress, stressSupport, currentStressLevels, containerColors }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { t } = useTranslation();

  const stressSupportName = t(defineColorByStress(stressSupport).name);

  const stressLevels = () => {
    const trueKeys = Object.keys(currentStressLevels).filter(key => currentStressLevels[key]);
    const translatedKeys = trueKeys.map(key => t(key));
    return translatedKeys.join(', ');
  };

  const littleCirclesComponent = () => <LittleCircles />;

  const options = useMemo(() => [
    { text: t('container-color'), component: <ColorPicker key='containers' close={setSelectedOption} label={t('select-container-color')} />, valueSetted: littleCirclesComponent },
    { text: t('stress-levels'), component: <StressLevels close={setSelectedOption} />, valueSetted: stressLevels() },
    { text: t('stress-support'), component: <StressSupport close={setSelectedOption} />, valueSetted: stressSupportName },
    { text: t('language'), component: <Language close={setSelectedOption} />, valueSetted: LANGUAGES[i18n.language] }
    // { text: t('theme'), component: <Language close={setSelectedOption} />, valueSetted: LANGUAGES[i18n.language] }
  ], [stressSupport, currentStressLevels, containerColors, i18n.language]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <LinearGradient
      colors={getStressColors(currentStress)}
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
    currentStress: state.stress.stress,
    stressSupport: state.stressSupport.stressSupport,
    currentStressLevels: state.stressLevels.stressLevels,
    containerColors: state.containerColors.containerColors
  };
};

export default connect(mapStateToProps, null)(Settings);

const styles = StyleSheet.create({
  container: {
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
    marginTop: '5%',
    alignItems: 'center'
  }
});
