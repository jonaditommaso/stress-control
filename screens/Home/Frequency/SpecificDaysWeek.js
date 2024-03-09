import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { WEEKDAYS } from './frequencyTypes';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

const SpecificDaysWeek = ({ setFrequencyValue }) => {
  const [daysSelected, setDaysSelected] = useState([]);

  const onValueChange = (item) => {
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
      data={WEEKDAYS}
      numColumns={4}
      style={{ margin: 10 }}
      renderItem={({ item }) => (
        <Pressable style={styles.container}>
          <Checkbox
            style={{ margin: 3 }}
            value={daysSelected.includes(item)}
            onValueChange={() => onValueChange(item)}
            color='#212121'
          />
          <Text>{item}</Text>
        </Pressable>
      )}
    />
  );
};

export default SpecificDaysWeek;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
    width: 70
  }
});
