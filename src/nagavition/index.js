import { View, Text, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ProductList from '../screens/tabs/ListProduct';
import ProductDetailScreen from '../screens/tabs/ProductDetailScreen';
import PaymentScreen from '../screens/tabs/PaymentScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import TableSelectionScreen from '../screens/tabs/TableSelectionScreen';
import OTPVerification from '../screens/auth/OTPVerificationScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import UpdatePasswordScreen from '../screens/auth/UpdatePasswordScreen';
import SCREENS from '../screens';
import IMAGES from '../assets/images';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StackNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREENS.HOME} component={TabNavigation} />
        <Stack.Screen name={SCREENS.SIGNUP} component={SignupScreen} />
        <Stack.Screen name={SCREENS.PRODUCTLIST} component={ProductList} />
        <Stack.Screen name={SCREENS.PRODUCTDETAIL} component={ProductDetailScreen} />
        <Stack.Screen name={SCREENS.PAYMENT} component={PaymentScreen} />
        <Stack.Screen name={SCREENS.TABLESELECTION} component={TableSelectionScreen} />
        <Stack.Screen name={SCREENS.CONFIRMEMAIL} component={OTPVerification} />
        <Stack.Screen name={SCREENS.UPDATEPASS} component={UpdatePasswordScreen} />
      </Stack.Navigator>
  )
}
const TabNavigation = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={SCREENS.HOME}>
    <Tab.Screen 
      name={SCREENS.HOME} 
      component={HomeScreen} 
      options={{
        title: 'Home',
        tabBarIcon: ({focused}) => (
          <Image source={IMAGES.HOME} 
          style={{
            width: 30, 
            height: 30, 
            tintColor: focused ? COLORS.ORANGE : COLORS.BLACK
          }}/>
        ),
        tabBarActiveTintColor: COLORS.ORANGE,
        tabBarInactiveTintColor: COLORS.BLACK,
      }}
    />
    <Tab.Screen 
      name={SCREENS.TABLESELECTION} 
      component={TableSelectionScreen} 
      options={{
        title: 'Table',
        tabBarIcon: ({focused}) => (
          <Image source={IMAGES.WISHLIST} 
          style={{
            width: 30, 
            height: 30, 
            tintColor: focused ? COLORS.ORANGE : COLORS.BLACK
          }}/>
        ),
        tabBarActiveTintColor: COLORS.ORANGE,
        tabBarInactiveTintColor: COLORS.BLACK,
      }}
    />
    <Tab.Screen 
      name={SCREENS.PROFILEME} 
      component={ProfileScreen} 
      options={{
        title: 'Profile',
        tabBarIcon: ({focused}) => (
          <Image source={IMAGES.PROFILE} style={{
            width: 30, 
            height: 30, 
            tintColor: focused ? COLORS.ORANGE : COLORS.BLACK 
          }}/>
        ),
        tabBarActiveTintColor: COLORS.ORANGE,
        tabBarInactiveTintColor: COLORS.BLACK,
      }}
    />
  </Tab.Navigator>
  )
}

export default StackNavigation