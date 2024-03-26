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
import { setDraftCompetition } from "../../../store/competitions/competitions.actions";

const TOP_THRESHOLD = 150;
const BOTTOM_NEGATIVE_SPACE = 100;
const BOTTOM_BAR_HEIGHT = 240;
const DRAGGER_HEIGHT = 35;

export default function ProcessCompetitionPaymentScreen({ navigation, route }) {
  const { height } = useWindowDimensions();
  const { token } = useSelector((state: State) => state.app);
  const { my } = useSelector((state: State) => state.competitions);
  const dispatch = useDispatch();
  const { competition }: { competition: OrganizerCompetition } = route.params;
  const [stateCompetition, setStateCompetition] = useState(competition);

  const cF = useFormik<DraftCompetition>({
    initialValues: DraftCompetition.fromBase(competition),
    onSubmit: () => validateDates(cF.values),
  });

  useEffect(() => {
    const findCompetition = my.find((c) => c.id == competition.id);

    if (
      competition.stage === "payment_verification_pending" ||
      competition.stage === "pending_publish"
    ) {
      validateDates(findCompetition);
    }

    setStateCompetition(findCompetition);
  }, [my]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton onPress={() => navigation.navigate("MyCompetitions")} />
      ),
      headerRight: () => (
        <HeaderActionButton
          icon="edit"
          onPress={() =>
            navigation.push("OrganizeCompetition", {
              competition: stateCompetition,
              title: "Edit Competition",
            })
          }
        />
      ),
    });
  }, [navigation]);

  const validateDates = async (findCompetition) => {
    cF.resetForm({ errors: {} });

    const response = await RequestService.post(
      "competitions/" + competition.id + "/verify_dates",
      { ...DraftCompetition.fromBase(findCompetition) },
      token,
      cF
    );
    if (response.error_type == "validation") {
      UIService.showErrorToast(
        "Please update the competition before publishing."
      );
    }
  };
  const isInvalid = (key: string) => {
    return cF.errors[key];
  };
  return (
    <Feed>
      <View flex={1} w={"100%"} h={height}>
        <View
          h={height - BOTTOM_BAR_HEIGHT}
          justifyContent={"center"}
          mx={spaces.xSpace}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mb={BOTTOM_NEGATIVE_SPACE}>
              <AlertBox {...stateCompetition} />
              <VStack mt={2} space={2}>
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
                </VStack>
              </VStack>
              <VStack space={2} mt={5}>
                <HStack
                  borderBottomWidth={1}
                  borderBottomColor={colors.dimBorder}
                  py={1}
                  px={2}
                  borderRadius={2}
                  bg={colors.secondaryBg}
                >
                  <Text fontSize={"md"} color={colors.primaryColor}>
                    Financials
                  </Text>
                </HStack>
                <VStack space={2} mx={1}>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"xs"}>Entry Fee</Text>
                    <Text fontSize={"xs"} textAlign={"right"}>
                      {UIService.currency(
                        stateCompetition?.financials.entry_fee
                      )}
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"xs"}>Cost</Text>
                    <Text fontSize={"xs"} textAlign={"right"}>
                      {UIService.currency(stateCompetition?.financials.cost)}
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"xs"}>Platform Charges</Text>
                    <Text fontSize={"xs"} textAlign={"right"}>
                      {UIService.currency(
                        stateCompetition?.financials.platform_charges
                      )}
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"xs"}>Prize Money</Text>
                    <Text fontSize={"xs"} textAlign={"right"}>
                      {UIService.currency(
                        stateCompetition?.financials.prize_money
                      )}
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"md"}>Total</Text>
                    <Text fontSize={"md"} textAlign={"right"}>
                      {UIService.currency(
                        stateCompetition?.financials.total_amount
                      )}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>
        </View>
      </View>
      <FinancialBox navigation={navigation} competition={stateCompetition} />
    </Feed>
  );
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
                  Important!
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

      break;

    default:
      break;
  }
}
interface FinancialProps {
  competition: OrganizerCompetition;
  navigation?: any;
}
function FinancialBox({ competition, navigation }: FinancialProps) {
  const { width, height } = useWindowDimensions();
  const { token } = useSelector((state: State) => state.app);
  const [loading, setLoading] = useState(false);
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

  const generateBusinessPotential = (participation) => {
    var amount = 0;
    const participants =
      (participation / 100) * +competition.participants_allowed;

    const business = participants * +competition.financials.entry_fee;

    amount =
      business -
      competition.financials.cost -
      competition.financials.platform_charges -
      +competition.financials.prize_money;

    return { amount, participation };
  };

  return (
    <animated.View style={{ display: animatedProps.boxDisplay }}>
      <Box
        bgColor={colors.primaryBg}
        w={width}
        position={"absolute"}
        bottom={0}
      >
        <Box h={DRAGGER_HEIGHT}>
          <Button
            h={DRAGGER_HEIGHT}
            colorScheme={"darkText"}
            py={1}
            onPress={() => setOpen(!open)}
            bg={colors.secondaryBg}
            borderTopRadius={spaces.boxBorderRadius}
            borderBottomRadius={0}
          >
            <HStack alignItems={"center"} space={1}>
              <Text fontSize={"xs"}>Business Potential</Text>
              <Icon
                as={
                  <MaterialIcons
                    name={`keyboard-arrow-${open ? "down" : "up"}`}
                  />
                }
                size={5}
                // scaleX={3}
                color={colors.dimTextColor}
              />
            </HStack>
          </Button>
        </Box>

        <VStack flex={1} justifyContent={"space-between"}>
          <animated.View
            style={{
              height: animatedProps.height,
              overflow: "hidden",
            }}
          >
            <VStack
              h={height - BOTTOM_BAR_HEIGHT - TOP_THRESHOLD}
              p={spaces.xSpace}
            >
              <animated.View
                style={{
                  display: animatedProps.chartDisplay,
                }}
              >
                <ScrollView>
                  <HStack justifyContent={"space-evenly"} alignItems={"center"}>
                    <VStack space={1}>
                      <HStack alignItems={"center"} space={2}>
                        <Box
                          w={2}
                          h={2}
                          borderRadius={4}
                          bgColor={colors.primaryColor}
                        />
                        <Text fontSize={"xs"}>Cost</Text>
                      </HStack>
                      <HStack alignItems={"center"} space={2}>
                        <Box
                          w={2}
                          h={2}
                          borderRadius={4}
                          bgColor={colors.secondaryColor}
                        />
                        <Text fontSize={"xs"}>Prize Money</Text>
                      </HStack>
                      <HStack alignItems={"center"} space={2}>
                        <Box
                          w={2}
                          h={2}
                          borderRadius={4}
                          bgColor={colors.dimTextColor}
                        />
                        <Text fontSize={"xs"}>Platform Charge</Text>
                      </HStack>
                    </VStack>
                    <FinancialPieChart
                      cost={competition.financials.cost}
                      platform_charges={competition.financials.platform_charges}
                      prize_money={competition.financials.prize_money}
                    />
                  </HStack>
                  <HStack space={2} mt={6} justifyContent={"space-evenly"}>
                    <BusinessCard
                      color="tertiary"
                      {...generateBusinessPotential(100)}
                    />
                    <BusinessCard
                      color={"blue"}
                      {...generateBusinessPotential(75)}
                    />
                  </HStack>
                  <HStack space={2} mt={2} justifyContent={"space-evenly"}>
                    <BusinessCard
                      color={"orange"}
                      {...generateBusinessPotential(50)}
                    />
                    <BusinessCard
                      color={"red"}
                      {...generateBusinessPotential(25)}
                    />
                  </HStack>
                </ScrollView>
              </animated.View>
            </VStack>
          </animated.View>
          <VStack
            py={spaces.xSpace - 1}
            borderTopColor={colors.normalBorder}
            borderTopWidth={1}
            px={spaces.xSpace}
          >
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
                Total Bill
              </Text>
              <Text
                fontSize={"md"}
                color={"tertiary.700"}
                fontWeight={"semibold"}
              >
                {UIService.currency(competition.financials.total_amount)}
              </Text>
            </HStack>
            {competition.payment ? (
              <Text>Paid!</Text>
            ) : (
              <VStack mb={4}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("CardPayment", { competition })
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
            )}

            {/* <TertiaryToneButton
              onPress={() => {}}
              title="Process Payment"
              _text={{ style: { fontWeight: "bold" } }}
            /> */}
          </VStack>
        </VStack>
      </Box>
    </animated.View>
  );
}
