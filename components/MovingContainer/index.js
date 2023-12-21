import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const MovingComponent = ({ children, move }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 40, // Altura del movimiento ascendente
          duration: 500, // Duración de la animación en ms
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0, // Altura del movimiento descendente
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 400 }}>
      <Animated.View
        style={{
        //   width: 50,
          height: 300,
          backgroundColor: '#fafafa',
          ...(move && { transform: [{ translateY }] })
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default MovingComponent;
