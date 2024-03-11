import { Pressable, StyleSheet, Text, View, Vibration } from 'react-native';
import { ACTIVITIES_TYPE, CONTAINER_COLORS } from '../../utils/constants';
import { CATEGORIES } from '../../utils/categories';
import { useMemo, useRef, useState } from 'react';
import IconTask from './IconTask';
import { Swipeable } from 'react-native-gesture-handler';
import EditRemoveSwipe from './EditRemoveSwipe';
import { connect } from 'react-redux';
import { removeTask, editTask } from '../../redux/actions';
import { useActions } from '../../hooks/useActions';
import EditModal from './EditModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const Task = ({ item, containerColors, index, currentTasks = {}, stress, stressSupport }) => {
  const [editModal, setEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(undefined);
  const { type, text, icon, status, activity } = item;
  const { removeTask, editTask, updateCurrentStress } = useActions();
  const swipeableRef = useRef(null);
  const { t } = useTranslation();

  const colorsObject = CONTAINER_COLORS.reduce((acc, item) => {
    acc[item.name] = item;
    return acc;
  }, {});

  const taskStyle = {
    backgroundColor: `${colorsObject[`${type}`].colors[containerColors[type]]}`, // 33, 66
    color: colorsObject[`${type}`].colors[containerColors[type]]
    // height: colorsObject[`${type}`].size
    // borderColor: colorsObject[`${type}`].colors[containerColors[type]]
  };

  const iconComponent = useMemo(() => {
    const category = CATEGORIES.find(category => category.name === icon);
    return category.icon;
  }, [icon]);

  const updateStress = (action) => {
    const { percent } = ACTIVITIES_TYPE.find(element => element.type === type);
    const stressResult = (stressSupport * percent) / 100;

    const operationResult = action === 'remove' ? stress - stressResult : stress + stressResult;
    updateCurrentStress(operationResult);
  };

  const onRemove = () => {
    const tasks = [...currentTasks.tasks];
    tasks.splice(index, 1);
    removeTask(tasks);
    if (item.status === 'pending') {
      updateStress('remove');
    }
  };

  const onEdit = () => {
    const task = [...currentTasks.tasks].find((_, i) => i === index);
    setTaskToEdit(task);
    setEditModal(true);
  };

  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const changeStatus = () => {
    Vibration.vibrate(50);
    const tasks = [...currentTasks.tasks];

    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        updateStress(task.status === 'pending' ? 'remove' : 'add');
        return {
          ...task,
          status: task.status === 'pending' ? 'completed' : 'pending'
        };
      }
      return task;
    });
    editTask(updatedTasks);
  };

  return (
    <View>
      <EditModal
        visible={editModal}
        setVisible={setEditModal}
        taskToEdit={taskToEdit}
        index={index}
        closeSwipeable={closeSwipeable}
      />
      <Swipeable ref={swipeableRef} renderRightActions={() => <EditRemoveSwipe onRemove={onRemove} onEdit={onEdit} />}>
        <View style={[styles.containerTask, { height: colorsObject[`${type}`].size, backgroundColor: `${taskStyle.backgroundColor}33`, color: taskStyle.color }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.iconContainer, { backgroundColor: `${taskStyle.backgroundColor}44` }]}>
              <IconTask iconComponent={iconComponent} color={colorsObject[`${type}`].colors[containerColors[type]]} />
            </View>
            <View style={styles.containerText}>
              <Text style={[styles.textTask, { fontSize: colorsObject[`${type}`].fontSize }]}>
                {text}
              </Text>
              <Text style={[styles.textType, { backgroundColor: `${taskStyle.backgroundColor}44`, color: taskStyle.color }]}>
                {t(activity)}
              </Text>
            </View>
          </View>
          {activity === 'task' && (
            <Pressable style={styles.isDone} onPress={() => changeStatus()}>
              {status === 'completed' && <MaterialCommunityIcons name='check' size={24} color='#28f60b' />}
            </Pressable>
          )}
        </View>
      </Swipeable>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTasks: state.tasks,
    stress: state.stress.stress,
    stressSupport: state.stressSupport.stressSupport
  };
};

export default connect(mapStateToProps, { removeTask, editTask })(Task);

const styles = StyleSheet.create({
  containerTask: {
    borderRadius: 5,
    margin: 2,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerText: {
    marginLeft: 10
  },
  textTask: {
    color: '#212121',
    fontSize: 18,
    marginLeft: 5
  },
  textType: {
    padding: 2,
    fontSize: 14,
    borderRadius: 5,
    maxWidth: 50,
    textAlign: 'center'
  },
  iconContainer: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  isDone: {
    backgroundColor: '#21212155',
    padding: 5,
    borderRadius: 100,
    width: 35,
    height: 35
  }
});
