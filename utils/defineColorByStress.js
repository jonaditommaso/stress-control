const colors = [
  { color: '#19ee04', name: 'low' },
  { color: '#feda04', name: 'medium' },
  { color: '#d00d03', name: 'high' }
];

export const defineColorByStress = (stressValue) => {
  if (stressValue >= 60 && stressValue < 80) return colors[1];
  if (stressValue >= 80) return colors[2];

  return colors[0];
};
