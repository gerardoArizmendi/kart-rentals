import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
//import { RootStackParamList } from '../navigators/app-navigator';
import { NavigatorParamList } from '../navigators/navigation-route';

//type Props = NativeStackScreenProps<RootStackParamList, 'RentalMap'>;
type Props = NativeStackScreenProps<NavigatorParamList, 'RentalMapScreen'>;

export default function RentalMapScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Map placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[Map Placeholder]</Text>
      </View>

      {/* Continue */}
      <TouchableOpacity
        style={styles.nextButton}
        //onPress={() => alert('Proceed to details')}
      >
        <Text style={styles.nextText}>Select Cart & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  back: { color: '#10B981', fontSize: 16, fontWeight: '500' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: { color: '#6B7280' },
  nextButton: {
    backgroundColor: '#10B981',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  nextText: { color: '#FFF', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
