import React, { useEffect, useState } from "react";
import {
  Actionsheet,
  Box,
  FlatList,
  HStack,
  Icon,
  Image,
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
import { setFeedCompetitions } from "../../store/competitions/competitions.actions";
import { useDispatch } from "react-redux";
import RequestService from "../../services/RequestService";
import { gifs } from "../../config/assets";
import UtilService from "../../services/UtilService";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../config/styles";
import { BaseCompetition } from "../../models/constants";
import ActionItem from "../../components/utility/app/common/ActionItem";
import colors from "../../config/colors";

export default function CompetitionFeedScreen({ navigation, route }) {
  const { token } = useSelector((state: State) => state.app);
  const { feed } = useSelector((state: State) => state.competitions);
  const [loading, setLoading] = useState(true);
  const [sheetCompetition, setSheetCompetition] =
    useState<BaseCompetition | null>(null);
  const [reportCompetition, setReportCompetition] =
    useState<BaseCompetition | null>(null);
  const { id, mode } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setupCompetitions();
    return () => {
      dispatch(setFeedCompetitions([]));
    };
  }, []);
  const fetchCompetitions = async (url) => {
    setLoading(true);

    const response = await RequestService.get(url, token).finally(() =>
      setLoading(false)
    );
    if (!response.error_type) {
      dispatch(setFeedCompetitions(response.data));
    }
  };
  const setupCompetitions = async () => {
    switch (mode) {
      case "explore":
        fetchCompetitions(`competitions/explore`);
        break;
      case "participate":
        fetchCompetitions(`competitions/participation`);
        break;
      default:
        fetchCompetitions(`competitions/${id}/category`);
        break;
    }
  };

  return (
    <Feed>
      <Actionsheet
        isOpen={sheetCompetition !== null}
        onClose={() => setSheetCompetition(null)}
      >
        <Actionsheet.Content bg={colors.primaryBg}>
          <ActionItem
            text="Details"
            icon="info"
            onPress={() => {
              setSheetCompetition(null);
              navigation.push("PostsFeed", {
                competition: sheetCompetition,
                title: sheetCompetition.title,
              });
            }}
          />
          <ActionItem
            text="Report"
            icon="slash"
            _text={{ color: "red.400" }}
            _icon={{ color: "red.400" }}
            onPress={() => {
              setSheetCompetition(null);
              setReportCompetition(sheetCompetition);
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>

      <Box justifyContent={"center"} mx={spaces.xSpace} mb={5}>
        {loading ? (
          <ScrollView>
            <VStack>
              {UtilService.generateNumbersArray(5).map((i) => (
                <CompetitionItemSkeleton key={`skele-${i}`} />
              ))}
            </VStack>
          </ScrollView>
        ) : feed.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={feed}
            keyExtractor={(item) => `item-${item.id}`}
            renderItem={({ item }: { item: BaseCompetition }) => (
              <CompetitionItem
                key={`competition-${item.id}`}
                navigation={navigation}
                openActionSheet={setSheetCompetition}
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
              No competitions yet!
            </Text>
          </VStack>
        )}
      </Box>
    </Feed>
  );
}
