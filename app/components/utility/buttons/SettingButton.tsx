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
  icon?: string;
}
export default function SettingButton(props: PressableProps) {
  return (
    <Pressable>
      <Box
        shadow={2}
        backgroundColor={colors.primaryBg}
        px={3}
        py={3}
        rounded={15}
        w={"100%"}
      >
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <HStack alignItems={"center"} space={4}>
            <Box
              bg={colors.primaryColor}
              rounded={15}
              p={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Icon
                as={MaterialIcons}
                color={colors.primaryTextColor}
                size={"md"}
                name={"person"}
              />
            </Box>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Profile Setting
            </Text>
          </HStack>
          <Box>
            <Icon
              as={MaterialIcons}
              color={colors.primaryTextColor}
              size={"md"}
              name={"chevron-right"}
            />
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
}
