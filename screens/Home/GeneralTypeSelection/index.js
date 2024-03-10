import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Divider from '../../../components/Divider';
import { useTranslation } from 'react-i18next';

const GeneralTypeSelection = ({ close, setTaskModalVisible }) => {
  const { t } = useTranslation();

  const handleSelectActivityType = (activityType) => {
    close(null);
    setTimeout(() => {
      setTaskModalVisible({ open: true, activity: activityType });
    }, Platform.OS === 'ios' ? 200 : 0);
  };

  return (
    <BottomSheet close={close} size={Platform.OS === 'ios' ? 150 : 130}>
      <View style={styles.container}>
        <Pressable style={styles.activityContainer} onPress={() => handleSelectActivityType('habit')}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name='repeat' size={24} color='red' />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{t('habit')}</Text>
            <Text>{t('habit-explanation')}</Text>
          </View>
        </Pressable>

        <Divider />

        <Pressable style={styles.activityContainer} onPress={() => handleSelectActivityType('task')}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name='check' size={24} color='red' />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{t('task')}</Text>
            <Text>{t('task-explanation')}</Text>
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
