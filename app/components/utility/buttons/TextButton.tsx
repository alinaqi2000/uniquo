import React from "react";
import { ITextProps, Button, Icon, Text, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../config/colors";

interface TextProps extends ITextProps {
  title: string;
  onPress: () => void;
}
export default function TextButton(props: TextProps) {
  return (
    <Pressable onPress={props.onPress}>
      <Text color={colors.primaryTextColor} {...props}>
        {props.title}
      </Text>
    </Pressable>
  );
}
