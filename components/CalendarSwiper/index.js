import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable
} from 'react-native';
import { generateDaysList } from './generateDaysList';
import { useTranslation } from 'react-i18next';

const CalendarSwiper = ({ setSelectedDay, selectedDay }) => {
  const days = generateDaysList();

  const { t } = useTranslation();

  const handleSelection = (date) => {
    setSelectedDay(date);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={days}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          style={styles.picker}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              style={
                [
                  styles.item,
                  // item.currentDay && { borderWidth: 1, borderBottomWidth: 1 },
                  item.date === selectedDay && { backgroundColor: '#54626f' }

                ]
              }
              onPress={() => handleSelection(item.date)}
            >
              <Text style={
                [
                  styles.itemWeekday,
                  // item.currentDay && { width: 38 },
                  item.date === selectedDay && { backgroundColor: '#2c272b', color: '#fff' }
                ]
              }
              >
                {t(item.dayWeek)}
              </Text>
              <Text
                style={[
                  styles.itemDate,
                  item.date === selectedDay && { color: '#e3e3e3' }
                ]}
              >
                {item.dayNumber}
              </Text>
              <View style={[styles.markDay, item.currentDay && { backgroundColor: '#212121' }]} />
            </Pressable>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default CalendarSwiper;

const styles = StyleSheet.create({
  picker: {
    maxHeight: 74
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12
  },
  item: {
    height: 60,
    width: 40,
    marginHorizontal: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc'
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#1d1d1d',
    marginBottom: 4,
    width: 40,
    height: 30,
    backgroundColor: '#fff',
    flex: 1,
    padding: 3,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
    height: 25
  },
  markDay: {
    width: 20,
    height: 2,
    backgroundColor: 'transparent',
    marginBottom: 2
  }
});
