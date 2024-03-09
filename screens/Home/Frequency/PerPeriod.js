import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PerPeriod = ({ setFrequencyValue }) => {
  const [timesValue, setTimesValue] = useState('1');
  const [periodValue, setPeriodValue] = useState('week');
  const { t } = useTranslation();

  useEffect(() => {
    setFrequencyValue(prev => {
      return {
        ...prev,
        value: {
          times: timesValue,
          period: periodValue
        }
      };
    });
  }, [timesValue, periodValue]);

  const handleChangeValue = (text) => {
    if (parseInt(text) < 1) {
      setTimesValue('1');
    } else {
      setTimesValue(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={timesValue}
        onChangeText={handleChangeValue}
        keyboardType='numeric'
        style={{ textAlign: 'center', fontSize: 18, fontWeight: '600', width: 40, borderBottomWidth: 1, padding: 0 }}
      />

      <Text style={{ fontSize: 16, color: 'gray' }}>{t('times-per')}</Text>

      <Picker
        selectedValue={periodValue}
        onValueChange={(itemValue) => setPeriodValue(itemValue)}
        style={{ height: 50, width: 150 }}
        itemStyle={{ fontSize: 16 }}
        mode='dropdown'
      >
        <Picker.Item label={t('week').toUpperCase()} value='week' style={{ fontSize: 16 }} />
        <Picker.Item label={t('month').toUpperCase()} value='month' style={{ fontSize: 16 }} />
        <Picker.Item label={t('year').toUpperCase()} value='year' style={{ fontSize: 16 }} />
      </Picker>
    </View>
  );
};

export default PerPeriod;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 30,
    alignItems: 'center'
  }
});
