import React from 'react';
import { StyleSheet, View } from 'react-native';

const Divider = () => <View style={styles.divider} />;

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#ccc'
  }
});
