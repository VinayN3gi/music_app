import { FlatList } from "react-native";
import React from "react";
import library from "../constants/library.json";
import TrackListItem from "./TrackListItem";

const TracksList = () => {
  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 60 }}
      data={library}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
        <TrackListItem
          title={item.title}
          artwork={item.artwork}
          artist={item.artist}
          onPress={() => {}}
        />
      )}
    />
  );
};

export default TracksList;
