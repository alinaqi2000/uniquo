import React from "react";
import {
  Input,
  IInputProps,
  FormControl,
  IFormControlProps,
  Icon,
  IIconProps,
} from "native-base";
import colors from "../../../config/colors";
import { Feather } from "@expo/vector-icons";

interface InputProps extends IFormControlProps {
  helperText?: string;
  errorText?: string;
  input: IInputProps;
  icon?: string;
  _icon?: IIconProps;
}
export default function FormInput({ icon, ...props }: InputProps) {
  return (
    <FormControl {...props}>
      <Input
        borderColor={colors.inputBorder}
        placeholderTextColor={colors.inputPlaceholder}
        InputLeftElement={
          icon ? (
            <Icon
              as={Feather}
              name={icon}
              color={colors.dimTextColor}
              size="sm"
              ml={3}
              {...props._icon}
            />
          ) : null
        }
        {...props.input}
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
