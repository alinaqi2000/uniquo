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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { Pressable } from "react-native";
import UserAvatar from "../images/UserAvatar";

interface PressableProps extends IPressableProps {
  icon?: string;
}
const colorCombinations = [
  "#215190",
  "#00A980",
  "#D6C237",
  "#02D8CB",
  "#940009",
];

export default function CompetitionItem(props: PressableProps) {
  const randomNo = Math.ceil(
    (Math.random() * 100 * colorCombinations.length) % colorCombinations.length
  );

  return (
    <Pressable>
      <Box
        shadow={2}
        bg={colorCombinations[randomNo - 1]}
        px={3}
        py={2}
        rounded={15}
        w={"100%"}
        h={110}
        mb={3}
        overflow="hidden"
      >
        <View flex={1} justifyContent={"space-between"}>
          <Box>
            <HStack space={4} justifyContent="space-between">
              <Text
                color={colors.primaryTextColor}
                fontWeight="semibold"
                fontSize={"xl"}
              >
                #knowledge-competition
              </Text>
              <Icon
                as={MaterialIcons}
                name="more-vert"
                size={"lg"}
                color={colors.primaryTextColor}
              />
            </HStack>
            <HStack space={2} ml={1}>
              <Icon
                as={MaterialIcons}
                name="people"
                size={"lg"}
                color={colors.primaryTextColor}
              />
              <Text color={colors.primaryTextColor} fontSize={"md"}>
                10,878 participants
              </Text>
            </HStack>
          </Box>
          <Box>
            <HStack
              space={2}
              justifyContent={"space-between"}
              alignItems="center"
            >
              <HStack alignItems="center" space={2}>
                <UserAvatar
                  size={"sm"}
                  alt="AN"
                  uri="https://images.wsj.net/im-122682/?width=860&height=573"
                  shadow={"5"}
                  borderColor={colors.primaryTextColor}
                />
                <Text
                  color={colors.primaryTextColor}
                  fontWeight="semibold"
                  fontSize={"md"}
                >
                  ali.naqi
                </Text>
              </HStack>
              <HStack space={2} ml={1} justifyContent="center">
                <Icon
                  as={Ionicons}
                  name="calendar"
                  size={"md"}
                  color={colors.primaryTextColor}
                />
                <Text
                  color={colors.primaryTextColor}
                  fontWeight="semibold"
                  fontSize={"md"}
                >
                  Oct 13, 2021
                </Text>
              </HStack>
            </HStack>
          </Box>
        </View>
      </Box>
    </Pressable>
  );
}
