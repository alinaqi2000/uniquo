import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Actionsheet,
  AlertDialog,
  ArrowBackIcon,
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Pressable,
  ScrollView,
  Select,
  Text,
  useDisclose,
  View,
  VStack,
} from "native-base";

import colors from "../../../config/colors";
import FormInput from "../../../components/utility/forms/FormInput";
import { BackHandler, useWindowDimensions } from "react-native";
import TertiaryToneButton from "../../../components/utility/buttons/TertiaryToneButton";
import { useDispatch } from "react-redux";
import { addToken, toggleLoading } from "../../../store/app/app.actions";
import Feed from "../../../components/layout/AppLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import RequestService from "../../../services/RequestService";
import FormTextArea from "../../../components/utility/forms/FormTextArea";
import spaces from "../../../config/spaces";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import FormDateTimePicker from "../../../components/utility/forms/FormDateTimePicker";
import UtilService from "../../../services/UtilService";
import Lottie from "../../../components/utility/animated/Lottie";
import { MaterialIcons } from "@expo/vector-icons";
import { useSpring, animated } from "@react-spring/native";
import { Keyboard } from "react-native";
import BackButton from "../../../components/utility/buttons/BackButton";
import { DraftCompetition } from "../../../models/form/DraftCompetition";
import {
  addMyCompetition,
  setDraftCompetition,
  setMyCompetitions,
} from "../../../store/competitions/competitions.actions";
import SelectCategory from "./SelectCategory";
import { FinancialPieChart, BusinessCard } from "./FinancialPieChart";
import UIService from "../../../services/UIService";
import CompetitionForm from "./CompetitionForm";
import { OrganizerCompetition } from "../../../models/OrganizerCompetition";

const TOP_THRESHOLD = 150;
const BOTTOM_NEGATIVE_SPACE = 100;
const BOTTOM_BAR_HEIGHT = 240;
const DRAGGER_HEIGHT = 35;

