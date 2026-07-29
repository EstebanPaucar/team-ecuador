import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface PlayerCardProps {
  name: string;
  position: string;
  number: number;
  emoji: string;
}

export default function PlayerCard({ name, position, number, emoji }: PlayerCardProps) {
  const getPositionColor = (pos: string) => {
    if (pos === 'Portero') return Colors.yellow;
    if (pos === 'Defensa') return Colors.blue;
    if (pos === 'Mediocampista') return Colors.blueLight;
    return Colors.red;
  };

  return (
    <View style={styles.card}>
      <View style={[styles.numberBadge, { backgroundColor: getPositionColor(position) }]}>
        <Text style={[styles.number, { color: position === 'Portero' ? Colors.blueDark : Colors.white }]}>
          {number}
        </Text>
      </View>

      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={[styles.positionBadge, { borderColor: getPositionColor(position) }]}>
          <Text style={[styles.position, { color: getPositionColor(position) }]}>{position}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    width: 150,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderBottomWidth: 3,
    borderBottomColor: Colors.yellow,
    alignItems: 'center',
  },
  numberBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 12,
    fontWeight: '900',
  },
  emojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.grayLight,
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.blueDark,
    textAlign: 'center',
    marginBottom: 6,
  },
  positionBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  position: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  club: {
    fontSize: 10,
    color: Colors.grayMedium,
    textAlign: 'center',
  },
});