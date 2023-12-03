import { Pressable, StyleSheet, Text, View } from 'react-native';

const SecondaryButton = ({ title, onChange, selected = false }) => {
  return (
    <View style={[styles.buttonContainer, selected && { backgroundColor: '#212121' }]}>
      <Pressable onPress={onChange}>
        <Text style={[styles.buttonText, selected && { color: '#fafafa' }]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginHorizontal: 5

  }
});
