import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TimeSpent = () => {
  const [borderStyle, setBorderStyle] = useState('solid');

  const updateBorderStyle = () => {
    const now = new Date();
    const hours = now.getHours();

    // Cambiar el estilo del borde a punteado después de las 12 PM (por ejemplo)
    setBorderStyle(hours >= 16 ? 'dashed' : 'solid');
  };

  useEffect(() => {
    // Actualizar el estilo del borde cada minuto
    const intervalId = setInterval(updateBorderStyle, 60000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);
  return (
    <View style={styles.circleContainer}>
      <View style={[styles.circle, { borderStyle }]}>
        <Text style={styles.text}>Estrés</Text>
      </View>
    </View>
  );
};

export default TimeSpent;

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: 'darkgreen',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Virgil'
  }
});
