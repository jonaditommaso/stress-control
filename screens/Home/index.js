import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useState } from 'react';
import SecondaryButton from '../../components/SecondaryButton';
import Task from '../../components/Task';
import TaskModal from '../../components/TaskModal';
import StressCircle from './StressCircle';
import TimeSpent from './TimeSpent';

const Home = () => {
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [modalTask, setModalTask] = useState({});

  const handleAddTask = () => {
    setTasks([...tasks, modalTask]);
    setModalTask('');
    setAddTaskModalVisible(false);
  };

  const onChangeTask = (value, path) => {
    const currentTask = { ...modalTask };
    currentTask[`${path}`] = value;
    setModalTask(currentTask);
  };

  const buttons = [
    {
      title: 'Largo plazo',
      type: 'high'
    },
    {
      title: 'Mediano plazo',
      type: 'medium'
    },
    {
      title: 'Tarea rapida',
      type: 'low'
    }
  ];

  return (
    <View style={styles.homeContainer}>
      {/* <ScrollView> */}
      <View style={{ flexDirection: 'row' }}>
        <TimeSpent />
        <StressCircle text='10' />
      </View>
      <FlatList
        data={tasks}
        ListEmptyComponent={<Text style={{ fontFamily: 'Virgil' }}>No hsy items!</Text>}
        renderItem={({ item }) => <Task item={item} />}
      />
      {/* </ScrollView> */}
      <TaskModal
        visible={addTaskModalVisible}
        setVisible={setAddTaskModalVisible}
      >
        <View style={styles.modal}>
          <TextInput
            value={modalTask?.text}
            onChangeText={(value) => onChangeTask(value, 'text')}
            style={styles.textInput}
            placeholder='Nombre'
          />
          <View style={styles.taskTypeContainer}>
            <View>
              <Text style={{ textAlign: 'center', marginBottom: 5 }}>Tipo de tarea</Text>
            </View>
            <View style={styles.taskTypeOptions}>
              {buttons.map((button, index) => (
                <SecondaryButton
                  key={index}
                  title={button.title}
                  onChange={() => onChangeTask(button.type, 'type')}
                  selected={modalTask?.type === button.type}
                />
              ))}
            </View>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <PrimaryButton title='Agregar' onChange={() => handleAddTask()} disabled={!modalTask?.text || !modalTask?.type} />
          </View>
        </View>
      </TaskModal>
      <PrimaryButton title='Agregar tarea' onChange={() => setAddTaskModalVisible(true)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 15
  },
  modal: {
    justifyContent: 'space-between',
    height: '90%'
  },
  textInput: {
    borderBottomColor: '#212121',
    borderBottomWidth: 1,
    width: 200,
    fontSize: 16,
    paddingTop: 10,
    alignSelf: 'center'
  },
  taskTypeContainer: {
    marginVertical: 10
  },
  taskTypeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
    alignSelf: 'center'
  }
});
