import React, { useState } from 'react';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { bootstrap } from './src/bootstrap';
import { MainScreen } from './src/screens/MainScreen';
import { PostScreen } from './src/screens/PostScreen';
import { BookedScreen } from './src/screens/BookedScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { CreateScreen } from './src/screens/CreateScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { THEME } from './src/theme';

const navigatorOptions = () => ({
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
});

const Stack = createStackNavigator();
const Booked = createStackNavigator();
const Tab =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Create = createStackNavigator();
const About = createStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const StackNavigator = () => (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={navigatorOptions}
    >
      <Stack.Screen name="About" component={DrawerNavigator} />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={MainScreen.options}
      />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={PostScreen.options}
      />
    </Stack.Navigator>
  );

  const BookedNavigator = () => (
    <Booked.Navigator
      initialRouteName="BookedScreen"
      screenOptions={navigatorOptions}
    >
      <Booked.Screen name="BookedScreen" component={BookedScreen} />
      <Booked.Screen
        name="PostScreen"
        component={PostScreen}
        options={PostScreen.options}
      />
    </Booked.Navigator>
  );

  const BottomTabNavigator = () => (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
      }}
      shifting={true}
      activeTintColor={'#fff'}
      barStyle={{
        backgroundColor: Platform.OS === 'android' && THEME.MAIN_COLOR,
      }}
    >
      <Tab.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={({ route }) => ({
          tabBarLabel: 'All',
          tabBarIcon: (info) => (
            <Ionicons name="ios-albums" size={25} color={info.tintColor} />
          ),
        })}
      />
      <Tab.Screen
        name="BookedNavigator"
        component={BookedNavigator}
        options={({ route }) => ({
          tabBarLabel: 'Selected',

          tabBarIcon: (info) => (
            <Ionicons name="ios-star" size={25} color={info.tintColor} />
          ),
        })}
      />
    </Tab.Navigator>
  );

  const CreateNavigator = () => (
    <Create.Navigator>
      <Create.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={CreateScreen.options}
      />
    </Create.Navigator>
  );

  const AboutNavigator = () => (
    <About.Navigator>
      <About.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={AboutScreen.options}
      />
    </About.Navigator>
  );

  const DrawerNavigator = () => (
    <Drawer.Navigator
      initialRouteName="BookedScreen"
      drawerContentOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {
          fontFamily: 'open-bold',
        },
      }}
    >
      <Drawer.Screen
        name="Blog"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutNavigator}
        options={{ drawerLabel: 'About App' }}
      />
      <Drawer.Screen
        name="Create"
        component={CreateNavigator}
        options={{ drawerLabel: 'New Post' }}
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
