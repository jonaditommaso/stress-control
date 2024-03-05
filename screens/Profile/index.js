import { View, StyleSheet, Image, Text } from 'react-native';
import ContainerData from './ContainerData';
import Divider from '../../components/Divider';
import PrimaryButton from '../../components/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { getStressColors } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import ActivitiesChart from './ActivitiesChart';

const Profile = ({ currentTasks, stress, stressSupport }) => {
  const { t } = useTranslation();

  const totalTasks = currentTasks?.tasks?.length;
  const pendingTasks = (currentTasks?.tasks || []).filter(task => task.status === 'pending');

  return (
    <LinearGradient
      colors={getStressColors(stress, stressSupport)}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={require('../../assets/imgs/profile1.jpg')} style={styles.imageProfile} />
        <Text style={styles.textName}>Juana Doe</Text>

        <View style={styles.tasksSection}>
          <Text style={styles.textTitle}>{t('tasks')}</Text>
          <Divider />
          <View style={styles.tasksContainer}>
            <ContainerData title={t('totals')} data={`${totalTasks}`} />
            <ContainerData title={t('completed')} data={`${totalTasks - pendingTasks.length}`} />
            <ContainerData title={t('pending')} data={`${pendingTasks?.length}`} />
          </View>
        </View>

        {totalTasks > 0 && <ActivitiesChart tasks={currentTasks?.tasks} />}

        {/* <View style={styles.tasksSection}>
          <Text style={styles.textTitle}>{t('interests')}</Text>
          <Divider />
          <View style={styles.tasksContainer}>
            <ContainerData title='Libros' />
            <ContainerData title='Programación' />
            <ContainerData title='Viajes' />
          </View>
        </View> */}

        <PrimaryButton title={t('edit-profile')} width='90%' mv={10} />
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTasks: state.tasks,
    stress: state.stress.stress,
    stressSupport: state.stressSupport.stressSupport
  };
};

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  textName: {
    fontSize: 20,
    marginTop: 5
  },
  textTitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold'
  },
  tasksSection: {
    width: '90%',
    marginTop: 20,
    alignItems: 'center'
  },
  tasksContainer: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18
  },
  tasks: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});
