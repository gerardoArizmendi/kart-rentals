/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
import React from 'react';
import {Animated, Platform, Text, View} from 'react-native';

import {NavigationContainer, ParamListBase } from '@react-navigation/native';
// import {
//   CardStyleInterpolators,
//   createStackNavigator,
// } from '@react-navigation/stack';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigatorParamList} from './navigation-route';
import {navigationRef} from './navigation-utilities';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import OnBoardingScreen from '../screens/onboarding/onboarding.screen';
import AddOnsScreen from '../screens/AddOns.screen';
import WelcomeScreen from '../screens/Welcome.screen';
import RentalMapScreen from '../screens/RentalMap.screen';
//import RegistrationScreen from '../screens/Registration.screen';
import PaymentScreen from '../screens/Payment.screen';
import ReviewScreen from '../screens/Review.screen';
import ConfirmationScreen from '../screens/Confirmation.screen';
import LandingScreen from '../screens/Landing.screen';
import DetailsScreen from '../screens/Details.screen';
import {colors} from '../theme/colors';
import {scale} from '../theme/scale';
import {createStyle} from './navigation.styles';

type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});
const Stack = createNativeStackNavigator<NavigatorParamList>();
const Tab = createBottomTabNavigator<NavigatorParamList>();

const TabStack = () => {
  const styles = createStyle();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        keyboardHidesTabBar: true,
        tabBarIcon: ({focused, size}) => {
          let iconName: string = 'camera';
          let tabName: string = 'Home';
          if (route.name == 'OnBoardingScreen') {
            iconName = focused ? 'camera' : 'camera';
            tabName = 'Camera';
          }
          return (
            <View style={styles.tabContainer}>
              <MaterialCommunityIcons
                name={iconName}
                size={scale(focused ? 25 : 23)}
                color={focused ? colors.white : colors.icon}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.textStyle,
                  {
                    fontWeight: focused ? '600' : '400',
                    color: focused ? colors.white : colors.icon,
                  },
                ]}>
                {tabName}
              </Text>
            </View>
          );
        },
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: scale(12),
        },
        lazy: false,
        tabBarStyle: {
          height:
            Platform.OS == 'ios'
              ? scale(50 + useSafeAreaInsets().bottom)
              : scale(60),
          backgroundColor: colors.black,
        },
      })}
      initialRouteName={'OnBoardingScreen'}>
      <Tab.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{tabBarLabel: 'Onboarding', tabBarShowLabel: false}}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
      />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
      />
       <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="RentalMapScreen"
        component={RentalMapScreen}
      />
      <Stack.Screen name="AddOnsScreen" component={AddOnsScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />

    </Stack.Navigator>
  );
};

// const CombinedStack = () => {
//   const isAuthenticated = false;
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false, animationEnabled: true}}>
//       <Stack.Screen
//         name="auth"
//         options={{
//           cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//         }}
//         component={isAuthenticated ? TabStack : AuthStack}
//       />
//       <Stack.Screen
//         name="tabStack"
//         component={TabStack}
//         options={{
//           cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//         }}
//       />
//       <Stack.Screen
//         name="authStack"
//         component={AuthStack}
//         options={{
//           cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//         }}
//       />
//       <Stack.Screen
//         name="rootStack"
//         component={RootStack}
//         options={{
//           cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

const CombinedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{ headerShown: false, animation: 'slide_from_right'}}
    >      
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="RentalMapScreen"
        component={RentalMapScreen}
      />
      <Stack.Screen name="AddOnsScreen" component={AddOnsScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      {/* keep your other stacks here if/when you need them */}
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
      />
    </Stack.Navigator>
  );
};


export function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer
      // cast so TypeScript knows this ref is acceptable here
      ref={navigationRef as React.Ref<import('@react-navigation/native').NavigationContainerRef<any>>}
      {...props}
    >
      {CombinedStack()}
    </NavigationContainer>
  );
}
