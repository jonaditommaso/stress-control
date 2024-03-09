import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SecondaryButton from '../../../components/SecondaryButton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import Divider from '../../../components/Divider';
import { MaterialIcons } from '@expo/vector-icons';
import CategoriesModal from '../../../components/CategoriesModal';
import { CATEGORIES } from '../../../utils/categories';
import { useTranslation } from 'react-i18next';
import Frequency from '../Frequency';
import { connect } from 'react-redux';
import { updateCurrentStress } from '../../../redux/actions';
import CustomModal from '../../../components/CustomModal';
import DatePicker from '../../../components/DatePicker';
import dayjs from 'dayjs';
import DateSelection from './DateSelection';
import { ACTIVITIES_TYPE } from '../../../utils/constants';

const TaskModal = ({ visible, setVisible, closeGeneralType, stress, stressSupport }) => {
  const [modalTask, setModalTask] = useState({});
  const [modalCategories, setModalCategories] = useState(false);
  const [categorySelected, setCategorySelected] = useState('task');
  const [dateSelected, setDateSelected] = useState(undefined);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
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
    const { percent } = ACTIVITIES_TYPE.find(element => element.type === modalTask.type);
    const stressResult = (stressSupport * percent) / 100;
    updateCurrentStress(stress + stressResult);
  };

  const handleAddTask = () => {
    const task = {
      ...modalTask,
      status: 'pending',
      icon: categorySelected,
      activity: visible.activity,
      date: dateSelected
        ? dayjs(dateSelected).format('DD/MM/YYYY')
        : visible.activity === 'habit'
          ? dayjs().format('DD/MM/YYYY')
          : undefined,
      ...(visible.activity === 'habit' && !modalTask.frequency && { frequency: { type: 'all-days', value: undefined } })
    };
    addTask(task);
    updateStress();
    setModalTask('');
    setVisible({ open: false });
    closeGeneralType(false);
    setDateSelected(undefined);
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
      <CategoriesModal
        visible={modalCategories}
        setVisible={setModalCategories}
        setCategorySelected={setCategorySelected}
      />

      <DatePicker
        visible={datePickerVisible}
        setVisible={setDatePickerVisible}
        setDateSelected={setDateSelected}
      />

      <CustomModal
        visible={visible.open}
        setVisible={setVisible}
        animationType='slide'
        fullModal
        height='100%'
        onClose={() => setVisible({ open: false })}
        onOk={handleAddTask}
        disabled={!modalTask.type || !modalTask.text}
        title={visible?.activity === 'task' ? t('new-task') : t('new-habit')}
      >
        <View style={styles.modal}>

          <View style={{ padding: 8 }}>

            <TextInput
              value={modalTask?.text}
              onChangeText={(value) => onChangeTask(value, 'text')}
              ref={textInputRef}
              style={styles.textInput}
              placeholder={visible?.activity === 'task' ? t('task') : t('habit')}
            />
          </View>

          <View style={{ marginVertical: 5 }}>
            <Divider />
          </View>

          <TouchableOpacity onPress={() => setModalCategories(true)} style={styles.pressableContainer}>
            <View style={styles.categoryTitle}>
              <MaterialIcons name='category' size={24} color='black' />
              <Text style={styles.pressableText}>{t('category')}</Text>
            </View>
            <View style={styles.categorySelectedContainer}>
              <Text style={[styles.categorySelectedText, { color: categoryComponent.color }]}>
                {t(categoryComponent.name)}
              </Text>
              <View>
                {categoryComponent.icon}
              </View>
            </View>
          </TouchableOpacity>

          <View style={{ marginVertical: 5 }}>
            <Divider />
          </View>

          {visible?.activity === 'habit' && (
            <View>
              <Frequency setTask={setModalTask} />
              <View style={{ marginVertical: 5 }}>
                <Divider />
              </View>
            </View>
          )}

          <DateSelection
            dateSelected={dateSelected}
            setDatePickerVisible={setDatePickerVisible}
            activity={visible.activity}
          />

          <View style={{ marginVertical: 5 }}>
            <Divider />
          </View>

          <View style={styles.taskTypeContainer}>
            <Text style={styles.titleType}>{t('type-of-task')}</Text>
            <View style={styles.taskTypeOptions}>
              {ACTIVITIES_TYPE.map((button, index) => (
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
    width: '100%',
    flex: 1
  },
  textInput: {
    borderColor: '#212121',
    borderWidth: 2,
    width: 350,
    fontSize: 18,
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
  taskTypeOptions: {
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
