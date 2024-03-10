import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useState } from 'react';
import Task from '../../components/Task';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { addTask } from '../../redux/actions';
import { getStressColors } from '../../utils/constants';
import TaskModal from './TaskModal';
import GeneralTypeSelection from './GeneralTypeSelection';
import CalendarSwiper from '../../components/CalendarSwiper';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { unformatDate } from '../../utils/unformatDate';

const Home = ({ currentTasks = {}, stress, containerColors, stressSupport, currentStressLevels }) => {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState({ open: false });
  const [selectGeneralType, setSelectGeneralType] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs().format('DD/MM/YYYY'));

  const { t } = useTranslation();

  const checkDate = (task) => {
    if (task.activity === 'task') {
      return !task.date || task.date === selectedDay;
    } else {
      const { type, value } = task.frequency;
      if (type === 'all-days') return true;

      if (type === 'specific-week-days') {
        const currentDay = dayjs(unformatDate(selectedDay)).format('ddd');
        return value.includes(currentDay);
      }

      if (type === 'specific-month-days') {
        const day = selectedDay.split('/')[0];
        const numericValues = value.map(element => Number(element));
        return numericValues.includes(Number(day));
      }

      if (type === 'repeat') {
        const calculateDays = (initialDate, dateSelected, number) => {
          if (dayjs(initialDate).isBefore(dayjs(dateSelected))) {
            return false;
          }
          const differenceDays = dayjs(dateSelected).diff(dayjs(initialDate), 'day');
          return differenceDays % number === 0;
        };

        const currentDay = dayjs(unformatDate(selectedDay)).toDate();
        const settedDay = dayjs(unformatDate(task.date)).toDate();
        return calculateDays(currentDay, settedDay, Number(value));
      }

      return false;
    }
  };

  const tasks = (currentTasks.tasks || []).filter(task => checkDate(task));
  const stressLevelsLength = Object.values(currentStressLevels).filter(Boolean).length;

  return (
    <LinearGradient
      colors={getStressColors(stress, stressSupport, stressLevelsLength)}
      style={{ flex: 1 }}
    >
      <View style={[styles.homeContainer, { marginBottom: addTaskModalVisible.open ? 0 : 15 }]}>
        <CalendarSwiper setSelectedDay={setSelectedDay} selectedDay={selectedDay} />

        <View style={styles.containerTasks}>
          <FlatList
            data={tasks}
            showsVerticalScrollIndicator={false}
            scrollEnabled={tasks.length > 0}
            keyboardShouldPersistTaps='always'
            ListEmptyComponent={
              <View style={{ alignItems: 'center', margin: 100 }}>
                <Image source={require('../../assets/no-tasks.png')} style={{ height: 350, width: 250 }} />
                <Text style={{ width: 300, textAlign: 'center', fontWeight: '500' }}>{t('no-activities')}</Text>
              </View>
            }
            renderItem={({ item, index }) => (
              <Task
                item={item}
                containerColors={containerColors}
                index={index}
              />
            )}
            style={{ flex: 1 }}
          />
        </View>
        {addTaskModalVisible.open && (
          <View style={styles.overlay}>
            <TaskModal
              visible={addTaskModalVisible}
              setVisible={setAddTaskModalVisible}
              tasks={tasks}
              closeGeneralType={setSelectGeneralType}
            />
          </View>
        )}

        <PrimaryButton title={t('add-activity')} onChange={() => setSelectGeneralType(true)} />

        {selectGeneralType && <GeneralTypeSelection close={setSelectGeneralType} setTaskModalVisible={setAddTaskModalVisible} />}
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTasks: state.tasks,
    stress: state.stress.stress,
    stressSupport: state.stressSupport.stressSupport,
    containerColors: state.containerColors.containerColors,
    currentStressLevels: state.stressLevels.stressLevels
  };
};

export default connect(mapStateToProps, { addTask })(Home);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  containerTasks: {
    backgroundColor: '#fff',
    height: 520,
    borderRadius: 10,
    padding: 5,
    width: '98%',
    marginBottom: 5
  }
});
