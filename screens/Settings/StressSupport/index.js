import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import { updateStressLevelSupport } from '../../../redux/actions';
import { defineColorByStress } from '../../../utils/defineColorByStress';

const StressSupport = ({ close, stress, currentStressLevels }) => {
  const [stressValue, setStressValue] = useState(stress);
  const { t } = useTranslation();

  const { updateStressLevelSupport } = useActions();

  const onSliderValueChange = (value) => {
    setStressValue(value);
  };

  const onSlidingComplete = () => {
    updateStressLevelSupport(stressValue);
  };

  const lengthLevels = Object.values(currentStressLevels).filter(Boolean).length;
  const maxValue = lengthLevels === 4 ? 120 : 100;

  return (
    <BottomSheet close={close} title={t('choose-stress-support')} size={150}>
      <View style={styles.container}>
        <Slider
          style={{ width: 250, height: 50 }}
          minimumValue={0}
          maximumValue={maxValue}
          lowerLimit={10}
          step={10}
          value={stressValue}
          onValueChange={onSliderValueChange}
          minimumTrackTintColor={defineColorByStress(stressValue, lengthLevels).color}
          thumbTintColor={defineColorByStress(stressValue, lengthLevels).color}
          onSlidingComplete={onSlidingComplete}
        />
        <Text style={styles.stressValue}>{stressValue}%</Text>
      </View>
    </BottomSheet>
  );
};

const mapStateToProps = (state) => {
  return {
    stress: state.stressSupport.stressSupport,
    currentStressLevels: state.stressLevels.stressLevels
  };
};

export default connect(mapStateToProps, { updateStressLevelSupport })(StressSupport);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  stressValue: {
    fontWeight: '500'
  }
});
