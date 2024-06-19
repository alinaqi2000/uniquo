import React, { useEffect } from "react";
import { View } from "native-base";

import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import colors from "../../config/colors";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
interface Props {
  children: JSX.Element | JSX.Element[];
}
export default function NotificationProvider(props: Props) {
  const navigation = useNavigation();
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        console.log(notification);
        // Linking.openURL("http://playground00.com/Products");
        // navigation.navigate(
        //   notification.notification.request.content.data.url as never,
        //   { name: "Noti" } as never
        // );
      }
    );
    return () => subscription.remove();
  }, []);
  return (
    <View alignSelf={"stretch"} flex={1} bg={colors.primaryBg}>
      {props.children}
    </View>
  );
}
