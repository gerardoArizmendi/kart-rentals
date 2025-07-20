import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../navigators/navigation-route';

type Props = NativeStackScreenProps<NavigatorParamList, 'WelcomeScreen'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Golf Kart Rental</Text>
      <Text style={styles.subtitle}>
        Rent a golf cart in seconds and enjoy your day on the course.
      </Text>
      <TouchableOpacity
        style={styles.button}
        //onPress={() => navigation.navigate('RentalMap')}
      >
        <Text style={styles.buttonText}>Start Renting</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: { fontSize: 32, fontWeight: '700', color: '#065F46', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#064E3B', textAlign: 'center', marginBottom: 24 },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
