import React from "react";
import { Input, IInputProps } from "native-base";

interface InputProps extends IInputProps {}
export default function FormInput(props: InputProps) {
  return <Input {...props} />;
}
