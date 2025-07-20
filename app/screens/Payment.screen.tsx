// app/screens/Payment.screen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';
import { scale } from '../theme/scale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorParamList } from '../navigators/navigation-route';

type Props = NativeStackScreenProps<NavigatorParamList, 'PaymentScreen'>;
const { width } = Dimensions.get('window');

export default function PaymentScreen({ navigation }: Props) {
  const [personal, setPersonal] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  });
  const [saveCard, setSaveCard] = useState(false);
  const [agreements, setAgreements] = useState({
    rental: false,
    rules: false,
  });

  const onChange = (field: keyof typeof personal, value: string) =>
    setPersonal(p => ({ ...p, [field]: value }));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Personal Details */}
        <Text style={styles.sectionTitle}>Personal Details *</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1, { marginRight: scale(8) }]}
            placeholder="First Name"
            value={personal.firstName}
            onChangeText={v => onChange('firstName', v)}
          />
          <TextInput
            style={[styles.input, styles.flex1, { marginLeft: scale(8) }]}
            placeholder="Last Name"
            value={personal.lastName}
            onChangeText={v => onChange('lastName', v)}
          />
          <TouchableOpacity style={[styles.dateInput, { marginLeft: scale(8) }]}>
            <Text style={styles.placeholder}>DOB</Text>
            <MaterialCommunityIcons
              name="calendar"
              size={scale(20)}
              color={colors.grayLight}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={personal.address}
          onChangeText={v => onChange('address', v)}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1, { marginRight: scale(8) }]}
            placeholder="City"
            value={personal.city}
            onChangeText={v => onChange('city', v)}
          />
          <TextInput
            style={[styles.input, styles.flex1, { marginLeft: scale(8) }]}
            placeholder="State"
            value={personal.state}
            onChangeText={v => onChange('state', v)}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1, { marginRight: scale(8) }]}
            placeholder="Country"
            value={personal.country}
            onChangeText={v => onChange('country', v)}
          />
          <TextInput
            style={[styles.input, styles.flex1, { marginLeft: scale(8) }]}
            placeholder="Zipcode"
            value={personal.zipcode}
            onChangeText={v => onChange('zipcode', v)}
          />
        </View>

        {/* Uploads */}
        <Text style={styles.sectionTitle}>Upload Identity Document</Text>
        <TouchableOpacity style={styles.uploadRow}>
          <MaterialCommunityIcons
            name="file-upload-outline"
            size={scale(24)}
            color={colors.primaryDark}
          />
          <Text style={styles.uploadText}>(Tap to upload)</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Upload Driver’s License</Text>
        <TouchableOpacity style={styles.uploadRow}>
          <MaterialCommunityIcons
            name="file-upload-outline"
            size={scale(24)}
            color={colors.primaryDark}
          />
          <Text style={styles.uploadText}>(Tap to upload)</Text>
        </TouchableOpacity>

        {/* Payment Details */}
        <Text style={styles.sectionTitle}>Payment Details *</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <MaterialCommunityIcons
              name="google-pay"
              size={scale(24)}
              color={colors.primaryDark}
            />
            <Text style={styles.socialText}>Google Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <MaterialCommunityIcons
              name="apple"
              size={scale(24)}
              color={colors.primaryDark}
            />
            <Text style={styles.socialText}>Apple Pay</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or</Text>
        <TextInput style={styles.input} placeholder="Card number" />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1, { marginRight: scale(8) }]}
            placeholder="Name on Card"
          />
          <TouchableOpacity style={[styles.dateInput, { marginLeft: scale(8) }]}>
            <Text style={styles.placeholder}>Expiry date</Text>
            <MaterialCommunityIcons
              name="calendar"
              size={scale(20)}
              color={colors.grayLight}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 0.4, marginRight: scale(8) }]}
            placeholder="CVV"
            secureTextEntry
          />
          <View style={[styles.input, { flex: 0.6, flexDirection: 'row', alignItems: 'center' }]}>
            <MaterialCommunityIcons name="credit-card" size={scale(24)} color={colors.grayLight} />
            <View style={{ flex: 1 }} />
            <Text>Save card details</Text>
            <Switch
              value={saveCard}
              onValueChange={setSaveCard}
              trackColor={{ true: colors.primaryDark, false: colors.grayLightest }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Agreements */}
        <View style={styles.agreementRow}>
          <Switch
            value={agreements.rental}
            onValueChange={v => setAgreements(a => ({ ...a, rental: v }))}
            trackColor={{ true: colors.primaryDark, false: colors.grayLightest }}
            thumbColor={colors.white}
          />
          <Text style={styles.agreementText}>I have read the Rental Agreement</Text>
        </View>
        <View style={styles.agreementRow}>
          <Switch
            value={agreements.rules}
            onValueChange={v => setAgreements(a => ({ ...a, rules: v }))}
            trackColor={{ true: colors.primaryDark, false: colors.grayLightest }}
            thumbColor={colors.white}
          />
          <Text style={styles.agreementText}>I have read and understood the Rules</Text>
        </View>
      </ScrollView>

      {/* Confirm */}
      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => navigation.navigate('ConfirmationScreen')}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>

      {/* Dots */}
      <View style={styles.dotsRow}>
        {[0, 1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={[
              styles.dot,
              i === 4 ? { backgroundColor: colors.grayLight } : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scroll: {
    padding: scale(16),
    paddingBottom: scale(140), // enough space for button & dots
  },

  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: colors.primaryDark,
    marginTop: scale(24),
    marginBottom: scale(12),
  },

  row: {
    flexDirection: 'row',
    marginBottom: scale(16),
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(14),
    fontSize: scale(14),
    color: colors.textDark,
    marginBottom: 0,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(14),
  },
  placeholder: {
    color: colors.grayLight,
  },

  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  uploadText: {
    marginLeft: scale(8),
    color: colors.textDark,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: scale(20),
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    marginLeft: scale(6),
    color: colors.primaryDark,
  },
  orText: {
    textAlign: 'center',
    marginBottom: scale(20),
    color: colors.textDark,
  },

  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  agreementText: {
    marginLeft: scale(8),
    flex: 1,
    color: colors.textDark,
    fontSize: scale(14),
  },

  confirmBtn: {
    position: 'absolute',
    bottom: scale(40),
    left: scale(16),
    right: scale(16),
    backgroundColor: colors.primaryDark,
    paddingVertical: scale(16),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  confirmText: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
  },

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
});
