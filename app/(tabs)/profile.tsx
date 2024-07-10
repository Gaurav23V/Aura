import React from "react";
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import { colors, fontFamilies } from "../../app/styles/globals";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user?.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(null);
    router.replace('/sign-in')
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                style={styles.logoutIcon}
              />
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.avatar }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles={{ marginTop: -10 }}
              titleStyles={{ fontSize: 18 }}
            />
            <View style={{ marginTop: -25, flexDirection: 'row'}}>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles={{ marginRight: 5 }}
                titleStyles={{ fontSize: 20 }}
              />
              <InfoBox
                title="1.2K"
                subtitle="Followers"
                titleStyles={{ fontSize: 20 }}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this user"
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: colors.secondary.DEFAULT,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  avatarImage: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
  },
});

export default Profile;
