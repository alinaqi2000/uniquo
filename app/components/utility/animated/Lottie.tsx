import React from "react";
import LottieView from "lottie-react-native";
import { animations } from "../../../config/assets";

interface Props {
  animation: string;
  w?: number;
  h?: number;
  loop?: boolean;
}
export default function Lottie(props: Props) {
  const animation = animations[props.animation]
    ? animations[props.animation]
    : animations.cartoon;
  return (
    <LottieView
      autoPlay
      loop={!!props.loop}
      style={{ width: props.w || 30, height: props.h || 30 }}
      source={animation}
    />
  );
}
