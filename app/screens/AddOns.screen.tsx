// app/screens/AddOns.screen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';
import { scale } from '../theme/scale';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorParamList } from '../navigators/navigation-route';
const { width } = Dimensions.get('window');
type Props = NativeStackScreenProps<NavigatorParamList, 'AddOnsScreen'>;
export default function AddOnsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={scale(24)}
            color={colors.textDark}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Add-ons</Text>
        <View style={{ width: scale(24) }} />
      </View>

      {/* Empty content area */}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          (No add-ons available yet)
        </Text>
      </View>

      {/* Save button */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => navigation.navigate('ReviewScreen')}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      {/* Pagination dots */}
      <View style={styles.dotsRow}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === 3 && { backgroundColor: colors.grayLight }, // last page inactive
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundLight },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scale(18),
    fontWeight: '600',
    color: colors.primaryDark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: scale(14),
    color: colors.grayLight,
  },
  saveBtn: {
    backgroundColor: colors.primaryDark,
    marginHorizontal: scale(16),
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  saveText: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: scale(12),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: colors.primaryDark,
    marginHorizontal: scale(4),
  },
});
