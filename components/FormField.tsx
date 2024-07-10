import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { icons } from '../constants'; // Adjust the import path as needed

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14, // Example margin bottom
  },
  title: {
    fontSize: 16, // Example text base size
    color: '#CDCDE0', // Example text gray-100 color
    fontFamily: 'Poppins-Medium', // Example font family
    marginBottom: 3,
  },
  inputContainer: {
    width: '100%',
    height: 48, // Example height 16
    paddingHorizontal: 16, // Example px-4
    backgroundColor: '#232533', // Example bg-black-100
    borderRadius: 10, // Example rounded-2xl
    borderWidth: 2, // Example border-2
    borderColor: '#1E1E2D', // Example border-black-200
    flexDirection: 'row', // Example flex-row
    alignItems: 'center', // Example items-center
  },
  input: {
    flex: 1,
    color: '#FFFFFF', // Example text-white color
    fontFamily: 'Poppins-SemiBold', // Example font-psemibold
    fontSize: 16, // Example text-base size
  },
  eyeIcon: {
    width: 24, // Example w-6
    height: 24, // Example h-6
  },
});

export default FormField;
