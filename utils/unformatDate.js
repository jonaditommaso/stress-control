export const unformatDate = (date) => {
  const splitDate = date.split('/');

  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
};
