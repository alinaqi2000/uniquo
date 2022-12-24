import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Icon,
  Link,
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
import { MaterialIcons } from "@expo/vector-icons";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import CategoryItem from "../../components/utility/ui/CategoryItem";
import { Category } from "../../models/Category";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../store/app/app.actions";
import { Notification } from "../../models/Notification";
import spaces from "../../config/spaces";

export default function HomeScreen({ navigation }) {
  const { user } = useSelector((state: State) => state.app);
  const { newC, recent, top } = useSelector((state: State) => state.categories);
  const [firstName, lastName] = user.full_name.split(" ");
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  useEffect(() => {
    dispatch(
      setNotifications([
        new Notification(
          1,
          "Competition creation success",
          "ali.naqi, you have created a competition",
          false,
          "my_competitions",
          [],
          "now"
        ),
        new Notification(
          2,
          "Competition updation success",
          "ali.naqi, you have updated a competition",
          false,
          "my_competitions",
          [],
          "6 hrs"
        ),
        new Notification(
          3,
          "New participation alert!",
          "ali.naqi, you have new participation in your a competition",
          true,
          "my_competitions",
          [],
          "1 day"
        ),
        new Notification(
          4,
          "Competition started!",
          "ali.naqi, your competition has been started",
          true,
          "my_competitions",
          [],
          "2 days"
        ),
      ])
    );
  }, []);

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
          borderBottomLeftRadius={15}
          borderBottomRightRadius={15}
        >
          <HStack justifyContent={"space-between"}>
            <Pressable onPress={() => navigation.push("Setting")}>
              <UserAvatar uri={user.avatar} alt={user.full_name} />
            </Pressable>
            <VStack alignItems={"center"} maxW={"3/5"}>
              <Text
                textAlign={"center"}
                fontSize={"md"}
                fontWeight={"semibold"}
              >
                Welcome {firstName}!
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
          <HStack
            justifyContent={"center"}
            position={"absolute"}
            bottom={-20}
            zIndex={1}
            w={dimensions.width}
            space={1}
          >
            <SecondaryIconButton
              onPress={() =>
                navigation.push("CompetitionsFeed", {
                  title: "Explore",
                })
              }
              shadow={"6"}
              title="Explore"
              icon="search-outline"
            />
            <SecondaryIconButton
              onPress={() =>
                navigation.push("CompetitionsFeed", { title: "Organize" })
              }
              shadow={"6"}
              title="Organize"
              icon="trophy-outline"
            />
            <SecondaryIconButton
              onPress={() =>
                navigation.push("CompetitionsFeed", { title: "Participate" })
              }
              shadow={"6"}
              title="Participate"
              icon="game-controller-outline"
            />
          </HStack>
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
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={top} // your array should go here
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
        </Box>
      </VStack>
    </Default>
  );
}