export default function OrganizeCompetitionScreen({ navigation, route }) {
  const editMode = (): boolean => !!route.params?.competition;
  const competition = (): OrganizerCompetition => route.params?.competition;

  const { token } = useSelector((state: State) => state.app);
  const { draft, my } = useSelector((state: State) => state.competitions);
  const { height } = useWindowDimensions();
  const [showFinancials, setShowFinancials] = useState(true);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  const cancelRef = useRef(null);
  const clearRef = useRef(null);

  const [bottomNegativeSpace, setBottomNegativeSpace] = useState(
    BOTTOM_NEGATIVE_SPACE
  );

  const validationSchema = Yup.object<DraftCompetition>().shape({
    category_title: Yup.string().required("Please select a category"),
    title: Yup.string().required("Please add competition title"),
    description: Yup.string(),
    entry_fee: Yup.number().typeError("Enter a valid entry fee"),
    prize_money: Yup.number().typeError("Enter a valid prize money"),
    participants_allowed: Yup.number()
      .typeError("Enter valid number of participants")
      .min(1, "Add minimum 1 participant"),
    announcement_at: Yup.date()
      .typeError("Announcement date must be a valid date")
      .required("Announcement date is required"),
    voting_start_at: Yup.date()
      .typeError("Voting start date must be a valid date")
      .required("Voting start date is required")
      .when("announcement_at", (announcementDate, schema) => {
        return (
          announcementDate &&
          schema.max(
            announcementDate,
            "Voting start date must be before announcement date"
          )
        );
      }),
  });

  const cF = useFormik<DraftCompetition>({
    initialValues: draft,
    validationSchema,
    onSubmit: () => storeCompetition(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getStoredDraft();
    return () => {
      cF.setValues({ ...new DraftCompetition() });
      dispatch(setDraftCompetition(new DraftCompetition()));
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => handleCancel(true)} />,
    });
  }, [navigation]);

  useEffect(() => {
    const hardwareBackPressListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => handleCancel()
    );
    return () => {
      hardwareBackPressListener.remove();
    };
  }, [cF.values]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setShowFinancials(false)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setShowFinancials(true)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCancel = (backButtonPressed = false) => {
    if (editMode()) {
      return false;
    }

    if (JSON.stringify(draft) == JSON.stringify(cF.values)) {
      if (backButtonPressed) {
        navigation.goBack();
      }
      return false;
    }

    if (cancelOpen) {
      setCancelOpen(false);
      return true;
    }
    if (!cancelOpen) {
      if (
        cF.values.title ||
        cF.values.category_id ||
        cF.values.description ||
        cF.values.entry_fee ||
        cF.values.prize_money ||
        cF.values.participants_allowed
      ) {
        setCancelOpen(true);
        return true;
      }
    }
    if (backButtonPressed) {
      navigation.goBack();
    }
    return false;
  };

  const getStoredDraft = async () => {
    dispatch(toggleLoading());
    var storedDraft: DraftCompetition;
    if (editMode()) {
      storedDraft = DraftCompetition.fromBase(competition());
    } else {
      storedDraft = await UtilService.get("draftCompetition");
    }
    cF.setValues({ ...storedDraft });
    dispatch(setDraftCompetition(storedDraft));
    dispatch(toggleLoading());
  };

  const storeDraft = async (draftCompetition = null) => {
    if (!draftCompetition) {
      draftCompetition = new DraftCompetition(
        cF.values.category_id,
        cF.values.category_title,
        cF.values.title,
        cF.values.description,
        cF.values.entry_fee,
        cF.values.prize_money,
        cF.values.participants_allowed,
        cF.values.announcement_at,
        cF.values.voting_start_at
      );
    }
    dispatch(setDraftCompetition(draftCompetition));
    return await UtilService.store("draftCompetition", draftCompetition);
  };

  const storeCompetition = async () => {
    dispatch(toggleLoading());

    if (editMode()) {
      const response = await RequestService.put(
        "competitions/" + cF.values._id,
        { ...cF.values },
        token,
        cF
      ).finally(() => {
        dispatch(toggleLoading());
      });

      if (!response.error_type) {
        dispatch(setDraftCompetition(new DraftCompetition()));

        const updatedMyCompetitions = UtilService.updateObject(
          my,
          "id",
          cF.values._id,
          response.data
        );
        dispatch(setMyCompetitions(updatedMyCompetitions));

        UIService.showSuccessToast("Competition updated successfully!");

        navigation.goBack();
      }
    } else {
      const response = await RequestService.post(
        "competitions",
        { ...cF.values },
        token,
        cF
      ).finally(() => {
        dispatch(toggleLoading());
      });

      if (!response.error_type) {
        dispatch(setDraftCompetition(new DraftCompetition()));
        dispatch(addMyCompetition(response.data));
        await UtilService.store("draftCompetition", "");

        UIService.showSuccessToast("Competition created successfully!");

        // navigation.replace("MyCompetitions");

        navigation.replace("Detail&ProcessCompetitionPayment", {
          competition: response.data,
        });
      }
    }
  };
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Feed>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bgColor={colors.primaryBg}>
          {isOpen && <SelectCategory onClose={onClose} form={cF} />}
        </Actionsheet.Content>
      </Actionsheet>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={cancelOpen}
        onClose={() => setCancelOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton
            _icon={{ size: 4, color: colors.dimTextColor }}
          />
          <AlertDialog.Header
            bgColor={colors.primaryBg}
            _text={{ color: colors.dimTextColor }}
          >
            Discard Changes?
          </AlertDialog.Header>
          {/* <AlertDialog.Body
            bgColor={colors.primaryBg}
            _text={{ color: colors.dimTextColor }}
          >
            Changes will be discarded once you close the app.
          </AlertDialog.Body> */}
          <AlertDialog.Footer bgColor={colors.primaryBg}>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                _text={{ color: "red.400" }}
                onPress={() => navigation.goBack()}
              >
                Discard
              </Button>
              <Button
                _text={{ color: "tertiary.400", fontWeight: "semibold" }}
                onPress={async () => {
                  await storeDraft();
                  navigation.goBack();
                }}
                variant="unstyled"
              >
                Save
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <AlertDialog
        leastDestructiveRef={clearRef}
        isOpen={clearOpen}
        onClose={() => setClearOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton
            _icon={{ size: 4, color: colors.dimTextColor }}
          />
          <AlertDialog.Header
            bgColor={colors.primaryBg}
            _text={{ color: colors.dimTextColor }}
          >
            Are you sure?
          </AlertDialog.Header>
          <AlertDialog.Footer bgColor={colors.primaryBg}>
            <Button.Group space={2}>
              <Button
                _text={{ color: "red.400", fontWeight: "semibold" }}
                onPress={async () => {
                  await storeDraft(new DraftCompetition());
                  cF.setValues(new DraftCompetition());
                  setClearOpen(false);
                }}
                variant="unstyled"
              >
                Yes
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <View flex={1} w={"100%"} h={height}>
        <View h={height - BOTTOM_BAR_HEIGHT}>
          <ScrollView>
            <VStack mb={bottomNegativeSpace} justifyContent={"space-between"}>
              <CompetitionForm form={cF} onOpenCategories={onOpen} />
              <HStack mt={5} justifyContent={"center"}>
                <Button
                  variant="unstyled"
                  py={1}
                  endIcon={
                    <Icon
                      as={MaterialIcons}
                      color={"red.500"}
                      name={"clear"}
                      size="sm"
                    />
                  }
                  onPress={() => setClearOpen(true)}
                  borderRadius="sm"
                >
                  <Text color={"red.500"}>Clear Form</Text>
                </Button>
              </HStack>
            </VStack>
          </ScrollView>
        </View>
      </View>
      {showFinancials ? <FinancialBox editMode={editMode()} cF={cF} /> : null}
    </Feed>
  );
}

