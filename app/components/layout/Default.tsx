import { Container, ScrollView, View } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import colors from "../../config/colors";
import LoadFont from "../hoc/LoadFont";
import NotifactionProvider from "../hoc/NotifactionProvider";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Default(props: Props) {
  return (
    <NotifactionProvider>
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"}>
          <View alignSelf={"stretch"} flex={1} mx={2} bg={colors.primaryBg}>
            {props.children}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </NotifactionProvider>
  );
}
