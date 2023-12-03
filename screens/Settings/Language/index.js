import { StyleSheet, View } from 'react-native';
import Flag from 'react-native-flags';
import BottomSheet from '../../../components/BottomSheet';

const Language = ({ close }) => {
  return (
    <View>
      <BottomSheet close={close} title='Idioma' size={150}>
        <View style={styles.containerFlag}>
          <Flag
            code='ES'
            size={48}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  containerFlag: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 60,
    height: 50,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 6
  }
});
