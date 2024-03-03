import { StyleSheet, Text, View } from 'react-native';
import { CONTAINER_COLORS } from '../../utils/constants';
import { CATEGORIES } from '../../utils/categories';
import { useMemo, useRef, useState } from 'react';
import IconTask from './IconTask';
import { Swipeable } from 'react-native-gesture-handler';
import EditRemoveSwipe from './EditRemoveSwipe';
import { connect } from 'react-redux';
import { removeTask } from '../../redux/actions';
import { useActions } from '../../hooks/useActions';
import EditModal from './EditModal';

const Task = ({ item, containerColors, index, currentTasks = {}, setTasks }) => {
  const [editModal, setEditModal] = useState(false);
  const [editTask, setEditTask] = useState(undefined);
  const { type, text, icon } = item;
  const { removeTask } = useActions();
  const swipeableRef = useRef(null);

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

  const onRemove = () => {
    const tasks = [...currentTasks.tasks];
    tasks.splice(index, 1);
    removeTask(tasks);
    // setTasks(tasks);
  };

  const onEdit = () => {
    const task = [...currentTasks.tasks].find((_, i) => i === index);
    setEditTask(task);
    setEditModal(true);
  };

  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  return (
    <View>
      <EditModal
        visible={editModal}
        setVisible={setEditModal}
        taskToEdit={editTask}
        index={index}
        closeSwipeable={closeSwipeable}
      />
      <Swipeable ref={swipeableRef} renderRightActions={() => <EditRemoveSwipe onRemove={onRemove} onEdit={onEdit} />}>
        <View style={[styles.containerTask, { height: colorsObject[`${type}`].size, backgroundColor: `${taskStyle.backgroundColor}33`, color: taskStyle.color }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${taskStyle.backgroundColor}44` }]}>
            <IconTask iconComponent={iconComponent} color={colorsObject[`${type}`].colors[containerColors[type]]} />
          </View>
          <View style={styles.containerText}>
            <Text style={[styles.textTask, { fontSize: colorsObject[`${type}`].fontSize }]}>
              {text}
            </Text>
            <Text style={[styles.textType, { backgroundColor: `${taskStyle.backgroundColor}44`, color: taskStyle.color }]}>
              Tarea
            </Text>
          </View>
        </View>
      </Swipeable>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTasks: state.tasks
  };
};

export default connect(mapStateToProps, { removeTask })(Task);

const styles = StyleSheet.create({
  containerTask: {
    // width: 300,
    borderRadius: 5,
    margin: 2,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerText: {
    marginLeft: 10
    // flex: 1
  },
  textTask: {
    color: '#212121',
    // color: 'white',
    fontSize: 18,
    marginLeft: 5
    // flex: 0.6
  },
  textType: {
    // color: 'red',
    // backgroundColor: '#be201c55',
    padding: 2,
    fontSize: 14,
    borderRadius: 5,
    maxWidth: 50,
    textAlign: 'center'
    // flex: 0.4
  },
  iconContainer: {
    // backgroundColor: '#be201c55',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
    // maxHeight: 20
  }
});
