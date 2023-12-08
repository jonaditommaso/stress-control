import { StyleSheet, Text, View } from 'react-native';

const ContainerData = ({ title = 'Tareas', data }) => {
  return (
    <View style={[styles.container, data && styles.containerBig]}>
      <Text>{title}</Text>
      {data && <Text style={styles.textData}>{data}</Text>}
    </View>
  );
};

export default ContainerData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#ccc',
    padding: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    width: 110,
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  containerBig: {
    height: 90
  },
  textData: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15
  }
});
