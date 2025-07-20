// app/screens/Landing.screen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';
import { scale } from '../theme/scale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorParamList } from '../navigators/navigation-route';

type Props = NativeStackScreenProps<NavigatorParamList, 'LandingScreen'>;
const { width } = Dimensions.get('window');

type Cart = {
  id: string;
  image: any;        // require('../assets/kart1.png')
  type: string;
  price: number;
  quantity: number;
};

const sampleCarts: Cart[] = [
  { id: '1', image: require('../assets/images/kart1.png'), type: '2-Seater', price: 123, quantity: 1 },
  { id: '2', image: require('../assets/images/kart2.png'), type: '4-Seater', price: 123, quantity: 2 },
  { id: '3', image: require('../assets/images/kart3.png'), type: '2-Seater', price: 123, quantity: 1 },
];

export default function LandingScreen({ navigation }: Props) {
  const [carts, setCarts] = useState(sampleCarts);
  const [page, setPage] = useState(0);

  const updateQty = (id: string, delta: number) => {
    setCarts(cs =>
      cs.map(c =>
        c.id === id
          ? { ...c, quantity: Math.max(0, c.quantity + delta) }
          : c
      )
    );
  };

  const renderItem = ({ item }: { item: Cart }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.kartImage} resizeMode="contain" />
      <View style={styles.cardInfo}>
        <Text style={styles.cartType}>{`Type: ${item.type}`}</Text>
        <Text style={styles.cartIcons}>⚡️🎵🔧</Text>
        <Text style={styles.cartPrice}>{`Price: $${item.price} / day`}</Text>
        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Quantity:</Text>
          <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* header with filter/search */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={scale(24)} color={colors.primaryDark} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={scale(20)} color={colors.grayLight} />
          <TextInput placeholder="Mexico City" style={styles.searchInput} />
          <MaterialCommunityIcons name="chevron-down" size={scale(20)} color={colors.grayLight} />
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="phone" size={scale(24)} color={colors.primaryDark} />
        </TouchableOpacity>
      </View>

      {/* filter / sort / count */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
        <Text style={styles.resultCount}>{`${carts.length} results`}</Text>
      </View>

      {/* list */}
      <FlatList
        data={carts}
        renderItem={renderItem}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* save button */}
      <TouchableOpacity style={styles.saveBtn}
        onPress={() => navigation.navigate('DetailsScreen')}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      {/* pagination dots */}
      <View style={styles.dotsRow}>
        {sampleCarts.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === page && { backgroundColor: colors.primaryDark },
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
    padding: scale(12),
    justifyContent: 'space-between',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: scale(6),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(6),
    fontSize: scale(16),
    color: colors.textDark,
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingBottom: scale(8),
  },
  filterBtn: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    backgroundColor: colors.white,
    borderRadius: scale(8),
    marginRight: scale(8),
  },
  filterText: { fontSize: scale(14), color: colors.textDark },
  resultCount: { marginLeft: 'auto', fontSize: scale(14), color: colors.textDark },

  listContent: { paddingHorizontal: scale(12), paddingBottom: scale(80) },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(12),
    marginBottom: scale(12),
    overflow: 'hidden',
  },
  kartImage: {
    width: width * 0.35,
    height: scale(100),
    backgroundColor: colors.grayLightest,
  },
  cardInfo: { flex: 1, padding: scale(12) },
  cartType: { fontSize: scale(16), fontWeight: '600', color: colors.textDark },
  cartIcons: { fontSize: scale(16), marginVertical: scale(4) },
  cartPrice: { fontSize: scale(14), color: colors.textDark },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: scale(6) },
  qtyLabel: { fontSize: scale(14), color: colors.textDark, marginRight: scale(6) },
  qtyBtn: {
    backgroundColor: colors.grayLightest,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  qtyBtnText: { fontSize: scale(16), color: colors.textDark },
  qtyValue: { marginHorizontal: scale(8), fontSize: scale(16), color: colors.textDark },

  saveBtn: {
    position: 'absolute',
    bottom: scale(40),
    left: scale(12),
    right: scale(12),
    backgroundColor: colors.primaryDark,
    paddingVertical: scale(16),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  saveText: { fontSize: scale(18), color: colors.white, fontWeight: '600' },

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
    backgroundColor: colors.grayLight,
    marginHorizontal: scale(4),
  },
});
