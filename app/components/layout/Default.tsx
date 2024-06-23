import { Container, ScrollView, StatusBar, View } from "native-base";
import { Animated, KeyboardAvoidingView, Platform } from "react-native";
import colors from "../../config/colors";
import spaces from "../../config/spaces";
import NotifactionProvider from "../hoc/NotificationProvider";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Default(props: Props) {
  return (
    <NotifactionProvider>
      <StatusBar animated={true} backgroundColor={colors.primaryBg} />
      <Animated.ScrollView>
        <KeyboardAvoidingView behavior={"padding"}>
          <View mx={spaces.xSpace} flex={1}>{props.children}</View>
        </KeyboardAvoidingView>
      </Animated.ScrollView>
    </NotifactionProvider>
  );
}
