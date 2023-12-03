import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PrimaryButton = ({ title, onChange, disabled }) => {
  return (
    <View style={{ width: 300 }}>
      <TouchableOpacity onPress={onChange} style={styles.button} disabled={disabled}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#aaf',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#6874e7',
    borderRadius: 8,
    padding: 5
  }
});
