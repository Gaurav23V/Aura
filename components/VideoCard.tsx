import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontFamilies } from '../app/styles/globals';
import { icons } from '@/constants';
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({ title, creator, avatar, thumbnail, videoUri }) => {
  const [play, setPlay] = useState(false);
  const videoRef = React.useRef(null);

  const handlePlayPause = () => {
    setPlay((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.creatorInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatarImage}
              resizeMode='cover'
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.creatorText} numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>
        <View style={styles.menuIconContainer}>
          <Image
            source={icons.menu}
            style={styles.menuIcon}
            resizeMode='contain'
          />
        </View>
      </View>

      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
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
          onPress={handlePlayPause}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnailImage}
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 56,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  creatorInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary[200],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
    gap: 4,
  },
  titleText: {
    fontFamily: fontFamilies.psemibold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  creatorText: {
    fontSize: 12,
    color: colors.gray[100],
    fontFamily: fontFamilies.pregular,
  },
  menuIconContainer: {
    paddingTop: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  thumbnailContainer: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
  styledView: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginTop: 12,
  },
});

export default VideoCard;
