import React from "react";
import {
  Input,
  IInputProps,
  FormControl,
  IFormControlProps,
} from "native-base";
import colors from "../../../config/colors";

interface InputProps extends IFormControlProps {
  helperText?: string;
  errorText?: string;
  input: IInputProps;
}
export default function FormInput(props: InputProps) {
  return (
    <FormControl {...props}>
      <Input
        borderColor={colors.inputPlaceholder}
        placeholderTextColor={colors.inputPlaceholder}
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
