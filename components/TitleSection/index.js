import { StyleSheet, Text, View } from 'react-native';
import Divider from '../Divider';

const TitleSection = ({ title }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Divider />
    </View>
  );
};

export default TitleSection;

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    alignItems: 'center'
  },
  titleText: {
    padding: 8,
    fontSize: 18,
    fontWeight: '600'
  }
});
