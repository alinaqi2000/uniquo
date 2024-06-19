import React from "react";
import { Icon, Box, HStack, View, Text, VStack, Skeleton } from "native-base";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { Pressable, IPressableProps } from "native-base";
import UserAvatar from "../images/UserAvatar";
import { BaseCompetition } from "../../../models/constants";
import UIService from "../../../services/UIService";
import { styles } from "../../../config/styles";
import Pluralize from "pluralize";

interface Props extends IPressableProps {
  competition: BaseCompetition;
  navigation?: any;
  openActionSheet?: (competition: BaseCompetition) => void;
}

export default function CompetitionItem(props: Props) {
  return (
    <View>
      <Pressable
        onPress={() => {
          switch (props.competition.stage) {
            case "payment_verification_pending":
              return props.navigation.push("Detail&ProcessCompetitionPayment", {
                competition: props.competition,
              });

            case "pending_publish":
              return props.navigation.push("Detail&ProcessCompetitionPayment", {
                competition: props.competition,
              });
            case "participation_period":
              return props.navigation.push("Detail&ParticipateCompetition", {
                competition: props.competition,
              });
            default:
              return props.navigation.push("PostsFeed", {
                competition: props.competition,
                title: props.competition.title,
              });
              break;
          }
        }}
      >
        <Box
          shadow={2}
          bg={UIService.competitionDisplayColor(props.competition)}
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
                  fontSize={"md"}
                >
                  #{props.competition.slug}
                </Text>
                <Pressable
                  onPress={() => {
                    if (props.openActionSheet) {
                      props.openActionSheet(props.competition);
                    }
                  }}
                  {...styles.rippleStyles}
                >
                  <Icon
                    as={MaterialIcons}
                    name="more-vert"
                    size={"md"}
                    color={colors.primaryTextColor}
                  />
                </Pressable>
              </HStack>
              <HStack ml={1} mt={1} space={4}>
                <HStack space={2} alignItems={"center"}>
                  <Icon
                    as={Feather}
                    name="users"
                    size={"xs"}
                    color={colors.primaryTextColor}
                  />
                  <Text color={colors.primaryTextColor} fontSize={"xs"}>
                    {Pluralize(
                      "participant",
                      props.competition.participations,
                      true
                    )}
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
                    Rs.{props.competition.financials.prize_money}
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
                    {props.competition.financials.entry_fee
                      ? "Rs." + props.competition.financials.entry_fee
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
                      size={"6"}
                      alt="AN"
                      uri={props.competition.organizer.avatar}
                      shadow={"5"}
                      borderColor={colors.primaryTextColor}
                    />
                    <Text
                      color={colors.primaryTextColor}
                      fontWeight="semibold"
                      fontSize={"xs"}
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
                  <DateStatus {...props.competition} />
                </HStack>
              </HStack>
            </Box>
          </View>
        </Box>
      </Pressable>
    </View>
  );
}

const DateStatus = (competition: BaseCompetition) => {
  const { title, sub_title } = UIService.competitionStatus(competition);
  return (
    <VStack>
      <Text color={colors.primaryTextColor} textAlign={"right"} fontSize={"9"}>
        {title}
      </Text>
      <HStack space={1} alignItems={"center"}>
        {sub_title !== "PENDING" ? (
          <Icon
            as={Feather}
            name="calendar"
            size={"xs"}
            color={colors.primaryTextColor}
          />
        ) : null}
        <Text
          color={colors.primaryTextColor}
          fontWeight="semibold"
          textAlign={"right"}
          fontSize={"10"}
        >
          {sub_title}
        </Text>
      </HStack>
    </VStack>
  );
};

export const CompetitionItemSkeleton = () => {
  return (
    <Box
      shadow={2}
      bg={colors.secondaryBg}
      px={3}
      py={2}
      rounded={15}
      w={"100%"}
      h={110}
      my={1}
      overflow="hidden"
    >
      <VStack space={8} justifyContent={"space-between"}>
        <VStack space={2}>
          {/* title */}
          <HStack mt={1}>
            <Skeleton
              h={4}
              w={"50%"}
              rounded={"full"}
              startColor={colors.skeletonStart}
            />
          </HStack>
          {/* participants row */}
          <HStack space={2}>
            <Skeleton
              startColor={colors.skeletonStart}
              h={2}
              w={"40%"}
              rounded={"full"}
            />
            <Skeleton
              startColor={colors.skeletonStart}
              h={2}
              w={"20%"}
              rounded={"full"}
            />
            <Skeleton
              startColor={colors.skeletonStart}
              h={2}
              w={"20%"}
              rounded={"full"}
            />
          </HStack>
        </VStack>
        {/* organizer row */}
        <HStack space={2} alignItems="center">
          <HStack alignItems="center" width={"60%"} space={"2"}>
            <Skeleton
              startColor={colors.skeletonStart}
              size={6}
              rounded="full"
            />
            <Skeleton
              startColor={colors.skeletonStart}
              h={2.5}
              w={"40%"}
              rounded="full"
            />
          </HStack>
          <VStack
            alignItems="flex-end"
            justifyContent={"flex-end"}
            width={"40%"}
            pr={2}
            space={"1"}
          >
            <Skeleton
              startColor={colors.skeletonStart}
              h={1.5}
              w={"40%"}
              rounded="full"
            />
            <Skeleton
              startColor={colors.skeletonStart}
              h={2.5}
              w={"50%"}
              rounded="full"
            />
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
