import { KeyboardAvoidingView, Modal, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import Divider from '../Divider';
import ActionButtons from '../ActionButtons';
import TitleSection from '../TitleSection';

const CustomModal = ({
  children,
  visible,
  setVisible,
  height,
  fullModal,
  onOk,
  onClose,
  onlyCancel,
  title,
  disabled,
  animationType = 'fade'
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onRequestClose={() => setVisible({ open: false })}
      transparent
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>

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
            {title && <TitleSection title={title} />}

            {children}

            <Divider style={{ marginTop: '1rem' }} />

            <ActionButtons
              disabled={disabled}
              onClose={onClose}
              onOk={onOk}
              onlyCancel={onlyCancel}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

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
      width: 3,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    padding: 10
  }
});
