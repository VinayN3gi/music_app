import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { colors, fontSize } from '@/constants/token';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle:{
          fontSize:fontSize.xs,
          fontWeight:'500',
        },
        tabBarStyle:{
          position:'absolute',
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          borderTopWidth:0,
          paddingTop:0,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* Songs (Home) */}
      <Tabs.Screen
        name="(songs)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Artists */}
      <Tabs.Screen
        name="artists"
        options={{
          title: 'Artists',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="music.mic" color={color} />
          ),
        }}
      />

      {/* Favourites */}
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />

      {/* Playlists */}
      <Tabs.Screen
        name="playlists"
        options={{
          title: 'Playlists',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.bullet" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}