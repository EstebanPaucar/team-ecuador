import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import SplashScreen from '../components/SplashScreen';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.container}>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <HomeScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});