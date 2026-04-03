import { IconSymbol } from "@/components/ui/icon-symbol";
import { colors } from "@/constants/token";
import { usePlayer } from "@/providers/PlayerProvider";
import { router, useSegments } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CurrentTrackPlayer() {
  const { currentTrack, isPlaying, playNext, playPrevious, togglePlayback } =
    usePlayer();
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const isPlayerScreen = segments[segments.length - 1] === "player";

  if (!currentTrack || isPlayerScreen) {
    return null;
  }

  const imageSource: ImageSourcePropType = currentTrack.artwork
    ? { uri: currentTrack.artwork }
    : require("../assets/images/unknown_track.png");

  return (
    <Pressable
      onPress={() => router.push("/(tabs)/(songs)/player")}
      style={[
        styles.container,
        {
          bottom: 78 + insets.bottom,
        },
      ]}
    >
      <Image source={imageSource} style={styles.artwork} />

      <View style={styles.meta}>
        <Text numberOfLines={1} style={styles.title}>
          {currentTrack.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {currentTrack.artist ?? "Unknown artist"}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable hitSlop={8} onPress={playPrevious} style={styles.iconButton}>
          <IconSymbol name="backward.fill" size={18} color={colors.text} />
        </Pressable>
        <Pressable hitSlop={8} onPress={togglePlayback} style={styles.iconButton}>
          <IconSymbol
            name={isPlaying ? "pause.fill" : "play.fill"}
            size={18}
            color={colors.text}
          />
        </Pressable>
        <Pressable hitSlop={8} onPress={playNext} style={styles.iconButton}>
          <IconSymbol name="forward.fill" size={18} color={colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 12,
    right: 12,
    backgroundColor: "#171717",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  artist: {
    color: colors.textMuted,
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
