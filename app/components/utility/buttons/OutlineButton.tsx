import React from "react";
import { IButtonProps, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../config/colors";

interface ButtonProps extends IButtonProps {
  title: string;
}
export default function OutlineButton(props: ButtonProps) {
  return (
    <Button
      _text={{
        color: colors.primaryTextColor,
      }}
      borderRadius="lg"
      variant="outline"
      {...props}
    >
      {props.title}
    </Button>
  );
}
