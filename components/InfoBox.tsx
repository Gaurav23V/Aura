import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors, fontFamilies } from "../app/styles/globals"; // Adjust the import path as needed

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>
        {title}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16, // Adjust as needed
    backgroundColor: colors.primary, // Adjust as needed
    borderRadius: 8, // Adjust as needed
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: fontFamilies.psemibold,
    fontSize: 16, // Adjust as needed
  },
  subtitle: {
    fontSize: 14, // Adjust as needed
    color: colors.gray[100],
    textAlign: 'center',
    fontFamily: fontFamilies.pregular,
  },
});

export default InfoBox;