interface FinancialApiResponse {
  platform_charges: number;
  cost: number;
}
function FinancialBox({ cF, editMode }) {
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
  const [financialInfo, setFinancialInfo] = useState<FinancialApiResponse>({
    platform_charges: 0,
    cost: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (show) getFinancialInfo();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [show, cF.values.participants_allowed, cF.values.prize_money]);

  const getFinancialInfo = async () => {
    setLoading(true);
    const response = await RequestService.post(
      "competitions/calculate_financials",
      {
        participants: cF.values.participants_allowed,
      },
      token
    ).finally(() => setLoading(false));

    if (!response.error_type) {
      if (response.data.cost == 0) {
        response.data.platform_charges = 0;
      }
      setFinancialInfo({ ...response.data });
    }
  };

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
      (participation / 100) * +cF.values.participants_allowed;

    const business = participants * +cF.values.entry_fee;

    amount =
      business -
      financialInfo.cost -
      financialInfo.platform_charges -
      +cF.values.prize_money;

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
                    <FinancialPieChart {...financialInfo} {...cF.values} />
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
            py={spaces.xSpace}
            borderTopColor={colors.normalBorder}
            borderTopWidth={1}
            px={spaces.xSpace}
          >
            <VStack mb={4}>
              <HStack
                mb={2}
                borderBottomWidth={1}
                borderBottomColor={colors.dimBorder}
                justifyContent={"space-between"}
              >
                <Text fontSize={"xs"}>
                  Hosting Cost{" "}
                  {(() => {
                    if (
                      cF.values.participants_allowed == 0 ||
                      financialInfo.cost == 0
                    ) {
                      return;
                    }

                    const cost_per_participant =
                      financialInfo.cost / cF.values.participants_allowed;
                    return `(${cF.values.participants_allowed}x${cost_per_participant})`;
                  })()}
                </Text>
                {loading ? (
                  <Lottie animation="dots" h={16} w={40} />
                ) : (
                  <Text fontSize={"xs"}>
                    Rs.
                    {UtilService.number(financialInfo.cost)}
                  </Text>
                )}
              </HStack>
              <HStack
                mb={2}
                borderBottomWidth={1}
                borderBottomColor={colors.dimBorder}
                justifyContent={"space-between"}
              >
                <Text fontSize={"xs"}>Prize Money</Text>
                {loading ? (
                  <Lottie animation="dots" h={16} w={40} />
                ) : (
                  <Text fontSize={"xs"}>
                    Rs.
                    {UtilService.number(+cF.values.prize_money || 0)}
                  </Text>
                )}
              </HStack>
              <HStack
                mb={2}
                borderBottomWidth={1}
                borderBottomColor={colors.dimBorder}
                justifyContent={"space-between"}
              >
                <Text fontSize={"xs"}>Platform Charges</Text>
                {loading ? (
                  <Lottie animation="dots" h={16} w={40} />
                ) : (
                  <Text fontSize={"xs"}>
                    Rs.
                    {UtilService.number(financialInfo.platform_charges)}
                  </Text>
                )}
              </HStack>
              <HStack
                mb={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text fontSize={"sm"}>Total Bill</Text>
                {loading ? (
                  <Lottie animation="dots" h={24} w={40} />
                ) : (
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    Rs.
                    {UtilService.number(
                      financialInfo.cost +
                        financialInfo.platform_charges +
                        +cF.values.prize_money || 0
                    )}
                  </Text>
                )}
              </HStack>
            </VStack>
            <TertiaryToneButton
              // disabled={!cF.isValid}
              onPress={() => cF.handleSubmit()}
              title={editMode ? "Update" : "Process Payment"}
              _text={{ style: { fontWeight: "bold" } }}
            />
          </VStack>
        </VStack>
      </Box>
    </animated.View>
  );
}
