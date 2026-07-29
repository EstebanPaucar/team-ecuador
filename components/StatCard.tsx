import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface StatCardProps {
  label: string;
  accent?: 'red' | 'yellow' | 'red';
}

export default function StatCard({ label, accent = 'yellow' }: StatCardProps) {
  const accentColor =
    accent === 'yellow' ? Colors.yellow :
    accent === 'red' ? Colors.red :
    Colors.blueLight;

  return (
    <View style={[styles.card, { borderTopColor: accentColor }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 4,
  },
  value: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 9,
    color: Colors.grayMedium,
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
  },
});