import { Pressable, StyleSheet, Text, View } from 'react-native';

const SecondaryButton = ({ title, onChange, selected = false, customColor = false }) => {
  const getCustomStyle = () => {
    if (customColor) {
      return { borderColor: customColor };
    }
  };

  return (
    <View style={[styles.buttonContainer, selected && { backgroundColor: customColor || '#212121' }, getCustomStyle()]}>
      <Pressable onPress={onChange}>
        <Text style={[styles.buttonText, selected && { color: '#fafafa' }]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    textAlign: 'center'
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 5
    // marginHorizontal: 5

  }
});
