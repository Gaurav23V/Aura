import React, { useState } from 'react';
import { View, Text, FlatList, Image, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontFamilies } from '../../app/styles/globals';
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPost } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: latestPosts } = useAppwrite(getLatestPost);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.usernameText}>{user?.username}</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={images.logoSmall}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
      <SearchInput />
      <View style={styles.latestVideosContainer}>
        <Text style={styles.latestVideosText}>Latest Videos</Text>
        <Trending posts={latestPosts ?? []} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerContainer: {
    marginVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: fontFamilies.pmedium,
    fontSize: 14,
    color: colors.gray[100],
  },
  usernameText: {
    fontSize: 24,
    fontFamily: fontFamilies.psemibold,
    color: '#FFFFFF',
  },
  logoContainer: {
    marginTop: 6,
  },
  logo: {
    width: 36,
    height: 40,
  },
  latestVideosContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 32,
  },
  latestVideosText: {
    fontSize: 18,
    fontFamily: fontFamilies.pregular,
    color: colors.gray[100],
    marginBottom: 12,
  },
});

export default Home;