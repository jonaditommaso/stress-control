import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Statistics from './screens/Statistics';
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux';
import { getStressColors } from './utils/constants';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const Root = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </I18nextProvider>
  </Provider>
);

export default Root;

function App () {
  const stress = useSelector(state => state.stress.stress);
  const stressSupport = useSelector(state => state.stressSupport.stressSupport);
  const stressLevelsObject = useSelector(state => state.stressLevels.stressLevels);
  const { t } = useTranslation();

  const stressLevelsLength = Object.values(stressLevelsObject).filter(Boolean).length;

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Tasks'
          screenOptions={{
            tabBarStyle: { backgroundColor: getStressColors(stress, stressSupport, stressLevelsLength)[2] },
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
                backgroundColor: getStressColors(stress, stressSupport, stressLevelsLength)[0]
              },
              tabBarLabel: () => (
                <Text style={{ color: 'white', fontSize: 10 }}>{t('settings')}</Text>
              ),
              headerTitle: t('settings')
            }}
          />
          <Tab.Screen
            name='Tasks'
            component={Home}
            options={{
              tabBarIcon: ({ color }) => <FontAwesome5 name='list' size={24} color={color} />,
              headerStyle: {
                backgroundColor: getStressColors(stress, stressSupport, stressLevelsLength)[0]
              },
              tabBarLabel: () => (
                <Text style={{ color: 'white', fontSize: 10 }}>{t('tasks')}</Text>
              ),
              headerTitle: t('tasks')
            }}
          />
          <Tab.Screen
            name='Statistics'
            component={Statistics}
            options={{
              tabBarIcon: ({ color }) => <Octicons name='graph' size={24} color={color} />,
              headerStyle: {
                backgroundColor: getStressColors(stress, stressSupport, stressLevelsLength)[0]
              },
              tabBarLabel: () => (
                <Text style={{ color: 'white', fontSize: 10 }}>{t('statistics')}</Text>
              ),
              headerTitle: t('statistics')
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
