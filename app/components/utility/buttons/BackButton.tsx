import React from "react";
import { ArrowBackIcon, Button, IButtonProps, View } from "native-base";
import colors from "../../../config/colors";

interface ButtonProps extends IButtonProps {}
export default function BackButton(props: ButtonProps) {
  return (
    <Button mr={6} pl={0} mt={1} variant="unstyled" {...props}>
      <ArrowBackIcon size={"md"} color={colors.primaryTextColor} />
    </Button>
  );
}
