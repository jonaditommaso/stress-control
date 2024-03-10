import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ActionButtons = ({ onClose, onOk, onlyCancel, disabled }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.containerTextActions}>
      <Pressable onPress={onClose}>
        <Text style={styles.textActions}>{t('cancel')}</Text>
      </Pressable>
      {!onlyCancel && <View style={{ width: 1, height: '100%', backgroundColor: '#ccc' }} />}
      {!onlyCancel && (
        <Pressable onPress={onOk} disabled={disabled}>
          <Text style={[styles.textActions, disabled && { color: '#ccc' }]}>{t('accept')}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
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
  }
});
