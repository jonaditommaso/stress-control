import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Repeat = ({ setFrequencyValue }) => {
  const [repeatValue, setRepeatValue] = useState('2');
  const textInputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (textInputRef.current) {
      const timer = setTimeout(() => {
        textInputRef.current.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [textInputRef]);

  const changeFrequencyValue = (text) => {
    setFrequencyValue(prev => {
      return {
        ...prev,
        value: text
      };
    });
  };

  useEffect(() => {
    changeFrequencyValue(repeatValue);
  }, []);

  const handleChangeValue = (text) => {
    if (parseInt(text) < 1) {
      setRepeatValue('1');
      changeFrequencyValue(text);
    } else {
      setRepeatValue(text);
      changeFrequencyValue(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: 'gray' }}>{t('every')}</Text>

      <TextInput
        value={repeatValue}
        onChangeText={handleChangeValue}
        keyboardType='numeric'
        ref={textInputRef}
        style={{ textAlign: 'center', fontSize: 18, fontWeight: '600', width: 40, borderBottomWidth: 1, padding: 0 }}
      />

      <Text style={{ fontSize: 16, color: 'gray' }}>{t('days')}</Text>
    </View>
  );
};

export default Repeat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 30,
    alignItems: 'center'
  }
});
