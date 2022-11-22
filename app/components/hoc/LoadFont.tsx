// import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "native-base";

export default function LoadFont({ children }: { children: JSX.Element }) {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("../../../assets/fonts/Rubik/static/Rubik-Regular.ttf"),
    "Rubik-Bold": require("../../../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    "Rubik-Light": require("../../../assets/fonts/Rubik/static/Rubik-Light.ttf"),
    "Rubik-Italic": require("../../../assets/fonts/Rubik/static/Rubik-Italic.ttf"),
    "Rubik-Medium": require("../../../assets/fonts/Rubik/static/Rubik-Medium.ttf"),
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

  return <View onLayout={onLayoutRootView}>{children}</View>;
}
