import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PrimaryButton = ({ title, onChange, disabled, width = 300 }) => {
  return (
    <View style={{ width }}>
      <TouchableOpacity onPress={onChange} style={styles.button} disabled={disabled}>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#212121',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5
  }
});
