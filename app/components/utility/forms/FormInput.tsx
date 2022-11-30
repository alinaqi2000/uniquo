import React from "react";
import { Input, IInputProps } from "native-base";
import colors from "../../../config/colors";

interface InputProps extends IInputProps {}
export default function FormInput(props: InputProps) {
  return (
    <Input
      borderColor={colors.inputPlacehoder}
      placeholderTextColor={colors.inputPlacehoder}
      {...props}
    />
  );
}
