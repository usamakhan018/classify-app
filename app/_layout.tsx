import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import NotificationProvider from '@/providers/NotificationProvider';
import AppbarProvider from '@/providers/AppbarProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider>
        <NotificationProvider>
          <AppbarProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <SafeAreaView>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </SafeAreaView>
            </Stack>
            <StatusBar style="auto" />
          </AppbarProvider>
        </NotificationProvider>
      </Provider>
    </ThemeProvider>
  );
}
