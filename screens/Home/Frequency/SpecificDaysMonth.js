import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { ALL_DAYS } from './frequencyTypes';
import { useState } from 'react';

const SpecificDaysMonth = ({ setFrequencyValue }) => {
  const [daysSelected, setDaysSelected] = useState([]);

  const handleSelect = (item) => {
    let selectedValues = [...daysSelected];
    if (selectedValues.includes(item)) {
      selectedValues = selectedValues.filter(value => value !== item);
    } else {
      selectedValues = [...selectedValues, item];
    }
    setDaysSelected(selectedValues);

    setFrequencyValue(prev => { return { ...prev, value: selectedValues.length === 0 ? undefined : selectedValues }; });
  };

  return (
    <FlatList
      data={ALL_DAYS}
      style={{ flexDirection: 'row', flexWrap: 'wrap', width: '90%', margin: 10 }}
      initialNumToRender={28}
      renderItem={({ item }) => (
        <Pressable
          style={[styles.containerNumber, daysSelected.includes(item) && { backgroundColor: '#d00d03' }]}
          onPress={() => handleSelect(item)}
        >
          <Text style={{ color: '#fff', alignSelf: 'center', padding: 8 }}>{item}</Text>
        </Pressable>
      )}
    />
  );
};

export default SpecificDaysMonth;

const styles = StyleSheet.create({
  containerNumber: {
    backgroundColor: '#212121',
    borderRadius: 8,
    margin: 4,
    width: 35
  }
});
