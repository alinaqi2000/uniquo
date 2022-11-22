import React from "react";
import { IButtonProps, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../config/colors";

interface ButtonProps extends IButtonProps {
  title: string;
}
export default function TertiaryToneButton(props: ButtonProps) {
  return (
    <Button
      backgroundColor="cyan.200"
      color={"primary.600"}
      variant="subtle"
      {...props}
    >
      {props.title}
    </Button>
  );
}
