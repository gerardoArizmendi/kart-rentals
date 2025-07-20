// App.tsx

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationNavigator from './app/navigators/RegistrationNavigator';
import { AppNavigator }          from './app/navigators/app-navigator';
import { colors }            from './app/theme/colors';
import { Text } from 'react-native';

firestore().settings({ persistence: true });

// export default function App() {
//   const [initializing,   setInitializing]   = useState(true);
//   const [user,           setUser]           = useState(auth().currentUser);
//   const [profileExists,  setProfileExists]  = useState<boolean|null>(null);

//   // 1) Listen for auth changes
//   useEffect(() => {
//     const unsub = auth().onAuthStateChanged(u => {
//       setUser(u);
//       if (initializing) setInitializing(false);
//     });
//     return unsub;
//   }, [initializing]);

//   // 2) If we have a user, check their profile doc
//   useEffect(() => {
//     if (!user) {
//       setProfileExists(null);
//       return;
//     }
//     firestore()
//       .doc(`customers/${user.uid}`)
//       .get()
//       .then(doc => setProfileExists(doc.exists))
//       .catch(() => setProfileExists(false));
//   }, [user]);

//   // 3) Show a loader until we know
//   if (initializing || (user && profileExists === null)) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={colors.primaryDark} />
//       </View>
//     );
//   }

//   // 4a) No user or no profile → show registration
//    <NavigationContainer>
//     {(!user || !profileExists)
//       ? <RegistrationNavigator />
//       : <AppNavigator />
//     }
//   </NavigationContainer>
// }

export default function App() {
  return (
    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:24}}>👋 Hello, world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:colors.white }
});
