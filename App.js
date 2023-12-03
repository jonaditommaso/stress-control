import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Advices from './screens/Advices';
import Profile from './screens/Profile';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function App () {
  const [fontsLoaded] = useFonts({
    Virgil: require('./assets/fonts/Virgil.ttf')
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home'>
          <Tab.Screen
            name='Settings'
            component={Settings}
            options={{
              tabBarIcon: () => <Ionicons name='ios-settings-outline' size={24} color='black' />
            }}
          />
          <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: () => <FontAwesome5 name='list' size={24} color='black' />
            }}
          />
          <Tab.Screen
            name='Advices'
            component={Advices}
            options={{
              tabBarIcon: () => <MaterialCommunityIcons name='list-status' size={24} color='black' />
            }}
          />
          <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
              tabBarIcon: () => <Ionicons name='person-circle-outline' size={28} color='black' />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  }
});
