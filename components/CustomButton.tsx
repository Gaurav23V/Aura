import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontFamilies } from '@/app/styles/globals';

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        { backgroundColor: colors.secondary[200] }, // Example secondary color background
        isLoading && { opacity: 0.5 }, // Example for opacity when loading
        containerStyles,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    minHeight: 62,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 7, // Example margin bottom
    width: '100%', // Example full width
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: fontFamilies.psemibold, // Example font family
    color: '#000000', // Example primary color text
  },
});

export default CustomButton;
