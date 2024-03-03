import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = ({ children, close, title, size = 300 }) => {
  const sheet = useRef();

  useEffect(() => {
    sheet.current.open();
  }, []);

  return (
    <RBSheet
      customStyles={{ container: styles.sheet }}
      height={size}
      openDuration={250}
      ref={sheet}
      onClose={() => close(null)}
    >
      {title && (
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetHeaderTitle}>{title}</Text>
        </View>
      )}
      {children}
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14
  },
  sheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: '600'
  }
});
