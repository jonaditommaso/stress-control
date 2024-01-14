import { StyleSheet, Text, View } from 'react-native';
import { CONTAINER_COLORS } from '../../utils/constants';

const Task = ({ item, containerColors }) => {
  const { type, text } = item;

  const colorsObject = CONTAINER_COLORS.reduce((acc, item) => {
    acc[item.name] = item;
    return acc;
  }, {});

  const taskStyle = {
    backgroundColor: `${colorsObject[`${type}`].colors[containerColors[type]]}66`,
    height: colorsObject[`${type}`].size,
    borderColor: colorsObject[`${type}`].colors[containerColors[type]]
  };

  return (
    <View style={[styles.containerTask, taskStyle]}>
      <Text style={styles.textTask}>
        {text}
      </Text>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  containerTask: {
    width: 300,
    borderRadius: 5,
    borderWidth: 2,
    margin: 2
  },
  textTask: {
    color: '#212121',
    fontSize: 16,
    marginLeft: 5
  }
});
