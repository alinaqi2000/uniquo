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
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { Pressable } from "react-native";

interface PressableProps extends IPressableProps {
  title: string;
  icon?: string;
}
export default function SettingButton(props: PressableProps) {
  return (
    <Pressable {...props}>
      <Box
        shadow={2}
        backgroundColor={colors.secondaryBg}
        px={3}
        py={2}
        rounded={15}
        w={"100%"}
      >
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <HStack alignItems={"center"} space={4}>
            <Box
              bg={colors.primaryColor}
              rounded={15}
              p={3}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Icon
                as={MaterialIcons}
                color={colors.primaryTextColor}
                size={"sm"}
                name={props.icon || "person"}
              />
            </Box>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              {props.title}
            </Text>
          </HStack>
          <Box>
            <Icon
              as={MaterialIcons}
              color={colors.primaryTextColor}
              size={"sm"}
              name={"chevron-right"}
            />
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
}
