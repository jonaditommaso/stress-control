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

const Home = ({ currentTasks = {}, stress, containerColors, stressSupport }) => {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState({ open: false });
  const [selectGeneralType, setSelectGeneralType] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs().format('DD/MM/YYYY'));

  const { t } = useTranslation();

  const tasks = (currentTasks.tasks || []).filter(task => !task.date || task.date === selectedDay);

  return (
    <LinearGradient
      colors={getStressColors(stress, stressSupport)}
      style={{ flex: 1 }}
    >
      <View style={styles.homeContainer}>
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
        <TaskModal
          visible={addTaskModalVisible}
          setVisible={setAddTaskModalVisible}
          tasks={tasks}
          closeGeneralType={setSelectGeneralType}
        />

        <PrimaryButton title={t('add-task')} onChange={() => setSelectGeneralType(true)} />

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
    containerColors: state.containerColors.containerColors
  };
};

export default connect(mapStateToProps, { addTask })(Home);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between'
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
