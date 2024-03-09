import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioButton from '../../../components/RadioButton';
import { useTranslation } from 'react-i18next';
import { habitFrequency } from './habitFrequency';
import CustomModal from '../../../components/CustomModal';
import SpecificDaysWeek from './SpecificDaysWeek';
import Repeat from './Repeat';
import SpecificDaysMonth from './SpecificDaysMonth';

const Frequency = ({ setTask }) => {
  const [showFrequency, setShowFrequency] = useState(false);
  const [radioValue, setRadioValue] = useState(0);
  const [frequencyValue, setFrequencyValue] = useState({ type: habitFrequency[radioValue] });
  const { t } = useTranslation();

  const onChange = (value) => {
    setFrequencyValue((prev) => {
      return {
        value: undefined,
        type: habitFrequency[value]
      };
    });
  };

  const onOk = () => {
    setTask(prev => {
      return {
        ...prev,
        frequency: frequencyValue
      };
    });
    setShowFrequency(false);
  };

  return (
    <View>
      <CustomModal
        height={400}
        visible={showFrequency}
        setVisible={setShowFrequency}
        onClose={() => setShowFrequency(false)}
        onOk={onOk}
        title={t('choose-frequency')}
        disabled={radioValue !== 0 && !frequencyValue.value}
      >
        <FlatList
          data={habitFrequency}
          numColumns={1}
          renderItem={({ item, index }) => (
            <View style={{ width: 350 }}>
              <Pressable key={item} style={{ flexDirection: 'row', alignItems: 'center', padding: 4, marginTop: index === 0 && 20 }}>
                <RadioButton value={radioValue} index={index} setValue={setRadioValue} onChange={onChange} />
                <Text style={{ marginLeft: 5, fontSize: 16 }}>{t(item)}</Text>
              </Pressable>
              {radioValue === 1 && index === 1 && <SpecificDaysWeek setFrequencyValue={setFrequencyValue} />}
              {radioValue === 2 && index === 2 && <SpecificDaysMonth setFrequencyValue={setFrequencyValue} />}
              {radioValue === 3 && index === 3 && <Repeat setFrequencyValue={setFrequencyValue} />}
              {/* {radioValue === 4 && index === 4 && <PerPeriod setFrequencyValue={setFrequencyValue} />} */}
            </View>
          )}
        />
      </CustomModal>
      <TouchableOpacity style={styles.container} onPress={() => setShowFrequency(!showFrequency)}>
        <View style={styles.categoryTitle}>
          <Octicons name='clock' size={24} color='black' />
          <Text style={styles.pressableText}>{t('frequency')}</Text>
        </View>
        <View>
          <Text>{t(habitFrequency[radioValue])}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Frequency;

const styles = StyleSheet.create({
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pressableText: {
    fontSize: 18,
    marginLeft: 5
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  }
});
