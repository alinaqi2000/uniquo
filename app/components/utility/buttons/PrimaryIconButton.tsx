import React from "react";
import { IButtonProps, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../config/colors";

interface ButtonProps extends IButtonProps {
  icon: string;
  title: string;
}
export default function PrimaryIconButton(props: ButtonProps) {
  return (
    <Button
      variant="subtle"
      backgroundColor="tertiary.400"
      color={"primary.600"}
      endIcon={<Icon as={Ionicons} name={props.icon} size="lg" />}
      borderRadius="lg"
      {...props}
    >
      {props.title}
    </Button>
  );
}
