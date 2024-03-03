import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import SecondaryButton from '../../../components/SecondaryButton';
// import PrimaryButton from '../../../components/PrimaryButton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { buttons } from './buttons';
import Divider from '../../../components/Divider';
import { MaterialIcons } from '@expo/vector-icons';
import CategoriesModal from '../../../components/CategoriesModal';
import { CATEGORIES } from '../../../utils/categories';
import { useTranslation } from 'react-i18next';
import Frequency from '../Frequency';
import { connect } from 'react-redux';
import { updateCurrentStress } from '../../../redux/actions';
import CustomModal from '../../../components/CustomModal';

const TaskModal = ({ visible, setVisible, tasks, setTasks, closeGeneralType, stress, stressSupport }) => {
  const [modalTask, setModalTask] = useState({});
  const [modalCategories, setModalCategories] = useState(false);
  const [categorySelected, setCategorySelected] = useState('task');
  // const [datePickerVisible, setDatePickerVisible] = useState(false);
  const textInputRef = useRef(null);
  const { t } = useTranslation();

  const { addTask, updateCurrentStress } = useActions();

  useEffect(() => {
    if (visible.open && textInputRef.current) {
      const timer = setTimeout(() => {
        textInputRef.current.focus();
      }, 100);

      return () => clearTimeout(timer);
    }

    return () => {
      setCategorySelected('task');
    };
  }, [visible.open]);

  const updateStress = () => {
    const { percent } = buttons.find(element => element.type === modalTask.type);
    const stressResult = (stressSupport * percent) / 100;
    updateCurrentStress(stress + stressResult);
  };

  const handleAddTask = () => {
    const task = { ...modalTask, status: 'pending', icon: categorySelected };
    // setTasks([task, ...tasks]);
    addTask(task);
    updateStress();
    setModalTask('');
    setVisible({ open: false });
    closeGeneralType(false);
  };

  const onChangeTask = (value, path) => {
    const currentTask = { ...modalTask };
    currentTask[`${path}`] = value;
    setModalTask(currentTask);
  };

  const categoryComponent = useMemo(() => {
    const category = CATEGORIES.find(category => category.name === categorySelected);
    return category;
  }, [categorySelected]);

  return (
    <View>
      <CategoriesModal visible={modalCategories} setVisible={setModalCategories} setCategorySelected={setCategorySelected} />

      <CustomModal
        visible={visible.open}
        setVisible={setVisible}
        fullModal
        height='100%'
        onClose={() => setVisible({ open: false })}
        onOk={handleAddTask}
        disabled={!modalTask.type || !modalTask.text}
        title={visible?.type === 'goal' ? t('new-task') : t('new-habit')}
      >
        <View style={styles.modal}>

          <View style={{ padding: 8 }}>

            <TextInput
              value={modalTask?.text}
              onChangeText={(value) => onChangeTask(value, 'text')}
              ref={textInputRef}
              style={styles.textInput}
              placeholder='Tarea'
            />
          </View>

          <View style={{ marginVertical: 5 }}>
            <Divider />
          </View>

          <Pressable onPress={() => setModalCategories(true)} style={styles.pressableContainer}>
            <View style={styles.categoryTitle}>
              <MaterialIcons name='category' size={24} color='black' />
              <Text style={styles.pressableText}>Category</Text>
            </View>
            <View style={styles.categorySelectedContainer}>
              <Text style={[styles.categorySelectedText, { color: categoryComponent.color }]}>
                {t(categoryComponent.name)}
              </Text>
              <View>
                {categoryComponent.icon}
              </View>
            </View>
          </Pressable>

          <View style={{ marginVertical: 5 }}>
            <Divider />
          </View>

          {
            visible?.type === 'habit'
              ? (
                <Frequency />
                )
              : (
                <Pressable onPress={() => console.log(true)} style={styles.pressableContainer}>
                  <View style={styles.categoryTitle}>
                    <MaterialIcons name='calendar-today' size={24} color='black' />
                    <Text style={styles.pressableText}>Fecha</Text>
                  </View>
                  <View>
                    <Text>12/02/2024</Text>
                  </View>
                </Pressable>
                )
          }

          <View style={{ marginVertical: 5 }}>
            <Divider />
          </View>

          <View style={styles.taskTypeContainer}>
            <Text style={styles.titleType}>{t('type-of-task')}</Text>
            <View style={styles.taskTypeOptions}>
              {buttons.map((button, index) => (
                <View key={index} style={{ margin: 5 }}>
                  <SecondaryButton
                    title={t(button.title)}
                    onChange={() => onChangeTask(button.type, 'type')}
                    selected={modalTask?.type === button.type}
                    customColor={button.customColor}
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginVertical: 5 }}>
            <Divider />
          </View>
        </View>
      </CustomModal>
    </View>

  );
};

const mapStateToProps = (state) => {
  return {
    stress: state.stress.stress,
    stressSupport: state.stressSupport.stressSupport
  };
};

export default connect(mapStateToProps, { updateCurrentStress })(TaskModal);

const styles = StyleSheet.create({
  modal: {
    // justifyContent: 'space-between',
    // height: '90%',
    width: '100%',
    flex: 1
  },
  textInput: {
    // borderBottomColor: '#212121',
    // borderBottomWidth: 1,
    borderColor: '#212121',
    borderWidth: 2,
    // width: 300,
    width: 350,
    fontSize: 18,
    // paddingTop: 10,
    padding: 7,
    borderRadius: 8,
    alignSelf: 'center',
    fontWeight: '500'
  },
  titleType: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  },
  // taskTypeContainer: {
  //   marginVertical: 5
  // },
  taskTypeOptions: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
    alignSelf: 'center'
  },
  pressableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pressableText: {
    fontSize: 18,
    marginLeft: 5
  },
  categorySelectedContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categorySelectedText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5
  }
});
