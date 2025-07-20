// app/screens/Confirmation.screen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';
import { scale } from '../theme/scale';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorParamList } from '../navigators/navigation-route';

type Props = NativeStackScreenProps<NavigatorParamList, 'ConfirmationScreen'>;
const { width } = Dimensions.get('window');

export default function ConfirmationScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Title */}
        <Text style={styles.title}>Booking Confirmation</Text>

        {/* Instructions Box */}
        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>
            Please present this code at pickup.{'\n'}
            Pickup address: 123 Golf Course Road
          </Text>
        </View>

        {/* QR Code */}
        <View style={styles.qrWrapper}>
          <Image
            // Replace with your generated QR
            source={require('../assets/images/qr-placeholder.jpeg')}
            style={styles.qrImage}
          />
        </View>

        {/* Booking Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>Mexico City · 26 Apr · 1:30 pm</Text>
          <Text style={styles.summaryText}>Golf · Black · Luxury</Text>
          <Text style={styles.summaryText}>$123.45</Text>
          <Text style={styles.summaryText}>Reference number: Abcd1234</Text>
        </View>

        {/* Share Row */}
        <Text style={styles.shareLabel}>Share</Text>
        <View style={styles.shareRow}>
          {['whatsapp', 'facebook', 'twitter', 'email'].map((icon) => (
            <TouchableOpacity key={icon} style={styles.iconBtn}>
              <MaterialCommunityIcons
                name={icon}
                size={scale(28)}
                color={colors.primaryDark}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.copyRow}>
            <MaterialCommunityIcons
              name="link"
              size={scale(20)}
              color={colors.textDark}
            />
            <Text style={styles.copyText}>Copy link</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.dotsRow}>
        {[0,1,2,3,4,5].map(i => (
          <View
            key={i}
            style={[
              styles.dot,
              i === 5 && { backgroundColor: colors.grayLight }, // last dot inactive
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: colors.backgroundLight },
  scroll: { padding: scale(16), alignItems: 'center' },
  title: {
    fontSize: scale(20),
    fontWeight: '600',
    color: colors.primaryDark,
    alignSelf: 'flex-start',
    marginBottom: scale(12),
  },
  instructionBox: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(16),
  },
  instructionText: {
    fontSize: scale(14),
    color: colors.textDark,
    lineHeight: scale(18),
  },
  qrWrapper: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: scale(16),
  },
  qrImage: {
    flex:1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  summaryBox: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(16),
  },
  summaryText: {
    fontSize: scale(14),
    color: colors.textDark,
    marginBottom: scale(4),
  },
  shareLabel: {
    alignSelf: 'flex-start',
    fontSize: scale(16),
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: scale(8),
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  iconBtn: {
    marginRight: scale(12),
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  copyText: {
    marginLeft: scale(4),
    fontSize: scale(14),
    color: colors.textDark,
  },
  dotsRow: {
    flexDirection:'row',
    justifyContent:'center',
    paddingBottom: scale(16),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: colors.primaryDark,
    marginHorizontal: scale(4),
  },
});
