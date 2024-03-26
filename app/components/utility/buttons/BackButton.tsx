import React from "react";
import {
  ArrowBackIcon,
  Button,
  IButtonProps,
  IIconProps,
  View,
} from "native-base";
import colors from "../../../config/colors";

interface ButtonProps extends IButtonProps {
  _icon?: IIconProps;
}
export default function BackButton(props: ButtonProps) {
  return (
    <Button mr={6} pl={0} mt={1} variant="unstyled" {...props}>
      <ArrowBackIcon
        size={"md"}
        color={colors.primaryTextColor}
        {...props._icon}
      />
    </Button>
  );
}
