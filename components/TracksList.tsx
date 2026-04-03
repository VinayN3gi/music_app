import { colors, fontSize, screenPadding } from "@/constants/token";
import { usePlayer } from "@/providers/PlayerProvider";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import library from "../constants/library.json";
import TrackListItem from "./TrackListItem";

const TracksList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<TextInput>(null);
  const { currentTrack, selectTrack } = usePlayer();

  const filteredTracks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return library;
    }

    return library.filter((track) => {
      const title = track.title?.toLowerCase() ?? "";
      const artist = track.artist?.toLowerCase() ?? "";

      return (
        title.includes(normalizedQuery) || artist.includes(normalizedQuery)
      );
    });
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.blur();
    Keyboard.dismiss();
  };

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainer}
      data={filteredTracks}
      keyExtractor={(item) => item.url}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Songs</Text>
          <View style={styles.searchBar}>
            <IconSymbol
              name="magnifyingglass"
              size={18}
              color={colors.textMuted}
            />
            <TextInput
              ref={searchInputRef}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search songs or artists"
              placeholderTextColor={colors.textMuted}
              selectionColor={colors.primary}
              style={styles.searchInput}
              returnKeyType="search"
            />
            {searchQuery ? (
              <Pressable
                onPress={clearSearch}
                hitSlop={10}
                style={styles.clearButton}
              >
                <IconSymbol
                  name="xmark.circle.fill"
                  size={18}
                  color={colors.textMuted}
                />
              </Pressable>
            ) : null}
          </View>
        </View>
      }
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <TrackListItem
          title={item.title}
          artwork={item.artwork}
          artist={item.artist}
          isActiveTrack={currentTrack?.url === item.url}
          onPress={() => {
            selectTrack(item);
            router.push("/(tabs)/(songs)/player");
          }}
        />
      )}
    />
  );
};

export default TracksList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: screenPadding.horizontal,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingLeft: 14,
    paddingRight: 10,
    minHeight: 48,
  },
  searchInput: {
    color: colors.text,
    fontSize: fontSize.sm,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
  },
});
