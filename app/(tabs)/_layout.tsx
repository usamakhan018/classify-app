import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}