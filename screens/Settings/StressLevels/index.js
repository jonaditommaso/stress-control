import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import { STRESS_LEVELS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import { Entypo } from '@expo/vector-icons';

const StressLevels = ({ close }) => {
  const { t } = useTranslation();

  return (
    <BottomSheet close={close} size={200} title={t('add-remove-stress-level')}>
      <View style={styles.container}>
        {STRESS_LEVELS.map(stress => (
          <View key={stress.type} style={styles.containerType}>
            <Text style={[styles.typeText, !stress.modify && styles.disabledOption]}>{t(stress.type)}</Text>
            {!stress.modify && <Entypo name='lock' size={18} color='black' />}
          </View>
        ))}
      </View>
    </BottomSheet>
  );
};

export default StressLevels;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  typeText: {
    fontWeight: '500',
    marginVertical: 5
  },
  containerType: {
    margin: 10,
    alignItems: 'center'
  },
  disabledOption: {
    color: '#ccc'
  }
});
