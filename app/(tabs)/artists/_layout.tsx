import { defaultStyle } from '@/styles';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View style={defaultStyle.container}>
    <Stack>
      <Stack.Screen name="index" options={{ title: "Songs" }} />
    </Stack>
    </View>
  );
}