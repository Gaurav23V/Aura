import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField'
import { colors, fontFamilies } from '../styles/globals'
import { ResizeMode, Video } from 'expo-av';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { createVideoPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.prompt === "") ||
      (form.title === "") ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catching title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={{ marginTop: 10 }}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View style={styles.uploadContainer}>
                <View style={styles.uploadIconContainer}>
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    style={styles.uploadIcon}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                style={styles.thumbnail}
              />
            ) : (
              <View style={styles.thumbnailUploadContainer}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  style={styles.thumbnailUploadIcon}
                />
                <Text style={styles.thumbnailUploadText}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={{ marginTop: 28 }}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles={{ marginTop: 28 }}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: fontFamilies.psemibold,
    marginBottom: 16,
  },
  sectionContainer: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#E5E7EB',
    fontFamily: fontFamilies.pmedium,
    marginBottom: 8,
  },
  video: {
    width: '100%',
    height: 256,
    borderRadius: 16,
  },
  uploadContainer: {
    width: '100%',
    height: 160,
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: '50%',
    height: '50%',
  },
  thumbnail: {
    width: '100%',
    height: 256,
    borderRadius: 16,
  },
  thumbnailUploadContainer: {
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailUploadIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  thumbnailUploadText: {
    fontSize: 14,
    color: '#E5E7EB',
    fontFamily: fontFamilies.pmedium,
  },
});

export default Create