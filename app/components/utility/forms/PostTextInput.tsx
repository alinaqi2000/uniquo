import React, { useState } from "react";
import {
  Input,
  IInputProps,
  FormControl,
  IFormControlProps,
  Icon,
  IIconProps,
  TextArea,
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
export default function PostTextInput({ icon, ...props }: InputProps) {
  const [height, setHeight] = useState(100);
  return (
    <FormControl {...props}>
      <TextArea
        autoCompleteType={"auto"}
        borderColor={colors.inputBorder}
        borderWidth={0}
        multiline
        h={height}
        minH={100}
        onContentSizeChange={(e) =>
          setHeight(() => {
            if (e.nativeEvent.contentSize.height > 100) {
              return e.nativeEvent.contentSize.height;
            }
            return 100;
          })
        }
        borderBottomWidth={1}
        fontSize={"lg"}
        autoFocus
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
