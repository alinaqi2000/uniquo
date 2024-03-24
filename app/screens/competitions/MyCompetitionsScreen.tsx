import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Actionsheet,
  AlertDialog,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import Feed from "../../components/layout/AppLayout";
import { useSelector } from "react-redux";
import { State } from "../../store";
import CompetitionItem, {
  CompetitionItemSkeleton,
} from "../../components/utility/app/CompetitionItem";
import spaces from "../../config/spaces";
import { useDispatch } from "react-redux";
import { OrganizerCompetition } from "../../models/OrganizerCompetition";
import RequestService from "../../services/RequestService";
import { setMyCompetitions } from "../../store/competitions/competitions.actions";
import UtilService from "../../services/UtilService";
import SwipeableFlatList from "react-native-swipeable-list";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../config/styles";
import { BaseCompetition } from "../../models/constants";
import colors from "../../config/colors";
import { toggleLoading } from "../../store/app/app.actions";
import UIService from "../../services/UIService";
import ActionItem from "../../components/utility/app/common/ActionItem";
import HeaderActionButton from "../../components/utility/buttons/HeaderActionButton";
import { useWindowDimensions } from "react-native";
import Lottie from "../../components/utility/animated/Lottie";
import { gifs } from "../../config/assets";
import PrimaryIconButton from "../../components/utility/buttons/PrimaryIconButton";

export default function MyCompetitionsScreen({ navigation }) {
  const { token } = useSelector((state: State) => state.app);
  const { width } = useWindowDimensions();
  const { my } = useSelector((state: State) => state.competitions);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [delCompetition, setDelCompetition] = useState<BaseCompetition | null>(
    null
  );

  const [sheetCompetition, setSheetCompetition] =
    useState<BaseCompetition | null>(null);

  const delRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        my.length ? (
          <HeaderActionButton
            icon="add"
            _icon={{ size: "lg" }}
            onPress={() => navigation.push("OrganizeCompetition")}
          />
        ) : null,
    });
  }, [navigation, my]);

  useEffect(() => {
    fetchCompetitions();
    return () => {
      dispatch(setMyCompetitions([]));
    };
  }, []);
  const fetchCompetitions = async () => {
    setLoading(true);
    const response = await RequestService.get(
      "competitions?type=organized",
      token
    ).finally(() => setLoading(false));
    if (!response.error_type) {
      dispatch(setMyCompetitions(response.data));
    }
  };

  const handleDeleteItem = async () => {
    dispatch(toggleLoading());
    const response = await RequestService.delete(
      "competitions/" + delCompetition.id,
      token
    ).finally(() => {
      dispatch(toggleLoading());
      setDelCompetition(null);
    });
    if (!response.error_type) {
      UIService.showSuccessToast(response.messages.success);
      fetchCompetitions();
    }
  };
  const QuickActions = (index, item: BaseCompetition) => {
    return (
      <HStack
        px={spaces.xSpace}
        justifyContent={"flex-end"}
        alignItems={"center"}
        flex={1}
        my={2}
      >
        <Pressable
          {...styles.rippleStyles}
          onPress={() =>
            navigation.push("OrganizeCompetition", {
              title: "Edit Competition",
              competition: item,
            })
          }
          w={"15%"}
          h={"100%"}
        >
          <HStack
            alignItems={"center"}
            justifyContent={"center"}
            px={3}
            w={"100%"}
            h={"100%"}
          >
            <Icon as={MaterialIcons} size={"lg"} name={"edit"} />
          </HStack>
        </Pressable>
        <Pressable
          {...styles.rippleStyles}
          onPress={() => setDelCompetition(item)}
          w={"15%"}
          h={"100%"}
        >
          <HStack
            alignItems={"center"}
            w={"100%"}
            h={"100%"}
            justifyContent={"center"}
            px={3}
          >
            <Icon color={"red.400"} as={MaterialIcons} size={"lg"} name={"delete"} />
          </HStack>
        </Pressable>
      </HStack>
    );
  };

  return (
    <Feed>
      <Actionsheet
        isOpen={sheetCompetition !== null}
        onClose={() => setSheetCompetition(null)}
      >
        <Actionsheet.Content bg={colors.primaryBg}>
          <ActionItem
            text="Edit"
            icon="edit-2"
            onPress={() => {
              setSheetCompetition(null);
              navigation.push("OrganizeCompetition", {
                competition: sheetCompetition,
                title: "Edit Competition",
              });
            }}
          />
          <ActionItem
            text="Details"
            icon="info"
            onPress={() => {
              setSheetCompetition(null);
              navigation.push("Detail&ProcessCompetitionPayment", {
                competition: sheetCompetition,
                title: "Details",
              });
            }}
          />
          <ActionItem
            text="Delete"
            icon="trash"
            _text={{ color: "red.400" }}
            _icon={{ color: "red.400" }}
            onPress={() => {
              setSheetCompetition(null);
              setDelCompetition(sheetCompetition);
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>

      <AlertDialog
        leastDestructiveRef={delRef}
        isOpen={delCompetition !== null}
        onClose={() => setDelCompetition(null)}
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
          <AlertDialog.Body bgColor={colors.primaryBg}>
            <Text>You want to delete {`#${delCompetition?.slug}`}?</Text>
          </AlertDialog.Body>
          <AlertDialog.Footer bgColor={colors.primaryBg}>
            <Button.Group space={2}>
              <Button
                _text={{ color: "muted.400", fontWeight: "semibold" }}
                onPress={() => setDelCompetition(null)}
                variant="unstyled"
              >
                No
              </Button>
              <Button
                variant="unstyled"
                _text={{ color: "red.400" }}
                onPress={() => handleDeleteItem()}
              >
                Yes
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Box justifyContent={"center"} mx={spaces.xSpace} mb={5}>
        {loading ? (
          <ScrollView>
            <VStack>
              {UtilService.generateNumbersArray(5).map((i) => (
                <CompetitionItemSkeleton key={`skele-${i}`} />
              ))}
            </VStack>
          </ScrollView>
        ) : my.length ? (
          <SwipeableFlatList
            showsVerticalScrollIndicator={false}
            data={my}
            maxSwipeDistance={width / 3}
            renderQuickActions={({ index, item }) => QuickActions(index, item)}
            keyExtractor={(item) => `item-${item.id}`}
            renderItem={({ item }: { item: OrganizerCompetition }) => (
              <CompetitionItem
                openActionSheet={setSheetCompetition}
                key={`competition-${item.id}`}
                navigation={navigation}
                competition={item}
              />
            )}
          />
        ) : (
          <VStack
            justifyContent={"center"}
            space={10}
            h={"60%"}
            w={"100%"}
            alignItems={"center"}
          >
            <Image source={gifs.empty} alt={"Empty competitions list"} />
            <Text fontSize={"md"} textAlign={"center"}>
              Invest in competitions and get exponential profits!
            </Text>
            <PrimaryIconButton
              onPress={() => navigation.push("OrganizeCompetition")}
              icon="add"
              _text={{ fontWeight: "semibold" }}
              title="Organize Now"
            />
            {/* <Lottie h={200} w={200} animation="empty_box" /> */}
          </VStack>
        )}
      </Box>
    </Feed>
  );
}
