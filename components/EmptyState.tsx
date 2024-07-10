import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '../constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { colors, fontFamilies } from '../app/styles/globals';
import { StyleSheet } from 'react-native';

const EmptyState = ({ title, subtitle }) => {
    return (
        <View style={styles.flexContainer}>
            <Image 
                source={images.empty} 
                resizeMode='contain' 
                style={{ width: 270, height: 215 }} 
            />
            <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: fontFamilies.psemibold, marginTop: 8, color: '#FFFFFF' }}>
                {title}
            </Text>
            <Text style={{ fontFamily: fontFamilies.pmedium, fontSize: 14, color: colors.gray[100] }}>
                {subtitle}
            </Text>
            <CustomButton 
                title="Create video"
                handlePress={() => router.push('/create')}
                containerStyles={{ width: '100%', marginTop: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
  });

export default EmptyState;
