import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Divider from '../../../components/Divider';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';
import { addRemoveStressLevel } from '../../../redux/actions';

const StressLevel = ({ stress, currentStressLevels }) => {
  const initialState = !stress.modify ? true : currentStressLevels.moderatelyHigh;

  const [isChecked, setChecked] = useState(initialState);
  const { t } = useTranslation();

  const { addRemoveStressLevel } = useActions();

  const onValueChange = (value) => {
    setChecked(value);
    addRemoveStressLevel(value);
  };

  return (
    <View style={styles.containerType}>
      <Text style={[styles.typeText, !stress.modify && styles.disabledOption]}>{t(stress.type)}</Text>
      <Divider />
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onValueChange} color='#212121' disabled={!stress.modify} />
      {!stress.modify && <Entypo name='lock' size={18} color='black' />}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    currentStressLevels: state.stressLevels.stressLevels
  };
};

export default connect(mapStateToProps, { addRemoveStressLevel })(StressLevel);

const styles = StyleSheet.create({
  typeText: {
    fontWeight: '500',
    marginVertical: 5
  },
  containerType: {
    margin: 10,
    alignItems: 'center'
  },
  disabledOption: {
    color: '#ccc'
  },
  checkbox: {
    margin: 8
  }
});
