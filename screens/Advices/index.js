import { StyleSheet, Text, View } from 'react-native';

const Advices = () => {
  return (
    <View style={{ marginTop: 10 }}>
      {Array.from({ length: 4 }, (_, index) => (
        <View key={index} style={styles.containerAdvice}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
      ))}
    </View>
  );
};

export default Advices;

const styles = StyleSheet.create({
  containerAdvice: {
    margin: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: '#212121',
    borderRadius: 5,
    backgroundColor: '#21212122'
  }
});
