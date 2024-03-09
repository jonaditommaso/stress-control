import { StyleSheet, TouchableOpacity, View } from 'react-native';

const RadioButton = ({ value, setValue, index, onChange }) => {
  const handleChange = () => {
    setValue(index);
    onChange && onChange(index);
  };

  return (
    <View>
      <TouchableOpacity style={[styles.outter, value === index && { borderColor: '#d00d03' }]} onPress={handleChange}>
        {value === index && <View style={styles.inner} />}
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  inner: {
    width: 12,
    height: 12,
    backgroundColor: '#d00d03',
    borderRadius: 10
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
