import React, { useEffect, useCallback } from "react";
import {
  NativeBaseProvider,
  extendTheme,
  StatusBar,
  KeyboardAvoidingView,
} from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationTokenProvider from "./app/components/hoc/NotificationTokenProvider";
import Main from "./app/components/core/Main";
import colors from "./app/config/colors";
import { Platform, StyleSheet } from "react-native";
import { themeConfig } from "./app/config/themeConfig";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik/static/Rubik-Regular.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    "Rubik-Light": require("./assets/fonts/Rubik/static/Rubik-Light.ttf"),
    "Rubik-Italic": require("./assets/fonts/Rubik/static/Rubik-Italic.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik/static/Rubik-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const theme = extendTheme(themeConfig);

  return (
    <Provider store={store}>
      <NotificationTokenProvider>
        {(expoPushToken) => (
          <SafeAreaProvider>
            <SafeAreaView
              style={styles.droidSafeArea}
              onLayout={onLayoutRootView}
            >
              <StatusBar animated={true} backgroundColor={colors.primaryBg} />
              <NativeBaseProvider theme={theme}>
               
                  <Main token={expoPushToken} />
              </NativeBaseProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        )}
      </NotificationTokenProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    alignSelf: "stretch",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
