import { StackScreenWithSearch } from '@/constants/layout';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={StackScreenWithSearch}>
      <Stack.Screen name="index" options={{ title: 'Artists' }} />
    </Stack>
  );
}
