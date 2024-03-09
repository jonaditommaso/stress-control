import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../../utils/categories';
import { useTranslation } from 'react-i18next';
import CustomModal from '../CustomModal';

const CategoriesModal = ({ visible, setVisible, setCategorySelected }) => {
  const { t } = useTranslation();

  const handleOnPress = (category) => {
    setCategorySelected(category);
    setVisible(false);
  };

  return (
    <CustomModal height={470} visible={visible} setVisible={setVisible} onClose={() => setVisible(false)} title={t('choose-category')}>
      <FlatList
        data={CATEGORIES}
        numColumns={3}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View key={item.name} style={styles.categoryContainer}>
            <Pressable style={styles.iconContainer} onPress={() => handleOnPress(item.name)}>
              {item.icon}
            </Pressable>
            <Text style={styles.categoryText}>{t(item.name)}</Text>
          </View>
        )}
      />
    </CustomModal>
  );
};

export default CategoriesModal;

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    backgroundColor: '#21212111',
    borderRadius: 8,
    width: 50,
    alignSelf: 'center',
    alignItems: 'center'
  },
  categoryContainer: {
    width: 60,
    margin: 10
  },
  categoryText: {
    textAlign: 'center',
    fontWeight: '600'
  }

});
