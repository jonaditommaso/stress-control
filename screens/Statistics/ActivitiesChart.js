import { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { CATEGORIES } from '../../utils/categories';
import { useTranslation } from 'react-i18next';

const ActivitiesChart = ({ tasks }) => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const iconCount = {};
    const currentTasks = [...tasks];

    currentTasks.forEach(task => {
      if (iconCount[task.icon]) {
        iconCount[task.icon]++;
      } else {
        iconCount[task.icon] = 1;
      }
    });

    const result = Object.entries(iconCount).map(([icon, count]) => {
      const category = CATEGORIES.find(category => category.name === icon);
      return {
        name: t(icon),
        count,
        color: category.color,
        legendFontColor: '#212121',
        legendFontSize: 15
      };
    });

    setData(result);
  }, [tasks, t]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5
  };

  return (
    <PieChart
      data={data}
      width={380}
      height={250}
      chartConfig={chartConfig}
      accessor='count'
      backgroundColor='#fff'
      center={[20, 0]}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        elevation: 5,
        shadowOffset: {
          width: 3,
          height: 3
        },
        shadowOpacity: 1
      }}
      // absolute
    />
  );
};

export default ActivitiesChart;
