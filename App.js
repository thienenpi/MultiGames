import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { AuthProvider } from './app/context/AuthContext';
import AppNavigation from './app/navigation/AppNavigation';

export default function App() {
  // Load the fonts
  const [fontsLoaded] = useFonts({
    sfPro: require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    sfProItalic: require('./assets/fonts/SF-Pro-Display-RegularItalic.otf'),
    sfProBold: require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
    sfProBoldItalic: require('./assets/fonts/SF-Pro-Display-SemiboldItalic.otf'),
  });

  // Unused code, but do not remove or cmd
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null if can not load fonts
  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 1500);

  return (
    <AuthProvider>
      <AppNavigation></AppNavigation>
    </AuthProvider>
  );
}
