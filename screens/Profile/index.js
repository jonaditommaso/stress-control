import { View, StyleSheet, Image, Text } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/imgs/profile1.jpg')} style={styles.imageProfile} />
      <Text style={styles.textName}>Juana Doe</Text>

      <View style={styles.tasksContainer}>
        <Text style={styles.subtitle}>Tareas completadas</Text>
        <Text style={styles.tasks}>12</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 80
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
  tasksContainer: {
    marginVertical: 20
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
