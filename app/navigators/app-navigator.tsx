// app/navigators/app-navigator.tsx
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator }   from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import OnBoardingScreen   from '../screens/onboarding/onboarding.screen';
import WelcomeScreen      from '../screens/Welcome.screen';
import RentalMapScreen    from '../screens/RentalMap.screen';
import AddOnsScreen       from '../screens/AddOns.screen';
import PaymentScreen      from '../screens/Payment.screen';
import ReviewScreen       from '../screens/Review.screen';
import ConfirmationScreen from '../screens/Confirmation.screen';
import LandingScreen      from '../screens/Landing.screen';
import DetailsScreen      from '../screens/Details.screen';

import { colors } from '../theme/colors';
import { scale }  from '../theme/scale';
import { createStyle } from './navigation.styles';
import { NavigatorParamList } from './navigation-route';

const Stack = createNativeStackNavigator<NavigatorParamList>();
const Tab   = createBottomTabNavigator<NavigatorParamList>();

function TabStack() {
  const styles = createStyle();
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="OnBoardingScreen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: Platform.OS === 'ios'
            ? scale(50 + insets.bottom)
            : scale(60),
          backgroundColor: colors.black,
        },
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="camera"
            size={scale(focused ? 25 : 23)}
            color={focused ? colors.white : colors.icon}
          />
        ),
        tabBarItemStyle: {
          justifyContent:'center', alignItems:'center', paddingTop: scale(12)
        },
      }}
    >
      <Tab.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ tabBarShowLabel:false }}
      />
      {/* more tabs as needed */}
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{ headerShown:false, animation:'slide_from_right' }}
    >
      {/* post-login flow */}
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />

      {/* booking steps */}
      <Stack.Screen name="WelcomeScreen"      component={WelcomeScreen} />
      <Stack.Screen name="RentalMapScreen"    component={RentalMapScreen} />
      <Stack.Screen name="AddOnsScreen"       component={AddOnsScreen} />
      <Stack.Screen name="PaymentScreen"      component={PaymentScreen} />
      <Stack.Screen name="ReviewScreen"       component={ReviewScreen} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />

      {/* an optional tabbed home */}
    </Stack.Navigator>
  );
}