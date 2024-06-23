import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Icon,
  Link,
  ScrollView,
  StatusBar,
  Text,
  VStack,
} from "native-base";

import Default from "../../components/layout/Default";
import colors from "../../config/colors";
import UserAvatar from "../../components/utility/images/UserAvatar";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { Pressable, useWindowDimensions } from "react-native";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import CategoryItem, {
  CategoryItemSkeleton,
} from "../../components/utility/app/CategoryItem";
import { Category } from "../../models/Category";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../store/app/app.actions";
import { Notification } from "../../models/Notification";
import spaces from "../../config/spaces";
import RequestService from "../../services/RequestService";
import {
  setNewCategories,
  setRecentCategories,
  setTopCategories,
} from "../../store/categories/categories.actions";
import UtilService from "../../services/UtilService";
import { setWinnerPosts } from "../../store/posts/posts.actions";
import WinnerPostItem, {
  WinnerPostItemSkeleton,
} from "../../components/utility/app/WinnerPostItem";
import { Post } from "../../models/Post";

export default function HomeScreen({ navigation }) {
  const { user, token } = useSelector((state: State) => state.app);
  const { newC, recent, top } = useSelector((state: State) => state.categories);
  const { winner } = useSelector((state: State) => state.posts);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingWinnerPosts, setLoadingWinnerPosts] = useState(true);

  const [firstName, lastName] = user.full_name.split(" ");
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  useEffect(() => {
    fetchNotifications();
    fetchCategories();
    fetchWinnerPosts();

  }, []);

  const fetchNotifications = async () => {
    const response = await RequestService.get(
      "notifications",
      token
    );

    if (!response.error_type) {
      dispatch(setNotifications(response.data));
    }
  };
  const fetchCategories = async () => {
    setLoadingCategories(true);

    const response = await RequestService.get(
      "dashboard_categories",
      token
    ).finally(() => setLoadingCategories(false));

    if (!response.error_type) {
      dispatch(setTopCategories(response.data.top));
      dispatch(setNewCategories(response.data.new));
      dispatch(setRecentCategories(response.data.recent));
    }
  };
  const fetchWinnerPosts = async () => {
    setLoadingWinnerPosts(true);

    const response = await RequestService.get("posts/winner", token).finally(
      () => setLoadingWinnerPosts(false)
    );

    if (!response.error_type) {
      dispatch(setWinnerPosts(response.data));
    }
  };

  return (
    <Default>
      <StatusBar backgroundColor={colors.primaryColor} />
      <VStack>
        <Box
          mx={spaces.xSpace * -1}
          py={3}
          px={spaces.xSpace}
          minH={120}
          bg={colors.primaryColor}
          borderBottomRadius={spaces.boxBorderRadius}
        >
          <HStack justifyContent={"space-between"}>
            <Pressable onPress={() => navigation.push("Setting")}>
              <UserAvatar size={"sm"} uri={user.avatar} alt={user.full_name} />
            </Pressable>
            <VStack alignItems={"center"} maxW={"3/5"}>
              <Text
                textAlign={"center"}
                fontSize={"md"}
                fontWeight={"semibold"}
              >
                Welcome {firstName} 👋
              </Text>
              <Text textAlign={"center"} fontSize={"xs"}>
                Uniquo is all about finding your unique interests
              </Text>
            </VStack>
            <HStack>
              <Pressable onPress={() => navigation.push("Notification")}>
                <Icon
                  color={"white"}
                  size={25}
                  as={MaterialIcons}
                  name="notifications-none"
                />
              </Pressable>
            </HStack>
          </HStack>
          {/* Quick Options */}
          <HStack
            justifyContent={"center"}
            position={"absolute"}
            bottom={-20}
            left={0}
            zIndex={1}
            w={dimensions.width}
            space={1}
          >
            <SecondaryIconButton
              onPress={() =>
                navigation.push("CompetitionsFeed", {
                  title: "Explore",
                  mode: "explore",
                })
              }
              shadow={"6"}
              title="Explore"
              icon="search-outline"
            />
            <SecondaryIconButton
              onPress={() => navigation.push("OrganizeCompetition")}
              shadow={"6"}
              title="Organize"
              icon="trophy-outline"
            />
            <SecondaryIconButton
              onPress={() =>
                navigation.push("CompetitionsFeed", {
                  title: "Participate",
                  mode: "participate",
                })
              }
              shadow={"6"}
              title="Participate"
              icon="game-controller-outline"
            />
          </HStack>
        </Box>

        {/* Winner Posts */}
        <Box mt={30} mx={spaces.xSpace * -1}>
          <HStack ml={spaces.xSpace} space={2} alignItems={"baseline"}>
            <Ionicons
              name="trophy-outline"
              color={colors.secondaryColor}
              size={16}
            />
            <Text
              fontWeight={"semibold"}
              color={colors.dimTextColor}
              my={3}
              fontSize={"md"}
            >
              Winners
            </Text>
            <Box
              h={1}
              w={5}
              style={{ transform: [{ translateY: -3 }] }}
              bg={colors.secondaryColor}
              opacity={50}
            />
          </HStack>
          {loadingWinnerPosts ? (
            <HStack ml={spaces.xSpace}>
              {UtilService.generateNumbersArray(5).map((i) => (
                <WinnerPostItemSkeleton key={`skele-${i}`} />
              ))}
            </HStack>
          ) : (
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={winner}
              renderItem={({ item, index }: { item: Post; index: number }) => (
                <Box ml={index == 0 ? spaces.xSpace : 0}>
                  <WinnerPostItem navigation={navigation} post={item} />
                </Box>
              )}
            />
          )}
        </Box>

        {/* Top Categories */}
        <Box mt={30} mx={spaces.xSpace * -1}>
          <HStack alignItems={"baseline"}>
            <Text
              fontWeight={"semibold"}
              color={colors.dimTextColor}
              my={3}
              ml={spaces.xSpace}
              fontSize={"md"}
            >
              TOP CATEGORIES
            </Text>
            <Box
              h={1}
              w={5}
              ml={1}
              style={{ transform: [{ translateY: -3 }] }}
              bg={colors.secondaryColor}
              opacity={50}
            />
          </HStack>
          {loadingCategories ? (
            <HStack ml={spaces.xSpace}>
              {UtilService.generateNumbersArray(5).map((i) => (
                <CategoryItemSkeleton key={`skele-${i}`} />
              ))}
            </HStack>
          ) : (
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={top}
              renderItem={({
                item,
                index,
              }: {
                item: Category;
                index: number;
              }) => (
                <Box ml={index == 0 ? spaces.xSpace : 0}>
                  <CategoryItem navigation={navigation} category={item} />
                </Box>
              )}
            />
          )}
        </Box>
        {/* New Categories */}
        <Box mt={15} mx={spaces.xSpace * -1}>
          <HStack alignItems={"baseline"}>
            <Text
              fontWeight={"semibold"}
              color={colors.dimTextColor}
              my={3}
              ml={spaces.xSpace}
              fontSize={"md"}
            >
              NEW CATEGORIES
            </Text>
            <Box
              h={1}
              w={5}
              ml={1}
              style={{ transform: [{ translateY: -3 }] }}
              bg={colors.secondaryColor}
              opacity={50}
            />
          </HStack>
          {loadingCategories ? (
            <HStack ml={spaces.xSpace}>
              {UtilService.generateNumbersArray(5).map((i) => (
                <CategoryItemSkeleton key={`skele-${i}`} />
              ))}
            </HStack>
          ) : (
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={newC} // your array should go here
              renderItem={({
                item,
                index,
              }: {
                item: Category;
                index: number;
              }) => (
                <Box ml={index == 0 ? spaces.xSpace : 0}>
                  <CategoryItem navigation={navigation} category={item} />
                </Box>
              )}
            />
          )}
        </Box>
        {/* Recent Categories */}
        <Box mt={15} mx={spaces.xSpace * -1}>
          <HStack alignItems={"baseline"}>
            <Text
              fontWeight={"semibold"}
              color={colors.dimTextColor}
              my={3}
              ml={spaces.xSpace}
              fontSize={"md"}
            >
              RECENTLY VISITED{" "}
            </Text>
            <Box
              h={1}
              w={5}
              ml={1}
              style={{ transform: [{ translateY: -3 }] }}
              bg={colors.secondaryColor}
              opacity={50}
            />
          </HStack>
          {loadingCategories ? (
            <HStack ml={spaces.xSpace}>
              {UtilService.generateNumbersArray(5).map((i) => (
                <CategoryItemSkeleton key={`skele-${i}`} />
              ))}
            </HStack>
          ) : (
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={recent} // your array should go here
              renderItem={({
                item,
                index,
              }: {
                item: Category;
                index: number;
              }) => (
                <Box ml={index == 0 ? spaces.xSpace : 0}>
                  <CategoryItem navigation={navigation} category={item} />
                </Box>
              )}
            />
          )}
        </Box>
      </VStack>
    </Default>
  );
}
