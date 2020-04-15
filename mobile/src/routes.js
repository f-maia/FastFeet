import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';
import Dashboard from '~/pages/Orders/Dashboard';
import Details from '~/pages/Orders/Details';
import ProblemsRegister from '~/pages/Orders/ProblemsRegister';
import ProblemsView from '~/pages/Orders/ProblemsView';
import ConfirmDelivery from '~/pages/Orders/ConfirmDelivery';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function Orders() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackImage: () => (
          <Icon name="keyboard-arrow-left" size={22} color="#fff" />
        ),
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
        },
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerStyle: {
          height: 40,
          backgroundColor: '#7D40E7',
          shadowColor: 'none',
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerTitle: 'Detalhes da encomenda' }}
      />
      <Stack.Screen
        name="ProblemsRegister"
        component={ProblemsRegister}
        options={{ headerTitle: 'Informar problema' }}
      />
      <Stack.Screen
        name="ProblemsView"
        component={ProblemsView}
        options={{ headerTitle: 'Visualizar problemas' }}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={{ headerTitle: 'Confirmar entrega' }}
      />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999999',
        style: {
          height: 70,
          padding: 15,
        },
        labelStyle: {
          marginBottom: 15,
        },
      }}
    >
      <BottomTab.Screen
        name="Orders"
        component={Orders}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color, size }) => (
            <Icon name="menu" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function Auth() {
  const isSigned = useSelector((state) => state.auth.signed);
  const component = isSigned ? Tabs : SignIn;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={component} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}
