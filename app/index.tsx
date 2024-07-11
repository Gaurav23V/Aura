import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { images } from '@/constants'; // Adjust the import path as needed
import { fontFamilies } from './styles/globals'; // Adjust the import path as needed
import CustomButton from '@/components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider'; // Corrected import

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href='/home' />
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            style={styles.cards}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={styles.subTitle}>Aura</Text>
            </Text>

            <Image
              source={images.path}
              style={styles.imagePath}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.description}>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aura
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles={{ width: '100%', marginTop: 7 }}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#161622', // Primary color background
  },
  scrollView: {
    flexGrow: 1,
    minHeight: '100%', // Ensure the ScrollView fills the SafeAreaView
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Equivalent to Tailwind's px-4
  },
  logo: {
    width: 130,
    height: 84,
    marginTop: 20,
    marginBottom: -20, // Adjust spacing as needed
  },
  cards: {
    maxWidth: 380,
    width: '100%',
    height: 298,
    marginBottom: 0, // Adjust spacing as needed
  },
  textContainer: {
    position: 'relative',
    marginBottom: 20, // Adjust spacing as needed
  },
  title: {
    fontSize: 24, // Equivalent to Tailwind's text-3xl
    fontWeight: 'bold',
    color: '#FFFFFF', // Text color white
    textAlign: 'center',
    fontFamily: fontFamilies.pbold, // Poppins-Bold font family
  },
  subTitle: {
    color: '#FF8E01', // Secondary color variant
  },
  imagePath: {
    width: 136,
    height: 15,
    position: 'absolute',
    bottom: -8,
    right: -30,
  },
  description: {
    fontSize: 14, // Equivalent to Tailwind's text-sm
    color: '#CDCDE0', // Gray-100 text color
    fontFamily: fontFamilies.pregular, // Poppins-Regular font family
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
