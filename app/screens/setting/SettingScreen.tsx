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
import { Platform, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import CategoryItem from "../../components/utility/ui/CategoryItem";
import { Category } from "../../models/Category";
import SettingButton from "../../components/utility/buttons/SettingButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/app/app.actions";
import spaces from "../../config/spaces";

export default function SettingScreen({ navigation }) {
  const { user } = useSelector((state: State) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <Default>
      <StatusBar backgroundColor={colors.primaryColor} />
      <VStack minH={600}>
        <Box
          mx={spaces.xSpace * -1}
          py={3}
          px={spaces.xSpace}
          minH={190}
          bg={colors.primaryColor}
          borderBottomLeftRadius={15}
          borderBottomRightRadius={15}
        >
          <HStack justifyContent={"space-between"}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                color={"white"}
                size={25}
                as={MaterialIcons}
                name={
                  Platform.OS == "ios" ? "arrow-back-ios-new" : "arrow-back"
                }
              />
            </Pressable>
          </HStack>
          <VStack alignItems={"center"}>
            <UserAvatar uri={user.avatar} size={"lg"} alt={user.full_name} />
            <VStack alignItems={"center"} mt={3} maxW={"4/5"}>
              <Text
                textAlign={"center"}
                fontSize={"md"}
                fontWeight={"semibold"}
              >
                {user.full_name}
              </Text>
              <Text textAlign={"center"} fontSize={"sm"}>
                {user.email}
              </Text>
            </VStack>
          </VStack>
        </Box>

        <VStack mt={10} space={3}>
          <SettingButton
            title="My Competitions"
            onPress={() =>
              navigation.push("CompetitionsFeed", { title: "My Competitions" })
            }
            icon="emoji-events"
          />
          <SettingButton title="Reported Posts" icon="markunread-mailbox" />
          <SettingButton title="Profile Setting" icon="person" />
          <SettingButton title="Change Password" icon="lock" />
          <Pressable onPress={() => dispatch(setUser(null))}>
            <Text
              my={6}
              textAlign={"center"}
              fontSize={"sm"}
              color={"danger.500"}
              fontWeight="semibold"
            >
              Logout
            </Text>
          </Pressable>
        </VStack>
      </VStack>
    </Default>
  );
}
