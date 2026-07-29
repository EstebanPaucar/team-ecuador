import React, { useEffect, useRef } from 'react';
// Agrega este import al inicio del archivo, junto a los otros imports de react-native:

import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(30)).current;
  const stripeLeft = useRef(new Animated.Value(-width)).current;
  const stripeRight = useRef(new Animated.Value(width)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stripes slide in
    Animated.parallel([
      Animated.timing(stripeLeft, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(stripeRight, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Logo appears
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Text slides up
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(textTranslate, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Shimmer loop
          Animated.loop(
            Animated.sequence([
              Animated.timing(shimmer, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
              }),
              Animated.timing(shimmer, {
                toValue: 0,
                duration: 1200,
                useNativeDriver: true,
              }),
            ])
          ).start();

          // Navigate after delay
          setTimeout(() => {
            onFinish();
          }, 10000);
        });
      });
    });
  }, []);

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blue} />

      {/* Background diagonal stripes */}
      <Animated.View
        style={[styles.stripeLeft, { transform: [{ translateX: stripeLeft }] }]}
      />
      <Animated.View
        style={[styles.stripeRight, { transform: [{ translateX: stripeRight }] }]}
      />

      {/* Center content */}
      <View style={styles.centerContent}>
        {/* Logo / Shield */}
        <Animated.View
          style={[
            styles.shieldWrapper,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={require('../assets/images/logo-españa.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Text */}
        <Animated.View
          style={[
            styles.textBlock,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslate }],
            },
          ]}
        >
          <Animated.Text style={[styles.teamName, { opacity: shimmerOpacity }]}>
            ESPAÑA
          </Animated.Text>
          <Text style={styles.teamSubtitle}>Bienvenido</Text>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerDot}>◆</Text>
            <View style={styles.dividerLine} />
          </View>
          <Text style={styles.tagline}>Torneo de Selecciones 2026</Text>
        </Animated.View>
      </View>

      {/* Bottom flag stripe */}
      <View style={styles.bottomStripes}>
        <View style={[styles.flagStripe, { backgroundColor: Colors.red }]} />
        <View style={[styles.flagStripe, { backgroundColor: Colors.yellow }]} />
        <View style={[styles.flagStripe, { backgroundColor: Colors.red }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueDark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stripeLeft: {
    position: 'absolute',
    top: -100,
    left: -width * 0.6,
    width: width * 0.8,
    height: height * 1.5,
    backgroundColor: Colors.yellow,
    transform: [{ rotate: '-15deg' }],
  },
  logoImage: {
  width: 160,
  height: 160,
},
  stripeRight: {
    position: 'absolute',
    bottom: -100,
    right: -width * 0.5,
    width: width * 0.7,
    height: height * 1.5,
    backgroundColor: Colors.yellow,
    transform: [{ rotate: '-15deg' }],
  },
  centerContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  shieldWrapper: {
    marginBottom: 32,
    shadowColor: Colors.yellow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  shieldTopRight: {
    flex: 1,
    backgroundColor: Colors.blue,
    borderTopRightRadius: 12,
  },
  shieldBottom: {
    width: 140,
    height: 70,
    backgroundColor: Colors.red,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.white,
  },
  shieldBottomInner: {
    width: 50,
    height: 3,
    backgroundColor: Colors.yellow,
    opacity: 0.7,
    borderRadius: 2,
  },
  crestContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  crestFlag: {
    fontSize: 36,
  },
  crestStar: {
    fontSize: 16,
    marginTop: -4,
  },
  crestYear: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 2,
  },
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  teamName: {
    fontSize: 56,
    fontWeight: '900',
    color: Colors.yellow,
    letterSpacing: 12,
    textShadowColor: 'rgba(241, 79, 29, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  teamSubtitle: {
    fontSize: 12,
    color: Colors.white,
    letterSpacing: 2.5,
    opacity: 0.85,
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    width: 200,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.yellow,
    opacity: 0.4,
  },
  dividerDot: {
    color: Colors.yellow,
    fontSize: 10,
    marginHorizontal: 8,
  },
  tagline: {
    fontSize: 13,
    color: Colors.grayLight,
    letterSpacing: 1.5,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  bottomStripes: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 6,
  },
  flagStripe: {
    flex: 1,
  },
});