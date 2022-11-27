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
import { Competition } from "../../../models/Competition";

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
interface Props extends PressableProps {
  competition: Competition;
}
export default function CompetitionItem(props: Props) {
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
                fontSize={"lg"}
              >
                #{props.competition.slug}
              </Text>
              <Pressable>
                <Icon
                  as={MaterialIcons}
                  name="more-vert"
                  size={"md"}
                  color={colors.primaryTextColor}
                />
              </Pressable>
            </HStack>
            <HStack ml={1} space={4}>
              <HStack space={2}>
                <Icon
                  as={MaterialIcons}
                  name="people"
                  size={"sm"}
                  color={colors.primaryTextColor}
                />
                <Text color={colors.primaryTextColor} fontSize={"xs"}>
                  {props.competition.participations} participants
                </Text>
              </HStack>
              <HStack space={2}>
                <Icon
                  as={Ionicons}
                  name="card"
                  size={"sm"}
                  color={colors.primaryTextColor}
                />
                <Text color={colors.primaryTextColor} fontSize={"xs"}>
                  Rs.{props.competition.prize_money}
                </Text>
              </HStack>
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
                  uri={props.competition.organizer.avatar}
                  shadow={"5"}
                  borderColor={colors.primaryTextColor}
                />
                <Text
                  color={colors.primaryTextColor}
                  fontWeight="semibold"
                  fontSize={"md"}
                >
                  {props.competition.organizer.username}
                </Text>
              </HStack>
              <HStack space={2} ml={1} justifyContent="center">
                <Icon
                  as={Ionicons}
                  name="calendar"
                  size={"sm"}
                  color={colors.primaryTextColor}
                />
                <Text
                  color={colors.primaryTextColor}
                  fontWeight="semibold"
                  fontSize={"sm"}
                >
                  {props.competition.voting_start_at}
                </Text>
              </HStack>
            </HStack>
          </Box>
        </View>
      </Box>
    </Pressable>
  );
}
