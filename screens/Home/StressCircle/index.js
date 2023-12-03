import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

const StressCircle = ({ text }) => {
  const [fontsLoaded] = useFonts({
    Virgil: require('../../../assets/fonts/Virgil.ttf')
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.circleContainer}>
      <View style={styles.circle}>
        <Text style={styles.text}>{text}% de estrés</Text>
      </View>
    </View>
  );
};

export default StressCircle;

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: 'darkgreen',
    backgroundColor: '#D0F288',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Virgil'
  }
});
