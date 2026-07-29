import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface AchievementItemProps {
  year: number;
  title: string;
  detail: string;
  isLast?: boolean;
}

export default function AchievementItem({ year, title, detail, isLast }: AchievementItemProps) {
  return (
    <View style={styles.container}>
      {/* Timeline line */}
      <View style={styles.timelineCol}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.line} />}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.yearBadge}>
          <Text style={styles.year}>{year}</Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.detail}>{detail}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineCol: {
    alignItems: 'center',
    width: 20,
    marginRight: 14,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.yellow,
    borderWidth: 2,
    borderColor: Colors.blue,
    marginTop: 14,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.grayLight,
    marginTop: 4,
    marginBottom: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
    marginBottom: 4,
    paddingBottom: 12,
  },
  yearBadge: {
    backgroundColor: Colors.red,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
    minWidth: 46,
    alignItems: 'center',
  },
  year: {
    color: Colors.yellow,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.blueDark,
    marginBottom: 2,
  },
  detail: {
    fontSize: 11,
    color: Colors.grayMedium,
    letterSpacing: 0.3,
  },
});