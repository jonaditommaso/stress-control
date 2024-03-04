import React, { useState } from 'react';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import CustomModal from '../CustomModal';

const DatePicker = ({ visible, setVisible, setDateSelected }) => {
  const [date, setDate] = useState(dayjs());

  const handleSelect = (dateSelected) => {
    setDate(dateSelected);
  };

  const onOk = () => {
    setDateSelected(date);
    setVisible(false);
    setDate(dayjs());
  };

  const onCancel = () => {
    setVisible(false);
    setDate(dayjs());
  };

  return (
    <CustomModal visible={visible} setVisible={setVisible} onClose={onCancel} onOk={onOk}>
      <DateTimePicker
        mode='single'
        date={date}
        onChange={(params) => handleSelect(params.date)}
        selectedItemColor='#212121'
      />
    </CustomModal>
  );
};

export default DatePicker;
