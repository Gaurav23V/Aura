import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native';
import { images } from '@/constants'; // Adjust the import path as needed
import FormField from '@/components/FormField'; // Adjust the import path as needed
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '@/lib/appwrite';
import { getCurrentUser } from '@/lib/appwrite';
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email ==="" || form.password === "") {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home')
    } catch (error) {
      Alert.alert('error', error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />

          <Text style={styles.title}>
            Log in to Aura
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 7 }}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 7 }}
          />

          <CustomButton
            title="Login"
            handlePress={submit}
            containerStyles={{ marginTop: 7 }}
            isLoading={isSubmitting}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              style={styles.signupLink}
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#161622', // Example bg-primary
  },
  scrollView: {
    minHeight: Dimensions.get("window").height - 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Example px-4
    marginTop: 10, // Example my-6
    marginBottom: 0,
  },
  logo: {
    width: 115, // Example w-[115px]
    height: 34, // Example h-[34px]
    marginBottom: 10, // Example mt-10
  },
  title: {
    fontSize: 24, // Example text-2xl
    fontWeight: '600', // Example font-semibold
    color: '#FFFFFF', // Example text-white
    fontFamily: 'Poppins-SemiBold', // Example font-psemibold
    marginTop: 20, // Example mt-10
    marginBottom: 20, // Example mt-10
  },
  signupContainer: {
    flexDirection: 'row', // Example flex-row
    justifyContent: 'center', // Example justify-center
    paddingTop: 20, // Example pt-5
  },
  signupText: {
    fontSize: 16, // Example text-lg
    color: '#CDCDE0', // Example text-gray-100
    fontFamily: 'Poppins-Regular', // Example font-pregular
  },
  signupLink: {
    fontSize: 16, // Example text-lg
    color: '#FF9C01', // Example text-secondary
    fontFamily: 'Poppins-SemiBold', // Example font-psemibold
    marginLeft: 5, // Example ml-2
  },
});

export default SignIn;
