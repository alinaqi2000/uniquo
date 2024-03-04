import React from "react";
import {
  Input,
  IInputProps,
  Icon,
  IFormControlProps,
  FormControl,
} from "native-base";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
interface InputProps extends IFormControlProps {
  helperText?: string;
  errorText?: string;
  input: IInputProps;
}
export default function FormInputPassword(props: InputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <FormControl {...props}>
      <Input
        borderColor={colors.inputPlacehoder}
        placeholderTextColor={colors.inputPlacehoder}
        {...props.input}
        type={show ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      {props.helperText ? (
        <FormControl.HelperText
          _text={{
            fontSize: "xs",
          }}
        >
          {props.helperText}
        </FormControl.HelperText>
      ) : null}
      {props.errorText ? (
        <FormControl.ErrorMessage
          _text={{
            fontSize: "xs",
          }}
        >
          {props.errorText}
        </FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
}
