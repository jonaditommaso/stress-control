import { Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Divider from '../../../components/Divider';

const GeneralTypeSelection = ({ close, setTaskModalVisible }) => {
  return (
    <BottomSheet close={close} size={130}>
      <View style={styles.container}>
        <Pressable style={styles.activityContainer} onPress={() => setTaskModalVisible({ open: true, type: 'habit' })}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name='repeat' size={24} color='red' />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Habito</Text>
            <Text>Actividad recurrente o que se repite periodicamente</Text>
          </View>
        </Pressable>

        <Divider />

        <Pressable style={styles.activityContainer} onPress={() => setTaskModalVisible({ open: true, type: 'goal' })}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name='check' size={24} color='red' />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Tarea</Text>
            <Text>Actividad unica u objetivo</Text>
          </View>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

export default GeneralTypeSelection;

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
    // justifyContent: 'center'
  },
  textContainer: {
    marginLeft: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  iconContainer: {
    backgroundColor: '#be201c33',
    padding: 5,
    borderRadius: 100
  }
});
