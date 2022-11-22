import React from "react";
import {
  IButtonProps,
  Button,
  Icon,
  Box,
  HStack,
  View,
  IPressableProps,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { Pressable } from "react-native";

interface PressableProps extends IPressableProps {
  icon?: string;
}
const colorCombinations = [
  {
    t: "#00A980",
    b: "#00C2FF",
  },
  {
    t: "#D89216",
    b: "#E1D89F",
  },
  {
    t: "#E52165",
    b: "#C4A35A",
  },
  {
    t: "#F0DF67",
    b: "#F5F7FA",
  },
];

export default function CategoryItem(props: PressableProps) {
  const randomNo = Math.ceil((Math.random() * 100) % colorCombinations.length);

  return (
    <Pressable>
      <Box
        shadow={2}
        backgroundColor={colors.secondaryBg}
        px={3}
        py={3}
        rounded={15}
        w={160}
        h={175}
        mr={2}
        overflow="hidden"
      >
        <Text
          color={colors.primaryTextColor}
          fontWeight="semibold"
          fontSize={"xl"}
          width={140}
          zIndex={1}
          style={{ transform: [{ translateY: 30 }] }}
        >
          Architecture & Culture
        </Text>

        <Box
          h={150}
          w={150}
          style={{
            position: "absolute",
            transform: [{ translateX: 90 }, { translateY: -60 }],
          }}
          bg={colorCombinations[randomNo - 1].t}
          rounded={150}
          opacity={40}
        />
        <Box
          h={150}
          w={150}
          style={{
            position: "absolute",
            transform: [{ translateX: -100 }, { translateY: 100 }],
          }}
          bg={colorCombinations[randomNo - 1].b}
          rounded={150}
          opacity={30}
        />
      </Box>
    </Pressable>
  );
}
