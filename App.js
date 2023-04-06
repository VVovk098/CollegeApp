import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigation } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";


//імпорт екранів
import Login from "./screens/LoginScreen";
import Registration from "./screens/RegisterScreen";
import Start from "./screens/StartScreen";
import SubjectList from "./screens/SubjectList";
import MainScreen from "./screens/MainScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddScheduleScreen from "./screens/AddScheduleScreen";
import ScheduleScreen from "./screens/ScheduleScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase
      .auth()
      .onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ title: "Ласкаво просимо!", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Вхід" }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: "Реєстрація" }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator initialRouteName="MainScreen">
      <Tab.Screen
        name="AddScheduleScreen"
        component={AddScheduleScreen}
        options={{
          title: "Додати розклад",
          tabBarLabel: 'Додати розклад',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/calendar.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ScheduleScreen "
        component={ScheduleScreen}
        options={{
          title: "Розклад занять",
          tabBarLabel: 'Розклад',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/schedule.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
     
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "Мої предмети",
          tabBarLabel: 'Предмети',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/book.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SubjectList"
        component={SubjectList}
        options={{
          title: "Завдання",
          tabBarLabel: 'Завдання',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/clipboard.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Профіль",
          tabBarLabel: 'Профіль',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/user.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
