import React from "react";
import { IButtonProps, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../config/colors";

interface ButtonProps extends IButtonProps {
   title: string;
}
export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button backgroundColor={colors.primaryColor} variant="subtle" {...props}>
      {props.title}
    </Button> 
  );
}
