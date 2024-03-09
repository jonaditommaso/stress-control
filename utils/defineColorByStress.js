const colors = [
  { color: '#19ee04', name: 'low' },
  { color: '#feda04', name: 'medium' },
  { color: '#FB8B24', name: 'moderately-high' },
  { color: '#d00d03', name: 'high' }
];

export const defineColorByStress = (stressValue, lengthLevels) => {
  if (stressValue >= 60 && stressValue < 80) return colors[1];
  if (lengthLevels === 4 && stressValue >= 80 && stressValue < 100) return colors[2];
  if (stressValue >= 80) return colors[3];

  return colors[0];
};
