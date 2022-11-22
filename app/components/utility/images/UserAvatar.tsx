import React from "react";
import { IAvatarProps, Avatar } from "native-base";
import colors from "../../../config/colors";

interface AvatarProps extends IAvatarProps {
  uri?: string;
  alt?: string;
}
export default function UserAvatar(props: AvatarProps) {
  return (
    <Avatar bg={colors.primaryColor} source={{ uri: props.uri }} {...props}>
      {props.alt}
    </Avatar>
  );
}
