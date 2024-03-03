import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useState } from 'react';
import Task from '../../components/Task';
// import StressCircle from './StressCircle';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { addTask } from '../../redux/actions';
import { getStressColors } from '../../utils/constants';
import TaskModal from './TaskModal';
import GeneralTypeSelection from './GeneralTypeSelection';
import CalendarSwiper from '../../components/CalendarSwiper';

const Home = ({ currentTasks = {}, stress, containerColors, stressSupport }) => {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState({ open: false });
  const [selectGeneralType, setSelectGeneralType] = useState(false);
  // const [tasks, setTasks] = useState(currentTasks.tasks || []);

  const tasks = currentTasks.tasks || [];

  return (
    <LinearGradient
      colors={getStressColors(stress, stressSupport)}
      style={{ flex: 1 }}
    >
      <View style={styles.homeContainer}>
        <View style={{ flexDirection: 'row' }}>
          <CalendarSwiper />
        </View>
        <View style={styles.containerTasks}>
          <FlatList
            data={tasks}
            showsVerticalScrollIndicator={false}
            scrollEnabled={tasks.length > 0}
            keyboardShouldPersistTaps='always'
            ListEmptyComponent={
              <View style={{ alignItems: 'center', margin: 100 }}>
                <Image source={require('../../assets/no-tasks.png')} style={{ height: 350, width: 250 }} />
                <Text style={{ width: 300, textAlign: 'center', fontWeight: '500' }}>Parece que no tienes actividades hoy</Text>
              </View>
            }
            renderItem={({ item, index }) => (
              <Task
                item={item}
                containerColors={containerColors}
                index={index}
                // setTasks={setTasks}
              />
            )}
            style={{ flex: 1 }}
          />
        </View>
        <TaskModal
          visible={addTaskModalVisible}
          setVisible={setAddTaskModalVisible}
          tasks={tasks}
          // setTasks={setTasks}
          closeGeneralType={setSelectGeneralType}
        />

        <PrimaryButton title='Agregar tarea' onChange={() => setSelectGeneralType(true)} />

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
    marginVertical: 15,
    justifyContent: 'space-between'
  },
  containerTasks: {
    backgroundColor: '#fff', // '#E3E4E5',
    height: 520,
    // flex: 1,
    borderRadius: 10,
    padding: 5,
    width: '98%',
    marginBottom: 5
  }
});
