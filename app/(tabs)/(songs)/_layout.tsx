import { StackScreenWithSearch } from '@/constants/layout';
import { colors } from '@/constants/token';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={StackScreenWithSearch}>
      <Stack.Screen name="index" options={{ title: 'Songs', headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          title: 'Now Playing',
          headerShown: true,
          headerLargeTitle: false,
          headerTransparent: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerBlurEffect: undefined,
        }}
      />
    </Stack>
  );
}
