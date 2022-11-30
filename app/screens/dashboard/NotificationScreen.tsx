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
import NotificationItem from "../../components/utility/ui/NotificationItem";
import { Notification } from "../../models/Notification";
import Feed from "../../components/layout/Feed";

export default function NotificationScreen({ navigation }) {
  const { notifications } = useSelector((state: State) => state.app);
  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    // year: "numeric",
    day: "numeric",
    month: "short",
  });

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <Feed>
      <VStack minH={600}>
        <HStack justifyContent={"space-between"}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              mt={2}
              color={"white"}
              size={25}
              as={MaterialIcons}
              name={Platform.OS == "ios" ? "arrow-back-ios-new" : "arrow-back"}
            />
          </Pressable>
        </HStack>
        <HStack justifyContent={"center"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {date}
          </Text>
        </HStack>
        <HStack mt={10}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            Notification Center
          </Text>
        </HStack>
        <VStack mt={5} space={3}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={notifications} // your array should go here
            renderItem={({ item }: { item: Notification }) => (
              <NotificationItem navigation={navigation} notification={item} />
            )}
          />
        </VStack>
      </VStack>
    </Feed>
  );
}
