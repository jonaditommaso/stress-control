import { StyleSheet, TextInput } from 'react-native';
import CustomModal from '../CustomModal';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { editTask } from '../../redux/actions';
import { useActions } from '../../hooks/useActions';
import { useTranslation } from 'react-i18next';

const EditModal = ({ visible, setVisible, taskToEdit = {}, currentTasks = {}, index, closeSwipeable }) => {
  const [taskName, setTaskName] = useState('');
  const { t } = useTranslation();

  const { editTask } = useActions();

  useEffect(() => {
    if (!taskName && taskToEdit.text) setTaskName(taskToEdit.text);
  }, [taskToEdit.text]);

  const onOk = () => {
    const tasks = [...currentTasks.tasks];
    const currentTask = { ...taskToEdit };
    currentTask.text = taskName;
    tasks.splice(index, 1, currentTask);
    editTask(tasks);
    setVisible(false);
    closeSwipeable();
  };

  const onClose = () => {
    setVisible(false);
    closeSwipeable();
  };

  return (
    <CustomModal height={130} visible={visible} setVisible={setVisible} onClose={onClose} onOk={onOk}>
      <TextInput
        value={taskName}
        onChangeText={setTaskName}
        style={styles.textInput}
        placeholder={t(taskToEdit.activity)}
      />
    </CustomModal>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTasks: state.tasks
  };
};

export default connect(mapStateToProps, { editTask })(EditModal);

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#212121',
    borderWidth: 2,
    width: 300,
    fontSize: 18,
    padding: 7,
    borderRadius: 8,
    alignSelf: 'center',
    fontWeight: '500'
  }
});
