import { StyleSheet, Text, View } from 'react-native';
import { CONTAINER_CONFIG } from '../../utils/constants';

const Task = ({ item }) => {
  const { type, text } = item;

  const taskStyle = {
    backgroundColor: `${CONTAINER_CONFIG[`${type}`].color}66`,
    height: CONTAINER_CONFIG[`${type}`].size,
    borderColor: CONTAINER_CONFIG[`${type}`].color
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
