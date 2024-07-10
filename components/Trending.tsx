import { icons } from '@/constants';
import React, { useState } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  from: {
    scale: 0.9,
  },
  to: {
    scale: 1.1,
  },
};

const zoomOut = {
  from: {
    scale: 1.1,
  },
  to: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const videoRef = React.useRef(null);

  return (
    <Animatable.View
      style={styles.trendingItemContainer}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: item.video }}
          style={styles.styledView}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.thumbnailContainer}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={styles.thumbnailImage}
            imageStyle={styles.thumbnailImageStyle}
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.id);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  trendingItemContainer: {
    marginRight: 20,
  },
  thumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnailImage: {
    width: 208, // Equivalent to w-52
    height: 288, // Equivalent to h-72
    marginVertical: 20,
  },
  thumbnailImageStyle: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  playIcon: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
  styledView: {
    width: 208, // 52 * 4 (assuming 1 unit = 4 pixels)
    height: 288, // 72 * 4
    borderRadius: 35,
    marginTop: 12, // 3 * 4
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // white with 10% opacity
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});

export default Trending;
