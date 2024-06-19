import React, { useEffect, useCallback, useState } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import NotificationTokenProvider from "./app/components/hoc/NotificationTokenProvider";
import Main from "./app/components/core/Main";
import { LogBox, StyleSheet } from "react-native";
import { themeConfig } from "./app/config/themeConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Ably from "ably";
import {
  AblyProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";

// if (__DEV__) {
//   import("./ReactotronConfig").then(() =>
//     console.log("Reactotron Configured")
//   );
// }

export default function App() {
  const client = new Ably.Realtime({
    key: process.env.ABLY_KEY,
  });


  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik/static/Rubik-Regular.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    "Rubik-Light": require("./assets/fonts/Rubik/static/Rubik-Light.ttf"),
    "Rubik-Italic": require("./assets/fonts/Rubik/static/Rubik-Italic.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik/static/Rubik-Medium.ttf"),
  });
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      LogBox.ignoreLogs([
        "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
      ]);
    }
    prepare();
  }, []);
  useEffect(() => {
    async function get() {
      try {
        const jsonValue = await AsyncStorage.getItem("firstTime");
        if (JSON.parse(jsonValue) == "no") setFirstTime(false);
        else setFirstTime(true);
      } catch (e) { }
    }
    get();
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
    <AblyProvider client={client}>
      <Provider store={store}>
        <NotificationTokenProvider>
          {(expoPushToken) => (
            <SafeAreaProvider>
              <SafeAreaView
                style={styles.droidSafeArea}
                onLayout={onLayoutRootView}
              >
                <NativeBaseProvider theme={theme}>
                  <Main token={expoPushToken} firstTime={firstTime} />
                </NativeBaseProvider>
              </SafeAreaView>
            </SafeAreaProvider>
          )}
        </NotificationTokenProvider>
      </Provider>
    </AblyProvider>
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    alignSelf: "stretch",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
