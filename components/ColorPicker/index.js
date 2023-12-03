import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { colors } from './colors';
import { useState } from 'react';
import BottomSheet from '../BottomSheet';

const ColorPicker = ({ label, close }) => {
  const [value, setValue] = useState(0);

  return (
    <View>
      <BottomSheet close={close} title={label}>
        <View style={styles.sheetBody}>
          <View style={styles.group}>
            {colors.map((item, index) => {
              const isActive = value === index;
              return (
                <View key={item}>
                  <TouchableWithoutFeedback
                    onPress={() => setValue(index)}
                  >
                    <View
                      style={[
                        styles.circle,
                        isActive && { borderColor: item }
                      ]}
                    >
                      <View style={[styles.circleInside, { backgroundColor: item }]} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              // handle onPress
            }}
          >
            <Text style={styles.btnText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ColorPicker;

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

const styles = StyleSheet.create({
  sheetBody: {
    padding: 24
  },
  profile: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  profileText: {
    fontSize: 34,
    fontWeight: '600',
    color: 'white'
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 12
  },
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: 'white',
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: 'transparent',
    marginRight: 8,
    marginBottom: 12
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280'
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    marginBottom: 12
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },

  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  }
});
