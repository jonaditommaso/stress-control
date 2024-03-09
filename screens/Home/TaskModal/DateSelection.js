import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const DateSelection = ({ dateSelected, setDatePickerVisible, activity }) => {
  const { t } = useTranslation();

  const title = activity === 'habit' ? t('start-date') : t('date');
  const selectedText = !dateSelected
    ? (activity === 'habit' ? t('today') : t('undefined'))
    : dayjs(dateSelected).format('DD/MM/YYYY');

  return (
    <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.pressableContainer}>
      <View style={styles.categoryTitle}>
        <MaterialIcons name='calendar-today' size={24} color='black' />
        <Text style={styles.pressableText}>{title}</Text>
      </View>
      <View>
        <Text>{selectedText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DateSelection;

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pressableText: {
    fontSize: 18,
    marginLeft: 5
  }
});
