import React from "react";
import {
  Button,
  Icon,
  Box,
  HStack,
  View,
  IPressableProps,
  Text,
  VStack,
  PresenceTransition,
} from "native-base";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { Pressable, PressableProps } from "react-native";
import UserAvatar from "../images/UserAvatar";
import { Competition } from "../../../models/Competition";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  Layout,
} from "react-native-reanimated";

const colorCombinations = [
  "#215190", // Blue (YinMn)
  "#00A980", // Green (Munsell)
  "#D89216", // Yellow (Gamboge)
  "#1C7947", // Green (Salem)
  "#940009", // Red (Sangria)
  "#E94560", // Paradise Pink
  "#704F4F", // Liver
  "#916BBF", // Middle Blue Purple
  "#346751", // Green Amazon
  "#351F39", // Dark Purple
];
interface Props extends PressableProps {
  competition: Competition;
  navigation?: any;
}
export default function CompetitionItem(props: Props) {
  const randomNo = Math.ceil(
    (Math.random() * 999 * colorCombinations.length) % colorCombinations.length
  );

  return (
    <Pressable
      onPress={() =>
        props.navigation.push("PostsFeed", { title: props.competition.slug })
      }
    >
      <Box
        shadow={2}
        bg={colorCombinations[randomNo - 1]}
        px={3}
        py={2}
        rounded={15}
        w={"100%"}
        h={110}
        my={1}
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
            <HStack ml={1} mt={1} space={4}>
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
              <HStack space={0} alignItems={"center"}>
                <Icon
                  as={FontAwesome5}
                  name="long-arrow-alt-down"
                  size={"xs"}
                  // mb={1}
                  color={"green.600"}
                />
                <Text color={colors.primaryTextColor} fontSize={"xs"}>
                  Rs.{props.competition.prize_money}
                </Text>
              </HStack>

              <HStack space={0} alignItems={"center"}>
                <Icon
                  as={FontAwesome5}
                  name="long-arrow-alt-up"
                  size={"xs"}
                  // mb={1}
                  color={"danger.600"}
                />
                <Text color={colors.primaryTextColor} fontSize={"xs"}>
                  {props.competition.entry_fee
                    ? "Rs." + props.competition.entry_fee
                    : "Free"}
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
              <Pressable
                onPress={() =>
                  props.navigation.push("Profile", {
                    user: props.competition.organizer,
                  })
                }
              >
                <HStack alignItems="center" space={2}>
                  <UserAvatar
                    size={"7"}
                    alt="AN"
                    uri={props.competition.organizer.avatar}
                    shadow={"5"}
                    borderColor={colors.primaryTextColor}
                  />
                  <Text
                    color={colors.primaryTextColor}
                    fontWeight="semibold"
                    fontSize={"sm"}
                  >
                    {props.competition.organizer.username}
                  </Text>
                </HStack>
              </Pressable>
              <HStack
                space={2}
                ml={1}
                alignItems="flex-end"
                justifyContent="center"
              >
                <Icon
                  as={Ionicons}
                  name="calendar"
                  size={"sm"}
                  color={colors.primaryTextColor}
                />
                <VStack>
                  <Text color={colors.primaryTextColor} fontSize={"9"}>
                    ANNOUNCEMENT
                  </Text>
                  <Text
                    color={colors.primaryTextColor}
                    fontWeight="semibold"
                    fontSize={"12"}
                  >
                    {props.competition.voting_start_at}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </Box>
        </View>
      </Box>
    </Pressable>
  );
}
