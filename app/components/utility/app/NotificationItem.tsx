import React, { useState } from "react";
import { Box, Heading, HStack, Pressable, Text } from "native-base";
import colors from "../../../config/colors";
import { PressableProps } from "react-native";
import { Notification } from "../../../models/Notification";
interface Props extends PressableProps {
  notification: Notification;
  navigation?: any;
}
export default function NotificationItem(props: Props) {
  const [truncate, setTruncate] = useState(true);
  return (
    <Pressable
      onPress={() => {

        // props.navigation.push("CompetitionsFeed", { title: "My Competitions" })
      }
      }
    >
      <Box
        px={3}
        py={2}
        mb={2}
        bg={colors.primaryTextColor}
        w={"100%"}
        rounded={10}
      >
        <Heading
          fontSize={"14"}
          fontWeight={props.notification.read ? "normal" : "semibold"}
          color={colors.secondaryTextColor}
        >
          {props.notification.title}
        </Heading>
        <HStack justifyContent={"space-between"} >
          <Text
            isTruncated={truncate}
            onPress={() => setTruncate(!truncate)}
            color={colors.secondaryTextColor}
            fontSize={"xs"}
            z-zIndex={999}
          >
            {props.notification.description}
          </Text>
          <Text color={colors.secondaryTextColor} fontSize={"xs"}>
            {props.notification.date.relative}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
}
