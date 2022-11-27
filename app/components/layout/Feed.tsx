import { StatusBar, View } from "native-base";
import { KeyboardAvoidingView } from "react-native";
import colors from "../../config/colors";
import NotifactionProvider from "../hoc/NotifactionProvider";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Feed(props: Props) {
  return (
    <NotifactionProvider>
      <StatusBar animated={true} backgroundColor={colors.primaryBg} />
      <KeyboardAvoidingView behavior={"padding"}>
        <View mx={3}>{props.children}</View>
      </KeyboardAvoidingView>
    </NotifactionProvider>
  );
}
