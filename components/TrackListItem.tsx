import { colors, fontSize } from "@/constants/token";
import { defaultStyle } from "@/styles";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const TrackListItem = ({
  title,
  artwork,
  artist,
  onPress,
}: {
  title: string;
  artwork?: string;
  artist?: string;
  onPress?: () => void;
}) => {
  const imageSource: ImageSourcePropType = artwork
    ? { uri: artwork }
    : require("../assets/images/unknown_track.png");

  const isActiveTrack = false;

  return (
    <TouchableHighlight onPress={onPress} underlayColor="#1a1a1a">
      <View style={styles.container}>
        <Image
          source={imageSource}
          style={{
            ...styles.trackArtImage,
            opacity: isActiveTrack ? 0.6 : 1,
          }}
        />

        <View style={styles.trackTextContainer}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.trackTitleText,
              color: isActiveTrack ? colors.primary : colors.text,
            }}
          >
            {title}
          </Text>

          {artist ? (
            <Text numberOfLines={1} style={styles.trackArtistText}>
              {artist}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TrackListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  trackArtImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackTextContainer: {
    flex: 1,
  },
  trackTitleText: {
    ...defaultStyle.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  trackArtistText: {
    ...defaultStyle.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});
