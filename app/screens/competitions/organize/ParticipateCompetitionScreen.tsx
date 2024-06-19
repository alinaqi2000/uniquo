import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  View,
  Image,
  Pressable,
  Alert,
  IconButton,
  CloseIcon,
  List,
  FlatList,
  Badge,
} from "native-base";

import Feed from "../../../components/layout/AppLayout";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import spaces from "../../../config/spaces";
import { useDispatch } from "react-redux";
import { OrganizerCompetition } from "../../../models/OrganizerCompetition";
import BackButton from "../../../components/utility/buttons/BackButton";
import colors from "../../../config/colors";
import UIService from "../../../services/UIService";
import { useSpring, animated } from "@react-spring/native";
import { BackHandler, ScrollView, useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Lottie from "../../../components/utility/animated/Lottie";
import TertiaryToneButton from "../../../components/utility/buttons/TertiaryToneButton";
import RequestService from "../../../services/RequestService";
import UtilService from "../../../services/UtilService";
import { BusinessCard, FinancialPieChart } from "./FinancialPieChart";
import { icons } from "../../../config/assets";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderActionButton from "../../../components/utility/buttons/HeaderActionButton";
import ListItem from "../../../components/utility/app/common/ListItem";
import { BaseCompetition } from "../../../models/constants";
import { points } from "../../../config/points";
import { useFormik } from "formik";
import { DraftCompetition } from "../../../models/form/DraftCompetition";
import {
  setDraftCompetition,
  setFeedCompetitions,
  setMyCompetitions,
} from "../../../store/competitions/competitions.actions";
import { toggleLoading } from "../../../store/app/app.actions";
import { Competition } from "../../../models/Competition";
import { Post } from "../../../models/Post";
import DraftPostItem from "../../../components/utility/app/DraftPostItem";
import { ChannelProvider } from "ably/react";
import UserAvatar from "../../../components/utility/images/UserAvatar";
import { PostDescriptionItem, PostMediaItems } from "../../../components/utility/app/PostItem";

const TOP_THRESHOLD = 150;
const BOTTOM_NEGATIVE_SPACE = 100;
const BOTTOM_BAR_HEIGHT = 60;
const DRAGGER_HEIGHT = 35;

export default function ParticipateCompetitionScreen({ navigation, route }) {
  const { height } = useWindowDimensions();
  const { token } = useSelector((state: State) => state.app);
  const { feed } = useSelector((state: State) => state.competitions);
  const dispatch = useDispatch();
  const { competition }: { competition: Competition } = route.params;
  const [stateCompetition, setStateCompetition] = useState(competition);

  const cF = useFormik<DraftCompetition>({
    initialValues: DraftCompetition.fromBase(competition),
    onSubmit: () => participateCompetition(),
  });
  useEffect(() => {
    const findCompetition = feed.find((c) => c.id == competition.id);
    setStateCompetition(findCompetition);
  }, [feed]);

  const deleteDraft = async (post: Post) => {
    dispatch(toggleLoading());

    const response = await RequestService.delete(
      "posts/" + competition.id + "/delete_draft/" + post.id,
      token
    ).finally(() => dispatch(toggleLoading()));

    if (!response.error_type) {
      const updatedCompetitions = UtilService.updateObject(
        feed,
        "id",
        competition.id,
        response.data
      );

      setStateCompetition(response.data);
      dispatch(setFeedCompetitions(updatedCompetitions));

      UIService.showSuccessToast("Post deleted from draft.");
    }
  };

  const participateCompetition = async () => {
    dispatch(toggleLoading());

    if (cF.isValid) {
      const response = await RequestService.post(
        "competitions/" + competition.id + "/participate",
        {},
        token
      );

      if (!response.error_type) {
        const updatedCompetitions = UtilService.updateObject(
          feed,
          "id",
          cF.values._id,
          response.data
        );

        setStateCompetition(response.data);
        dispatch(setFeedCompetitions(updatedCompetitions));

        UIService.showSuccessToast(
          "Create your post for submission.",
          "Competition participated!"
        );
      }
    }
    dispatch(toggleLoading());
  };
  const isInvalid = (key: string) => {
    return cF.errors[key];
  };
  return (
    <Feed>
      <ChannelProvider channelName="post-updated">
        <View flex={1} w={"100%"} h={height}>
          <View
            h={height - BOTTOM_BAR_HEIGHT}
            justifyContent={"center"}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack>
                <AlertBox {...stateCompetition} />
                <VStack mt={2} space={"lg"} mx={spaces.xSpace}
                >
                  <HStack
                    borderBottomWidth={1}
                    borderBottomColor={colors.dimBorder}
                    py={1}
                    px={2}
                    borderRadius={2}
                    bg={colors.secondaryBg}
                  >
                    <Text fontSize={"md"} color={colors.primaryColor}>
                      Details
                    </Text>
                  </HStack>
                  <VStack space={2} mx={1}>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>Title</Text>
                      <Text textAlign={"right"}>{stateCompetition?.title}</Text>
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xs"}>Hashtag#</Text>
                      <Text fontSize={"xs"} textAlign={"right"}>
                        #{stateCompetition?.slug}
                      </Text>
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xs"}>Category</Text>
                      <Text fontSize={"xs"} textAlign={"right"}>
                        {stateCompetition?.category.title}
                      </Text>
                    </HStack>
                    <HStack
                      borderBottomWidth={isInvalid("voting_start_at") ? 1 : 0}
                      borderColor={"red.400"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xs"}>Voting Date</Text>
                      <Text fontSize={"xs"} textAlign={"right"}>
                        {UtilService.convertHoursFormat(
                          stateCompetition?.voting_time
                        )}{" "}
                        {stateCompetition?.voting_start_at}
                      </Text>
                    </HStack>
                    {isInvalid("voting_start_at") ? (
                      <HStack>
                        <Text fontSize={"xs"} color={"red.400"}>
                          {cF.errors.voting_start_at}
                        </Text>
                      </HStack>
                    ) : null}
                    <HStack
                      borderBottomWidth={isInvalid("announcement_at") ? 1 : 0}
                      borderColor={"red.400"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xs"}>Announcement Date</Text>
                      <Text fontSize={"xs"} textAlign={"right"}>
                        {UtilService.convertHoursFormat(
                          stateCompetition?.announcement_at
                        )}{" "}
                        {stateCompetition?.announcement_at}
                      </Text>
                    </HStack>
                    {isInvalid("announcement_at") ? (
                      <HStack>
                        <Text fontSize={"xs"} color={"red.400"}>
                          {cF.errors.announcement_at}
                        </Text>
                      </HStack>
                    ) : null}
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xs"}>Participants Allowed</Text>
                      <Text fontSize={"xs"} textAlign={"right"}>
                        {stateCompetition?.participants_allowed}
                      </Text>
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xs"}>Total Participations</Text>
                      <Text fontSize={"xs"} textAlign={"right"}>
                        {stateCompetition?.participations}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text>{competition.description}</Text>
                    </HStack>
                  </VStack>

                  {/* My Draft Posts */}
                  {stateCompetition.myDraftPosts.length ? (
                    <Box mt={"sm"} mr={0} mx={spaces.xSpace * -1}>
                      <HStack
                        ml={spaces.xSpace}
                        space={2}
                        alignItems={"baseline"}
                      >
                        <Text
                          fontWeight={"semibold"}
                          color={colors.dimTextColor}
                          my={3}
                          fontSize={"md"}
                        >
                          My Drafts ({stateCompetition.myDraftPosts.length}/3)
                        </Text>
                        <Box
                          h={1}
                          w={5}
                          style={{ transform: [{ translateY: -3 }] }}
                          bg={colors.secondaryColor}
                          opacity={50}
                        />
                      </HStack>

                      <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={stateCompetition.myDraftPosts}
                        renderItem={({
                          item,
                          index,
                        }: {
                          item: Post;
                          index: number;
                        }) => (
                          <Box ml={index == 0 ? spaces.xSpace : 0}>
                            <DraftPostItem
                              navigation={navigation}
                              post={item}
                              competition={stateCompetition}
                              deleteDraft={deleteDraft}
                            />
                          </Box>
                        )}
                      />
                    </Box>
                  ) : null}

                  {/* My Post */}
                  {stateCompetition.myPost ? <>
                    <HStack
                      space={2}
                      alignItems={"baseline"}
                    >
                      <Text
                        fontWeight={"semibold"}
                        color={colors.dimTextColor}
                        my={1}
                        fontSize={"md"}
                      >
                        My Post
                      </Text>
                      <Box
                        h={1}
                        w={5}
                        style={{ transform: [{ translateY: -3 }] }}
                        bg={colors.secondaryColor}
                        opacity={50}
                      />
                    </HStack>
                    <PostItem post={stateCompetition.myPost} navigation={navigation} />
                  </>

                    : null}

                </VStack>
              </VStack>
            </ScrollView>
          </View>
        </View>
        {
          !stateCompetition.myPost ?
            <FinancialBox
              navigation={navigation}
              form={cF}
              competition={stateCompetition}
            />

            : null
        }
      </ChannelProvider>
    </Feed>
  );
}

const PostItem = (props: { post: Post, navigation: any }) => {
  var status = null
  const { width } = useWindowDimensions()

  if (props.post.approved) {
    status = <Badge borderRadius={5} colorScheme="tertiary">APPROVED</Badge>
  }

  return <Box mb={5} mx={spaces.xSpace * -1}>
    {/* Header */}
    <HStack
      mx={spaces.xSpace}
      justifyContent={"space-between"}
      alignItems="center"
    >
      <HStack alignItems={"center"}>
        <Pressable
          onPress={() => props.navigation.push("Profile", { user: props.post.user })}
        >
          <UserAvatar
            size={10}
            uri={props.post.user.avatar}
            alt={props.post.user.username}
          />
        </Pressable>
        <VStack ml={2}>
          <Text fontSize={"xs"} fontWeight={"semibold"}>
            {props.post.user.username}
          </Text>
          <Text fontSize={"xs"} color={colors.dimTextColor}>
            {props.post.posted_at.relative}
          </Text>
        </VStack>
      </HStack>
      <HStack>
        {status}

      </HStack>
    </HStack>
    <VStack my={1} mx={spaces.xSpace}>
      <PostDescriptionItem post={props.post} />
    </VStack>
    <VStack>
      {props.post.media.length && (
        <PostMediaItems post={props.post} />
      )}
    </VStack>
  </Box>

}

function AlertBox(competition: BaseCompetition) {
  switch (competition.stage) {
    case "payment_verification_pending":
      return (
        <Alert status="warning" colorScheme="warning">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="sm" fontWeight="medium" color="coolGray.800">
                  Note!
                </Text>
              </HStack>
            </HStack>
            <Box pl={3}>
              {points.competitions.payment_pending.map((p) => (
                <ListItem
                  color={colors.secondaryTextColor}
                  fontSize={"xs"}
                  text={p}
                />
              ))}
            </Box>
          </VStack>
        </Alert>
      );
    case "pending_publish":
      return (
        <Alert status="info" colorScheme="info">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="sm" fontWeight="medium" color="coolGray.800">
                  Note!
                </Text>
              </HStack>
            </HStack>
            <Box pl={3}>
              {points.competitions.pending_publish.map((p) => (
                <ListItem
                  color={colors.secondaryTextColor}
                  fontSize={"xs"}
                  text={p}
                />
              ))}
            </Box>
          </VStack>
        </Alert>
      );
      break;

    default:
      break;
  }
}
interface FinancialProps {
  competition: Competition;
  navigation?: any;
  form?: any;
}
function FinancialBox({ competition, form, navigation }: FinancialProps) {
  const { width, height } = useWindowDimensions();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  const animatedProps = useSpring<{
    height: number;
    boxDisplay: "flex" | "none";
    chartDisplay: "flex" | "none";
  }>({
    height: open ? height - TOP_THRESHOLD - BOTTOM_BAR_HEIGHT : 0,
    boxDisplay: show ? "flex" : "none",
    chartDisplay: open ? "flex" : "none",
    config: { duration: 200 },
  });
  useEffect(() => {
  }, [competition])
  useEffect(() => {
    const hardwareBackPressListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (open) {
          setOpen(false);
          return true;
        }

        return false;
      }
    );

    // Cleanup function
    return () => {
      hardwareBackPressListener.remove();
    };
  }, [open]);

  return (
    <animated.View style={{ display: animatedProps.boxDisplay }}>
      <Box
        bgColor={colors.primaryBg}
        w={width}
        position={"absolute"}
        bottom={0}
      >
        <VStack flex={1} justifyContent={"space-between"}>
          <VStack
            py={spaces.xSpace - 1}
            borderTopColor={colors.normalBorder}
            borderTopWidth={1}
            px={spaces.xSpace}
          >
            {competition.participated ? competition.myDraftPosts.length < 3 ?
              <TertiaryToneButton
                onPress={() =>
                  navigation.push("CreatePost", { competition })
                }
                title="Create Post"
                _text={{ style: { fontWeight: "bold" } }}
              />
              : null : (
              <>
                {competition.financials.entry_fee == 0 ? (
                  <>
                    <TertiaryToneButton
                      onPress={() => form.handleSubmit()}
                      title="Participate Now"
                      _text={{ style: { fontWeight: "bold" } }}
                    />
                  </>
                ) : (
                  <>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      bg={colors.secondaryColor}
                      mx={spaces.xSpace * -1 - 6}
                      px={3}
                      mb={2}
                      py={2}
                      borderRadius={5}
                    >
                      <Text
                        fontSize={"xs"}
                        fontWeight={"semibold"}
                        color={colors.secondaryTextColor}
                      >
                        Entry Fee
                      </Text>
                      <Text
                        fontSize={"md"}
                        color={"tertiary.700"}
                        fontWeight={"semibold"}
                      >
                        {UIService.currency(competition.financials.entry_fee)}
                      </Text>
                    </HStack>
                    <VStack mb={4}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("CardPayment", {
                            competition,
                            total: competition.financials.entry_fee,
                            paymentMode: "competition_participation",
                          })
                        }
                        _pressed={{ bgColor: colors.skeletonStart }}
                      >
                        <HStack
                          mb={0}
                          px={3}
                          mx={spaces.xSpace * -1 - 6}
                          py={2}
                          borderBottomWidth={1}
                          borderBottomColor={colors.dimBorder}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text fontSize={"xs"}>Pay with Card</Text>

                          <Image size={8} source={icons.credit_card} />
                        </HStack>
                      </Pressable>
                      <Pressable _pressed={{ bgColor: colors.skeletonStart }}>
                        <HStack
                          mb={0}
                          px={3}
                          mx={spaces.xSpace * -1 - 6}
                          py={2}
                          borderBottomWidth={1}
                          borderBottomColor={colors.dimBorder}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text fontSize={"xs"}>Pay with Jazzcash</Text>

                          <Image
                            w={16}
                            h={8}
                            resizeMode={"contain"}
                            source={icons.jazz_cash}
                          />
                        </HStack>
                      </Pressable>
                      <Pressable _pressed={{ bgColor: colors.skeletonStart }}>
                        <HStack
                          mb={0}
                          px={3}
                          mx={spaces.xSpace * -1 - 6}
                          py={2}
                          borderBottomWidth={1}
                          borderBottomColor={colors.dimBorder}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text fontSize={"xs"}>Pay with Easypaisa</Text>
                          <Box bg={"gray.300"} px={2} borderRadius={5}>
                            <Image
                              w={16}
                              h={7}
                              resizeMode={"contain"}
                              source={icons.easy_paisa}
                            />
                          </Box>
                        </HStack>
                      </Pressable>
                    </VStack>
                  </>
                )}
              </>
            )}
          </VStack>
        </VStack>
      </Box>
    </animated.View>
  );
}
