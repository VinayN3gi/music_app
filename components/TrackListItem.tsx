import { IconSymbol } from "@/components/ui/icon-symbol";
import { colors, fontSize } from "@/constants/token";
import { defaultStyle } from "@/styles";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface TrackListItemProps {
  title: string;
  artwork?: string;
  artist?: string;
  isActiveTrack?: boolean;
  onPress?: () => void;
  onOptionsPress?: () => void;
}

const TrackListItem = ({
  title,
  artwork,
  artist,
  isActiveTrack = false,
  onPress,
  onOptionsPress,
}: TrackListItemProps) => {
  const [isImageLoading, setIsImageLoading] = useState(Boolean(artwork));

  useEffect(() => {
    setIsImageLoading(Boolean(artwork));
  }, [artwork]);

  const imageSource: ImageSourcePropType = artwork
    ? { uri: artwork }
    : require("../assets/images/unknown_track.png");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isActiveTrack && styles.activeContainer,
        pressed && styles.pressedContainer,
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={imageSource}
          onLoadStart={() => setIsImageLoading(Boolean(artwork))}
          onLoadEnd={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
          style={styles.trackArtImage}
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
          style={[
            styles.trackTitleText,
            isActiveTrack ? styles.activeTrackTitle : null,
          ]}
        >
          {title}
        </Text>

        {artist ? (
          <Text numberOfLines={1} style={styles.trackArtistText}>
            {artist}
          </Text>
        ) : null}
      </View>

      <Pressable
        onPress={onOptionsPress}
        style={({ pressed }) => [
          styles.optionsButton,
          pressed ? styles.optionsButtonPressed : null,
        ]}
        hitSlop={10}
      >
        <IconSymbol name="ellipsis" size={18} color={colors.textMuted} />
      </Pressable>
    </Pressable>
  );
};

export default TrackListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  activeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  pressedContainer: {
    opacity: 0.78,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  imageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 6,
  },
  trackArtImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  activeImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  trackTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  trackTitleText: {
    ...defaultStyle.text,
    fontSize: fontSize.sm,
    fontWeight: "700",
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  activeTrackTitle: {
    color: colors.primary,
  },
  trackArtistText: {
    ...defaultStyle.text,
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "400",
  },
  optionsButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsButtonPressed: {
    backgroundColor: "rgba(255,255,255,0.06)",
  },
});
