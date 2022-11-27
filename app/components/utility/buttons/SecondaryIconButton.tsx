import React from "react";
import { IButtonProps, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../config/colors";

interface ButtonProps extends IButtonProps {
  icon: string;
  title: string;
}
export default function SecondaryIconButton(props: ButtonProps) {
  return (
    <Button
      backgroundColor={colors.secondaryColor}
      variant="subtle"
      endIcon={
        <Icon
          as={Ionicons}
          color={colors.primaryBg}
          name={props.icon}
          size="sm"
        />
      }
      borderRadius="lg"
      {...props}
    >
      {props.title}
    </Button>
  );
}
