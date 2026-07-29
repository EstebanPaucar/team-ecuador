import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AchievementItem from '../components/AchievementItem';
import PlayerCard from '../components/PlayerCard';
import StatCard from '../components/StatCard';
import { Colors } from '../constants/Colors';
import { ACHIEVEMENTS, PLAYERS, TEAM_INFO } from '../constants/TeamData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(40)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueDark} />

      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        {/* Diagonal accent */}
        <View style={styles.headerAccent} />

        <View style={styles.headerContent}>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>BIENVENIDO</Text>
            <Text style={styles.headerSubtitle}>Esteban Paucar</Text>
          </View>
        </View>

        {/* Color stripes */}
        <View style={styles.stripes}>
          <View style={[styles.stripe, { backgroundColor: Colors.yellow, flex: 2 }]} />
          <View style={[styles.stripe, { backgroundColor: Colors.red, flex: 2 }]} />
          <View style={[styles.stripe, { backgroundColor: Colors.yellow, flex: 1 }]} />
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={{
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslate }],
          }}
        >
          {/* Quick Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Segundo Lugar</Text>
            <View style={styles.statsRow}>
              <StatCard label="4" accent="red" />
              <StatCard label="33M" accent="yellow" />
            </View>
          </View>

          {/* Team Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏟️ Información del Equipo</Text>
            <View style={styles.infoCard}>
              {[
                { label: 'DT', value: TEAM_INFO.coach, icon: '🎯' },
                { label: 'Capitán', value: TEAM_INFO.captain, icon: '🏆' },
                { label: 'Colores', value: TEAM_INFO.colors, icon: '🎨' },
              ].map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.infoRow,
                    index < 5 && styles.infoRowBorder,
                  ]}
                >
                  <Text style={styles.infoIcon}>{item.icon}</Text>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Players */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚽ Jugadores Destacados</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.playersRow}
            >
              {PLAYERS.map((player) => (
                <PlayerCard
                  key={player.id}
                  name={player.name}
                  position={player.position}
                  number={player.number}
                  emoji={player.emoji}
                />
              ))}
            </ScrollView>
          </View>

          {/* Achievements */}
          <View style={[styles.section, styles.sectionLast]}>
            <Text style={styles.sectionTitle}>🏅 Logros Históricos</Text>
            <View style={styles.achievementsCard}>
              {ACHIEVEMENTS.map((item, index) => (
                <AchievementItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  detail={item.detail}
                  isLast={index === ACHIEVEMENTS.length - 1}
                />
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerStripes}>
              <View style={[styles.footerStripe, { backgroundColor: Colors.red }]} />
              <View style={[styles.footerStripe, { backgroundColor: Colors.yellow }]} />
              <View style={[styles.footerStripe, { backgroundColor: Colors.red }]} />
            </View>
            <Text style={styles.footerSub}>España</Text>
          </View>
            <View style={styles.section}>
            <View style={styles.statsRow}>
              <StatCard label="Home" accent="yellow" />
              <StatCard label="España" accent="red" />
              <StatCard label="Acerca De" accent="yellow" />
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  header: {
    backgroundColor: Colors.red,
    paddingTop: 54,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  headerAccent: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 200,
    height: 200,
    backgroundColor: Colors.red,
    borderRadius: 100,
    opacity: 0.4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerLeft: {
    marginRight: 12,
  },
  headerFlag: {
    fontSize: 40,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.yellow,
    letterSpacing: 8,
    lineHeight: 36,
  },
  headerSubtitle: {
    fontSize: 20,
    color: Colors.white,
    opacity: 0.75,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  rankingPill: {
    backgroundColor: Colors.yellow,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  rankingTop: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.blueDark,
    letterSpacing: 1,
  },
  rankingNum: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.blueDark,
    lineHeight: 18,
  },
  stripes: {
    flexDirection: 'row',
    height: 5,
  },
  stripe: {
    height: 5,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionLast: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.blueDark,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 22,
    textAlign: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.grayMedium,
    fontWeight: '600',
    width: 90,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: Colors.red,
    fontWeight: '700',
    textAlign: 'right',
  },
  playersRow: {
    paddingLeft: 2,
    paddingRight: 16,
    paddingBottom: 8,
  },
  achievementsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingBottom: 10,
  },
  footerStripes: {
    flexDirection: 'row',
    height: 4,
    width: 80,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  footerStripe: {
    flex: 1,
  },
  footerText: {
    fontSize: 11,
    color: Colors.grayMedium,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  footerSub: {
    fontSize: 12,
    color: Colors.red,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});