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
      backgroundColor="tertiary.400"
      color={"primary.600"}
      variant="subtle"
      borderRadius="lg"
      {...props}
    >
      {props.title}
    </Button>
  );
}
