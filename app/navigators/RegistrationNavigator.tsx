import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from '../screens/Registration.screen';

export type RegistrationStackParamList = {
  Registration: undefined;
};

const Stack = createNativeStackNavigator<RegistrationStackParamList>();

export default function RegistrationNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown:false, animation: 'slide_from_right' }}
      initialRouteName="Registration"
    >
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}