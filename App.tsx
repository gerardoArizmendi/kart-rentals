// App.tsx

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationNavigator from './app/navigators/RegistrationNavigator';
import { AppNavigator }          from './app/navigators/app-navigator';
import { colors }                from './app/theme/colors';

//
// Enable Firestore debug logs (optional)
//
//setLogLevel(LogLevel.DEBUG);

//
// Turn on offline persistence
//
firestore().settings({ persistence: true });

export default function App() {
  const [initializing,  setInitializing]  = useState(true);
  const [user,          setUser]          = useState(auth().currentUser);
  const [profileExists, setProfileExists] = useState<boolean|null>(null);

  //
  // 1) Listen for auth changes
  //
  useEffect(() => {
    const unsub = auth().onAuthStateChanged(u => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return unsub;
  }, [initializing]);

  //
  // 2) If we have a user, check their profile document
  //
  useEffect(() => {
    if (!user) {
      setProfileExists(null);
      return;
    }
    firestore()
      .doc(`customers/${user.uid}`)
      .get()
      .then(doc => setProfileExists(doc.exists))
      .catch(() => setProfileExists(false));
  }, [user]);

  //
  // 🔍  Test Firestore read
  //
  useEffect(() => {
    firestore()
      .collection('carts')
      .doc('testDoc')
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.warn('⚠️ testDoc not found in carts!');
        } else {
          console.log('✅ testDoc data:', doc.data());
        }
      })
      .catch(err => console.error('🔥 Firestore read error:', err));
  }, []);

  //
  // 🔍  Test Firestore write
  //
useEffect(() => {
  firestore()
    .collection('ping')
    .doc('mobileApp')
    .set({
      lastPing: firestore.FieldValue.serverTimestamp(),  // ← use this instead
    })
    .then(() => console.log('✅ ping write successful'))
    .catch(err => console.error('🔥 ping write error:', err));
}, []);

  //
  // 3) Show a loader until auth + profile check complete
  //
  if (initializing || (user && profileExists === null)) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primaryDark} />
      </View>
    );
  }

  //
  // 4) Render the appropriate navigator
  //
  return (
    <NavigationContainer>
      {(!user || !profileExists)
        ? <RegistrationNavigator />
        : <AppNavigator />
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});