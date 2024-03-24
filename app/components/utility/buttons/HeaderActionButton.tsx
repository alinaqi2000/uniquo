import React from "react";
import { Button, IButtonProps, IIconProps, Icon } from "native-base";
import colors from "../../../config/colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface ButtonProps extends IButtonProps {
  icon: string;
  _icon?: IIconProps;
}
export default function HeaderActionButton({
  icon,
  _icon,
  ...props
}: ButtonProps) {
  return (
    <Button pl={0} mt={1} variant="unstyled" {...props}>
      <Icon
        as={MaterialIcons}
        name={icon}
        color={colors.dimTextColor}
        size="sm"
        {..._icon}
      />
    </Button>
  );
}
