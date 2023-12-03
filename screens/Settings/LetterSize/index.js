import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import { LETTER_SIZES } from '../../../utils/constants';

const LetterSize = ({ close }) => {
  return (
    <BottomSheet close={close} size={150} title='Tamaño de letra'>
      <View style={styles.containerLetters}>

        {LETTER_SIZES.map((letter, index) => (
          <View key={index} style={styles.containerLetter}>
            <Text style={{ fontSize: letter.size }}>{letter.label}</Text>
          </View>
        ))}
      </View>
    </BottomSheet>
  );
};

export default LetterSize;

const styles = StyleSheet.create({
  containerLetters: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'baseline'
  },
  containerLetter: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 20
  }
});
