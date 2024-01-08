import { StyleSheet, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import { STRESS_LEVELS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import StressLevel from './StressLevel';

const StressLevels = ({ close }) => {
  const { t } = useTranslation();

  return (
    <BottomSheet close={close} size={200} title={t('add-remove-stress-level')}>
      <View style={styles.container}>
        {STRESS_LEVELS.map(stress => <StressLevel stress={stress} key={stress.type} />)}
      </View>
    </BottomSheet>
  );
};

export default StressLevels;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
