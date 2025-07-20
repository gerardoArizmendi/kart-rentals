// app/screens/Details.screen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';
import { scale } from '../theme/scale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorParamList } from '../navigators/navigation-route';

type Props = NativeStackScreenProps<NavigatorParamList, 'DetailsScreen'>;
const { width, height } = Dimensions.get('window');

type Cart = {
  id: string;
  image: any;
  label: string;
  selected: boolean;
};

const initialCarts: Cart[] = [
  { id: '1', image: require('../assets/images/kart1.png'), label: '2-Seater', selected: true },
  { id: '2', image: require('../assets/images/kart2.png'), label: '4-Seater', selected: true },
  { id: '3', image: require('../assets/images/kart3.png'), label: '2-Seater', selected: true },
];

export default function DetailsScreen({ navigation }: Props) {
  const [carts, setCarts] = useState(initialCarts);
  const [pickUp, setPickUp] = useState('13:30');
  const [dropOff, setDropOff] = useState('17:30');
  const [sameForAll, setSameForAll] = useState(false);

  const toggleCart = (id: string) =>
    setCarts(cs => cs.map(c => (c.id === id ? { ...c, selected: !c.selected } : c)));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Select Duration</Text>

        {/* Horizontal carousel of cart images */}
        <View style={styles.carouselRow}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="chevron-left" size={scale(24)} color={colors.textDark} />
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {carts.map(c => (
              <TouchableOpacity
                key={c.id}
                onPress={() => toggleCart(c.id)}
                style={styles.kartWrapper}
              >
                <Image source={c.image} style={styles.kartImage} resizeMode="contain" />
                {c.selected && (
                  <View style={styles.check}>
                    <MaterialCommunityIcons name="check" color={colors.white} size={scale(16)} />
                  </View>
                )}
                <Text style={styles.kartLabel}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity>
            <MaterialCommunityIcons name="chevron-right" size={scale(24)} color={colors.textDark} />
          </TouchableOpacity>
        </View>

        {/* Time pickers — full width with calendar icon */}
        <View style={styles.timeGroupFull}>
          <Text style={styles.timeLabel}>Pick-up Time</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              value={pickUp}
              onChangeText={setPickUp}
              placeholder="HH:MM"
              placeholderTextColor={colors.grayLight}
              style={styles.timeInput}
            />
            <MaterialCommunityIcons name="calendar" size={scale(20)} color={colors.grayLight} />
          </View>
        </View>

        <View style={styles.timeGroupFull}>
          <Text style={styles.timeLabel}>Drop-off Time</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              value={dropOff}
              onChangeText={setDropOff}
              placeholder="HH:MM"
              placeholderTextColor={colors.grayLight}
              style={styles.timeInput}
            />
            <MaterialCommunityIcons name="calendar" size={scale(20)} color={colors.grayLight} />
          </View>
        </View>

        {/* Same duration toggle */}
        <View style={styles.toggleRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={scale(24)} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.toggleLabel}>Same Duration for others</Text>
          <Switch
            value={sameForAll}
            onValueChange={setSameForAll}
            trackColor={{ true: colors.primaryDark, false: colors.grayLightest }}
            thumbColor={colors.white}
          />
        </View>

        {/* Pagination dots just above the save button */}
        <View style={styles.dotsRowInline}>
          {[0, 1, 2, 3].map(i => (
            <View
              key={i}
              style={[
                styles.dot,
                i === 2 && { backgroundColor: colors.primaryDark },
              ]}
            />
          ))}
        </View>
      </ScrollView>

      {/* Save button pinned to bottom */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => navigation.navigate('AddOnsScreen')}
      >
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  scrollContent: {
    paddingTop: scale(16),
    paddingHorizontal: scale(16),
    paddingBottom: scale(100), // enough to scroll above the pinned button
  },

  header: {
    fontSize: scale(18),
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: scale(12),
  },

  carouselRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(24),
  },
  carousel: {
    paddingHorizontal: scale(8),
  },
  kartWrapper: {
    width: width * 0.3,
    alignItems: 'center',
    marginHorizontal: scale(8),
  },
  kartImage: {
    width: '100%',
    height: scale(80),
    backgroundColor: colors.grayLightest,
  },
  check: {
    position: 'absolute',
    top: scale(4),
    right: scale(4),
    backgroundColor: colors.primaryDark,
    borderRadius: scale(8),
    padding: scale(2),
  },
  kartLabel: {
    marginTop: scale(4),
    fontSize: scale(12),
    color: colors.textDark,
  },

  timeGroupFull: {
    marginBottom: scale(20),
  },
  timeLabel: {
    fontSize: scale(14),
    color: colors.textDark,
    marginBottom: scale(8),
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
  },
  timeInput: {
    flex: 1,
    fontSize: scale(16),
    color: colors.textDark,
    padding: 0,
    margin: 0,
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(24),
  },
  toggleLabel: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: scale(14),
    color: colors.textDark,
  },

  dotsRowInline: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(16),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: colors.grayLight,
    marginHorizontal: scale(4),
  },

  saveBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primaryDark,
    paddingVertical: scale(16),
    alignItems: 'center',
  },
  saveText: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: '600',
  },
});
