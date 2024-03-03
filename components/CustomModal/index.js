import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Divider from '../Divider';

const CustomModal = ({ children, visible, setVisible, height, fullModal, onOk, onClose, onlyCancel, title, disabled }) => {
  return (
    <Modal
      animationType='fade'
      visible={visible}
      onRequestClose={() => setVisible(false)}
      onDismiss={() => setVisible(false)}
      transparent
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <View style={[
          styles.modalContainer,
          {
            height,
            width: fullModal ? '100%' : 350,
            marginTop: !fullModal ? '30%' : undefined,
            borderRadius: !fullModal ? 8 : undefined
          }
        ]}
        >
          {title && (
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitleText}>{title}</Text>
              <Divider />
            </View>
          )}

          {children}

          <Divider style={{ marginTop: '1rem' }} />

          <View style={styles.containerTextActions}>
            <Pressable onPress={onClose}>
              <Text style={styles.textActions}>Cancelar</Text>
            </Pressable>
            {!onlyCancel && <View style={{ width: 1, height: '100%', backgroundColor: '#ccc' }} />}
            {!onlyCancel && (
              <Pressable onPress={onOk} disabled={disabled}>
                <Text style={[styles.textActions, disabled && { color: '#ccc' }]}>Aceptar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>

    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#212121',
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    padding: 10
  },
  containerTextActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5
  },
  textActions: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalTitleContainer: {
    width: '100%',
    alignItems: 'center'
  },
  modalTitleText: {
    padding: 8,
    fontSize: 18,
    fontWeight: '600'
  }
});
