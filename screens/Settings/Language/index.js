import { Pressable, StyleSheet, View } from 'react-native';
import Flag from 'react-native-flags';
import BottomSheet from '../../../components/BottomSheet';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18next';

const languages = [
  { code: 'ES', language: 'es' },
  { code: 'US', language: 'en' }
];

const Language = ({ close }) => {
  const { t } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <View>
      <BottomSheet close={close} title={t('language')} size={150}>
        <View style={styles.container}>
          {languages.map(language => (
            <View style={[styles.containerFlag, language.language === i18n.language && styles.selectedLanguage]} key={language.code}>
              <Pressable onPress={() => changeLanguage(language.language)}>
                <Flag
                  code={language.code}
                  size={48}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  containerFlag: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 60,
    height: 50,
    alignSelf: 'center',
    borderRadius: 6
  },
  selectedLanguage: {
    borderWidth: 2,
    borderColor: '#212121'
  }
});
