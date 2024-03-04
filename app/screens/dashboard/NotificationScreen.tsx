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

import { useSelector } from "react-redux";
import { State } from "../../store";
import { Platform, Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import NotificationItem from "../../components/utility/ui/NotificationItem";
import { Notification } from "../../models/Notification";
import Feed from "../../components/layout/AppLayout";
import spaces from "../../config/spaces";

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
      <VStack minH={600} mx={spaces.xSpace}>
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
              <View>
                <NotificationItem navigation={navigation} notification={item} />
              </View>
            )}
          />
        </VStack>
      </VStack>
    </Feed>
  );
}
