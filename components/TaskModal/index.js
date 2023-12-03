import { Modal, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskModal = ({ visible, setVisible, children }) => {
  return (
    <Modal
      animationType='fade'
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent
      onDismiss={() => setVisible(false)}

    >
      <TouchableWithoutFeedback onPressOut={() => setVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View>
                <View style={styles.modalHeader}>
                  <Pressable onPress={() => setVisible(false)}>
                    <Ionicons name='close' size={26} color='black' />
                  </Pressable>
                </View>
                <View style={styles.modalContent}>
                  {children}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  modalContainer: {
    height: 300,
    width: 350,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '50%',
    borderWidth: 1,
    borderColor: '#212121',
    elevation: 5,
    borderRadius: 8,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    padding: 5
  },
  modalHeader: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalContent: {
    flexGrow: 1
  }
});
