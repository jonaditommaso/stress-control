import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const EditRemoveSwipe = ({ onRemove, onEdit }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerIcon} onPress={onRemove}>
        <AntDesign name='delete' size={24} color='#be201c' style={styles.icon} />
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.containerIcon} onPress={onEdit}>
        <AntDesign name='edit' size={24} color='#0061a9' style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default EditRemoveSwipe;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerIcon: {
    padding: 10
  },
  icon: {
    alignSelf: 'center'
  },
  divider: {
    width: 1
  }
});
