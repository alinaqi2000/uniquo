import React from "react";
import {
  FormControl,
  IFormControlProps,
  ITextAreaProps,
  TextArea,
} from "native-base";
import colors from "../../../config/colors";

interface InputProps extends IFormControlProps {
  helperText?: string;
  errorText?: string;
  input: ITextAreaProps;
}
export default function FormTextArea(props: InputProps) {
  return (
    <FormControl {...props}>
      <TextArea
        autoCompleteType={false}
        borderColor={colors.inputBorder}
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
