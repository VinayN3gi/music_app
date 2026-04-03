import { IconSymbol } from "@/components/ui/icon-symbol";
import { colors, fontSize, screenPadding } from "@/constants/token";
import { usePlayer } from "@/providers/PlayerProvider";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackPlayerScreen() {
  const { currentTrack, isPlaying, playNext, playPrevious, togglePlayback } =
    usePlayer();

  const imageSource: ImageSourcePropType = currentTrack?.artwork
    ? { uri: currentTrack.artwork }
    : require("../../../assets/images/unknown_track.png");

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroGlow} />

        <View style={styles.artworkShell}>
          <Image source={imageSource} style={styles.artwork} />
        </View>

        <View style={styles.metaSection}>
          <View style={styles.trackMetaBlock}>
            <Text numberOfLines={2} style={styles.title}>
              {currentTrack?.title ?? "Unknown track"}
            </Text>
            <Text numberOfLines={1} style={styles.artist}>
              {currentTrack?.artist ?? "Unknown artist"}
            </Text>
          </View>

          <Pressable style={styles.favoriteButton}>
            <IconSymbol name="heart.fill" size={20} color={colors.primary} />
          </Pressable>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>0:48</Text>
            <Text style={styles.timeText}>3:45</Text>
          </View>
        </View>

        <View style={styles.controlsRow}>
          <Pressable style={styles.smallControl}>
            <IconSymbol name="shuffle" size={18} color={colors.textMuted} />
          </Pressable>
          <Pressable onPress={playPrevious} style={styles.controlButton}>
            <IconSymbol name="backward.fill" size={26} color={colors.text} />
          </Pressable>
          <Pressable onPress={togglePlayback} style={styles.playButton}>
            <IconSymbol
              name={isPlaying ? "pause.fill" : "play.fill"}
              size={30}
              color={colors.background}
            />
          </Pressable>
          <Pressable onPress={playNext} style={styles.controlButton}>
            <IconSymbol name="forward.fill" size={26} color={colors.text} />
          </Pressable>
          <Pressable style={styles.smallControl}>
            <IconSymbol name="repeat" size={18} color={colors.textMuted} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: screenPadding.horizontal,
    paddingTop: 20,
    paddingBottom: 44,
    gap: 28,
  },
  heroGlow: {
    position: "absolute",
    top: 48,
    alignSelf: "center",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(252,60,68,0.16)",
    transform: [{ scaleX: 1.1 }, { scaleY: 0.9 }],
  },
  artworkShell: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 320,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.35,
    shadowRadius: 26,
    elevation: 10,
  },
  artwork: {
    width: "100%",
    height: "100%",
  },
  metaSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  trackMetaBlock: {
    flex: 1,
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
  },
  artist: {
    color: colors.textMuted,
    fontSize: 17,
    fontWeight: "500",
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  progressSection: {
    gap: 10,
  },
  progressTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    overflow: "hidden",
  },
  progressFill: {
    width: "32%",
    height: "100%",
    backgroundColor: colors.text,
    borderRadius: 999,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: "600",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  smallControl: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.text,
  },
  infoCard: {
    backgroundColor: "#121212",
    borderRadius: 24,
    padding: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  infoValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    lineHeight: 22,
  },
});
