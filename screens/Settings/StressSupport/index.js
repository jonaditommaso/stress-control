import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const StressSupport = ({ close }) => {
  const [stressValue, setStressValue] = useState(50);
  const { t } = useTranslation();

  const onSliderValueChange = (value) => {
    setStressValue(value);
  };

  const defineColor = () => {
    const colors = ['#19ee04', '#feda04', '#d00d03'];
    if (stressValue >= 60 && stressValue < 80) return colors[1];
    if (stressValue >= 80) return colors[2];

    return colors[0];
  };

  return (
    <BottomSheet close={close} title={t('choose-stress-support')} size={150}>
      <View style={styles.container}>
        <Slider
          style={{ width: 250, height: 50 }}
          minimumValue={0}
          maximumValue={100}
          lowerLimit={10}
          step={10}
          value={stressValue}
          onValueChange={onSliderValueChange}
          minimumTrackTintColor={defineColor()}
          thumbTintColor={defineColor()}
        />
        <Text style={styles.stressValue}>{stressValue}%</Text>
      </View>
    </BottomSheet>
  );
};

export default StressSupport;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  stressValue: {
    fontWeight: '500'
  }
});
