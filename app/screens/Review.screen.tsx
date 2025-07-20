// app/screens/Review.screen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';
import { scale } from '../theme/scale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorParamList } from '../navigators/navigation-route';

type Props = NativeStackScreenProps<NavigatorParamList, 'ReviewScreen'>;
const { width } = Dimensions.get('window');

const sampleCarts = [
  { id: '1', image: require('../assets/images/kart1.png'), type: '2-Seater', qty: 1, price: 123, time: '2pm to 4pm, 10th Apr' },
  { id: '2', image: require('../assets/images/kart2.png'), type: '4-Seater', qty: 2, price: 123, time: '2pm to 4pm, 10th Apr' },
  { id: '3', image: require('../assets/images/kart3.png'), type: '2-Seater', qty: 1, price: 123, time: '2pm to 4pm, 10th Apr' },
];

export default function ReviewScreen({ navigation }: Props) {
  // calculate fees
  const base = sampleCarts.reduce((sum, c) => sum + c.price * c.qty, 0);
  const tax = +(base * 0.1).toFixed(1);
  const deposit = 50;
  const total = +(base + tax + deposit).toFixed(1);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile */}
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.card}>
          <Text style={styles.profileText}>Abishek Jay • +1-778-123-1234 • abishek123@gmail.com</Text>
          <Text style={styles.profileText}>8888 University Drive, Burnaby, B.C.</Text>
          <Text style={styles.profileText}>Driver’s License: AA12345</Text>
          <Text style={styles.profileText}>Identity Document: BB12345</Text>
          <TouchableOpacity style={styles.editRow}>
            <MaterialCommunityIcons name="pencil" size={scale(16)} color={colors.primaryDark}/>
            <Text style={[styles.profileText, { color: colors.primaryDark, marginLeft: scale(4) }]}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Review booking */}
        <Text style={styles.sectionTitle}>Review booking</Text>
        {sampleCarts.map(c => (
          <View key={c.id} style={styles.card}>
            <View style={styles.reviewRow}>
              <Image source={c.image} style={styles.kartThumb} />
              <View style={{ flex: 1, marginLeft: scale(12) }}>
                <Text style={styles.reviewText}>{`Type: ${c.type}`}</Text>
                <Text style={styles.reviewText}>{`Price: $${c.price} / day`}</Text>
                <Text style={styles.reviewText}>{`Time: ${c.time}`}</Text>
              </View>
              <View style={styles.qtyRow}>
                <Text style={styles.reviewText}>−</Text>
                <Text style={styles.reviewText}>{c.qty}</Text>
                <Text style={styles.reviewText}>+</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Taxes and Fees */}
        <Text style={styles.sectionTitle}>Taxes and Fees</Text>
        <View style={styles.card}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>{`Kart base rental x${sampleCarts.length}`}</Text>
            <Text style={styles.feeValue}>{`$${base}`}</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Service tax (10%)</Text>
            <Text style={styles.feeValue}>{`$${tax}`}</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Kart deposit</Text>
            <View style={styles.infoRow}>
              <Text style={styles.feeValue}>{`$${deposit}`}</Text>
              <MaterialCommunityIcons name="information" size={scale(14)} color={colors.grayLight}/>
            </View>
          </View>
          <View style={[styles.feeRow, { marginTop: scale(8) }]}>
            <Text style={[styles.feeLabel, { fontWeight: '600' }]}>Total</Text>
            <Text style={[styles.feeValue, { fontWeight: '600' }]}>{`$${total}`}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm button */}
      <TouchableOpacity style={styles.confirmBtn} onPress={() => navigation.navigate('PaymentScreen')}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>

      {/* Pagination dots */}
      <View style={styles.dotsRow}>
        {[0, 1, 2, 3].map(i => (
          <View
            key={i}
            style={[
              styles.dot,
              i === 3 && { backgroundColor: colors.grayLight }, // last page inactive
            ]}
          />
        ))}
      </View>

      {/* Back arrow */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={scale(24)} color={colors.textDark}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundLight },
  scroll: { padding: scale(16), paddingBottom: scale(100) },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: colors.primaryDark,
    marginVertical: scale(8),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(12),
  },
  profileText: { fontSize: scale(12), color: colors.textDark, marginBottom: scale(4) },
  editRow: { flexDirection: 'row', alignItems: 'center', marginTop: scale(4) },
  reviewRow: { flexDirection: 'row', alignItems: 'center' },
  kartThumb: { width: scale(60), height: scale(40), backgroundColor: colors.grayLightest },
  reviewText: { fontSize: scale(12), color: colors.textDark, marginBottom: scale(2) },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scale(50),
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(4),
  },
  feeLabel: { fontSize: scale(12), color: colors.textDark },
  feeValue: { fontSize: scale(12), color: colors.textDark },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  confirmBtn: {
    position: 'absolute',
    bottom: scale(50),
    left: scale(16),
    right: scale(16),
    backgroundColor: colors.primaryDark,
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  confirmText: { color: colors.white, fontSize: scale(16), fontWeight: '600' },
  dotsRow: {
    position: 'absolute',
    bottom: scale(16),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: colors.primaryDark,
    marginHorizontal: scale(4),
  },
  backBtn: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
  },
});
