import { StatusBar, View } from "native-base";
import { KeyboardAvoidingView } from "react-native";
import colors from "../../config/colors";
import NotificationProvider from "../hoc/NotificationProvider";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function AppLayout(props: Props) {
  return (
    <NotificationProvider>
      <StatusBar animated={true} backgroundColor={colors.primaryBg} />
      {/* <KeyboardAvoidingView behavior={"padding"}> */}
      <>{props.children}</>
      {/* </KeyboardAvoidingView> */}
    </NotificationProvider>
  );
}
