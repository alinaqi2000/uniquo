import React from "react";
import { Input, IInputProps, Icon } from "native-base";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface InputProps extends IInputProps {}
export default function FormInputPassword(props: InputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      InputRightElement={
        <Pressable onPress={() => setShow(!show)}>
          <Icon
            as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
            size={5}
            mr="2"
            color="muted.400"
          />
        </Pressable>
      }
      placeholder="Password"
    />
  );
}
