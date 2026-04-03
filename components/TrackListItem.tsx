import { colors, fontSize } from "@/constants/token";
import { defaultStyle } from "@/styles";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  const [isImageLoading, setIsImageLoading] = useState(Boolean(artwork));

  useEffect(() => {
    setIsImageLoading(Boolean(artwork));
  }, [artwork]);

  const imageSource: ImageSourcePropType = artwork
    ? { uri: artwork }
    : require("../assets/images/unknown_track.png");

  const isActiveTrack = false;

  return (
    <TouchableHighlight onPress={onPress} underlayColor="#1a1a1a">
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={imageSource}
            onLoadStart={() => setIsImageLoading(Boolean(artwork))}
            onLoadEnd={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            style={{
              ...styles.trackArtImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
          {isImageLoading ? (
            <View style={styles.imageLoader}>
              <ActivityIndicator color={colors.text} size="small" />
            </View>
          ) : null}
        </View>

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
    width: 50,
    height: 50,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  imageLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
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
