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
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { Pressable } from "react-native";
import { Category } from "../../../models/Category";

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
interface CatProps extends PressableProps {
  category: Category;
  navigation?: any;
  onPress?: any;
}
export default function CategoryItem(props: CatProps) {
  const randomNo = Math.ceil((Math.random() * 100) % colorCombinations.length);

  return (
    <Pressable
      onPress={() => {
        if (props.navigation) {
          props.navigation.push("CompetitionsFeed", {
            title: props.category.title,
            id: props.category.id,
          });
        }
      }}
    >
      <Box
        shadow={3}
        backgroundColor={colors.boxBg}
        px={3}
        py={3}
        rounded={15}
        w={120}
        h={130}
        mr={2}
        mb={2}
        overflow="hidden"
      >
        <Text
          color={colors.primaryTextColor}
          fontWeight="semibold"
          fontSize={"md"}
          width={110}
          zIndex={1}
          style={{ transform: [{ translateY: 30 }] }}
        >
          {props.category.title}
        </Text>

        <Box
          h={120}
          w={120}
          style={{
            position: "absolute",
            transform: [{ translateX: 75 }, { translateY: -60 }],
          }}
          bg={colorCombinations[randomNo - 1].t}
          rounded={120}
          opacity={40}
        />
        <Box
          h={90}
          w={90}
          style={{
            position: "absolute",
            transform: [{ translateX: -50 }, { translateY: 90 }],
          }}
          bg={colorCombinations[randomNo - 1].b}
          rounded={150}
          opacity={30}
        />
      </Box>
    </Pressable>
  );
}

export const CategoryItemSkeleton = () => {
  return (
    <Box
      shadow={3}
      backgroundColor={colors.boxBg}
      px={3}
      py={3}
      rounded={15}
      w={120}
      h={130}
      mr={2}
      mb={2}
      overflow="hidden"
    ></Box>
  );
};
