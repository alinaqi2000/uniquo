import React from "react";
import { ITextAreaProps, TextArea } from "native-base";

interface InputProps extends ITextAreaProps {}
export default function FormTextArea(props: InputProps) {
  return <TextArea autoCompleteType={false} {...props} />;
}
