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
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import CategoryItem from "../../components/utility/ui/CategoryItem";
import { Category } from "../../models/Category";

export default function HomeScreen({ navigation }) {
  const { user } = useSelector((state: State) => state.app);
  const { newC, recent, top } = useSelector((state: State) => state.categories);
  const [firstName, lastName] = user.full_name.split(" ");

  useEffect(() => {}, []);

  return (
    <Default>
      <StatusBar backgroundColor={colors.primaryColor} />
      <VStack minH={600}>
        <Box
          mx={-3}
          py={3}
          px={3}
          minH={120}
          bg={colors.primaryColor}
          borderBottomLeftRadius={15}
          borderBottomRightRadius={15}
        >
          <HStack justifyContent={"space-between"}>
            <UserAvatar uri={user.avatar} alt={user.full_name} />
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
              <Pressable>
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
            right={2}
            zIndex={1}
            minW="100%"
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
        <Box mt={30}>
          <HStack alignItems={"baseline"}>
            <Text
              fontWeight={"semibold"}
              color={colors.dimTextColor}
              my={3}
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
            data={top} // your array should go here
            renderItem={({ item }: { item: Category }) => (
              <CategoryItem navigation={navigation} category={item} />
            )}
          />
        </Box>
        {/* New Categories */}
        <Box mt={15}>
          <HStack alignItems={"baseline"}>
            <Text
              fontWeight={"semibold"}
              color={colors.dimTextColor}
              my={3}
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
            data={newC} // your array should go here
            renderItem={({ item }: { item: Category }) => (
              <CategoryItem navigation={navigation} category={item} />
            )}
          />
        </Box>
        {/* Recent Categories */}
        <Box mt={15}>
          <HStack alignItems={"baseline"}>
            <Text
              fontWeight={"semibold"}
              color={colors.dimTextColor}
              my={3}
              fontSize={"md"}
            >
              RECENTLY VISITED
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
            data={recent} // your array should go here
            renderItem={({ item }: { item: Category }) => (
              <CategoryItem navigation={navigation} category={item} />
            )}
          />
        </Box>
      </VStack>
    </Default>
  );
}
