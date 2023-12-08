import { View, StyleSheet, Image, Text } from 'react-native';
import ContainerData from './ContainerData';
import Divider from '../../components/Divider';
import PrimaryButton from '../../components/PrimaryButton';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/imgs/profile1.jpg')} style={styles.imageProfile} />
      <Text style={styles.textName}>Juana Doe</Text>

      <View style={styles.tasksSection}>
        <Text style={styles.textTitle}>Tareas</Text>
        <Divider />
        <View style={styles.tasksContainer}>
          <ContainerData title='Totales' data={12} />
          <ContainerData title='Completadas' data={8} />
          <ContainerData title='Pendientes' data={4} />
        </View>
      </View>

      <View style={styles.tasksSection}>
        <Text style={styles.textTitle}>Intereses</Text>
        <Divider />
        <View style={styles.tasksContainer}>
          <ContainerData title='Libros' />
          <ContainerData title='Programación' />
          <ContainerData title='Viajes' />
        </View>
      </View>

      <PrimaryButton title='Editar perfil' width='90%' />
    </View>
  );
};

export default Profile;

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
