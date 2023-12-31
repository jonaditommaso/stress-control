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
import { Provider, useSelector } from 'react-redux';
import { store } from './redux';
import { getStressColors } from './utils/constants';

const Tab = createBottomTabNavigator();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;

function App () {
  const stress = useSelector(state => state.stress.stress);

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
        <Tab.Navigator
          initialRouteName='Home' screenOptions={{
            tabBarStyle: { backgroundColor: getStressColors(stress)[2] },
            tabBarLabelStyle: { color: 'white' },
            tabBarActiveTintColor: 'white',
            tabBarActiveColor: 'white'
          }}
        >
          <Tab.Screen
            name='Settings'
            component={Settings}
            options={{
              tabBarIcon: ({ color }) => <Ionicons name='ios-settings-outline' size={24} color={color} />,
              headerStyle: {
                backgroundColor: getStressColors(stress)[0]
              }
            }}
          />
          <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: ({ color }) => <FontAwesome5 name='list' size={24} color={color} />,
              headerStyle: {
                backgroundColor: getStressColors(stress)[0]
              }
            }}
          />
          <Tab.Screen
            name='Advices'
            component={Advices}
            options={{
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name='list-status' size={24} color={color} />,
              headerStyle: {
                backgroundColor: getStressColors(stress)[0]
              }
            }}
          />
          <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
              tabBarIcon: ({ color }) => <Ionicons name='person-circle-outline' size={28} color={color} />,
              headerStyle: {
                backgroundColor: getStressColors(stress)[0]
              }
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
