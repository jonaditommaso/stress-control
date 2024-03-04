import dayjs from 'dayjs';

export const generateDaysList = () => {
  const dayslist = [];

  const currentDate = dayjs();

  for (let i = -5; i <= 60; i++) {
    const date = dayjs().add(i, 'day');

    const dayObject = {
      dayNumber: date.date(),
      dayWeek: date.format('ddd'),
      month: date.format('MMMM'),
      date: date.format('DD/MM/YYYY')
    };

    if (date.isSame(currentDate, 'day')) {
      dayObject.currentDay = true;
    }

    dayslist.push(dayObject);
  }

  return dayslist;
};
