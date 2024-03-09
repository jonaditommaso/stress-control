import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ContainerData from './ContainerData';
import Divider from '../../components/Divider';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { getStressColors } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import ActivitiesChart from './ActivitiesChart';
import { useEffect, useState } from 'react';

const Statistics = ({ currentTasks, stress, stressSupport, currentStressLevels }) => {
  const [activities, setActivities] = useState({});
  const { t } = useTranslation();

  const tasks = (currentTasks?.tasks || []).filter(task => task.activity === 'task');
  const habits = (currentTasks?.tasks || []).filter(habit => habit.activity === 'habit');

  const totalTasks = tasks.length;
  const totalHabits = habits.length;
  const pendingTasks = (tasks || []).filter(task => task.status === 'pending');
  const stressLevelsLength = Object.values(currentStressLevels).filter(Boolean).length;

  useEffect(() => {
    const longTermActivities = [];
    const mediumTermActivities = [];
    const quickActivities = [];

    (currentTasks?.tasks || []).forEach(activity => {
      if (activity.type === 'high') longTermActivities.push(activity);
      if (activity.type === 'medium') mediumTermActivities.push(activity);
      if (activity.type === 'low') quickActivities.push(activity);
    });

    setActivities({
      long: longTermActivities.length,
      medium: mediumTermActivities.length,
      quick: quickActivities.length
    });
  }, [currentTasks.tasks]);

  return (
    <LinearGradient
      colors={getStressColors(stress, stressSupport, stressLevelsLength)}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.tasksSection}>
          <Text style={styles.textTitle}>{t('habits')}</Text>
          <Divider />
          <View style={styles.tasksContainer}>
            <ContainerData title={t('totals')} data={`${totalHabits}`} />
          </View>
        </View>

        <View style={styles.tasksSection}>
          <Text style={styles.textTitle}>{t('tasks')}</Text>
          <Divider />
          <View style={styles.tasksContainer}>
            <ContainerData title={t('totals')} data={`${totalTasks}`} />
            <ContainerData title={t('completed')} data={`${totalTasks - pendingTasks.length}`} />
            <ContainerData title={t('pending')} data={`${pendingTasks?.length}`} />
          </View>
        </View>

        {totalTasks > 0 && <ActivitiesChart tasks={tasks} />}

        <View style={styles.tasksSection}>
          <Text style={styles.textTitle}>{t('activities')}</Text>
          <Divider />
          <View style={styles.tasksContainer}>
            <ContainerData title={t('long-term')} data={`${activities.long}`} />
            <ContainerData title={t('medium-term')} data={`${activities.medium}`} />
            <ContainerData title={t('quick-task')} data={`${activities.quick}`} />
          </View>
        </View>

      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTasks: state.tasks,
    stress: state.stress.stress,
    stressSupport: state.stressSupport.stressSupport,
    currentStressLevels: state.stressLevels.stressLevels
  };
};

export default connect(mapStateToProps, null)(Statistics);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10
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
