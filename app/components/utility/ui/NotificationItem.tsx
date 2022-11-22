import React from "react";
import { Box, Heading, HStack, Text } from "native-base";
import colors from "../../../config/colors";

export default function NotificationItem() {
  return (
    <Box px={3} py={2} bg={colors.primaryTextColor} w={"100%"} rounded={10}>
      <Heading
        fontSize={"16"}
        fontWeight="semibold"
        color={colors.secondaryTextColor}
      >
        Competition Created Success
      </Heading>
      <HStack justifyContent={"space-between"}>
        <Text color={colors.secondaryTextColor} fontSize={"sm"}>
          ali.naqi, you have created a competition
        </Text>
        <Text color={colors.secondaryTextColor} fontSize={"xs"}>
          Now
        </Text>
      </HStack>
    </Box>
  );
}
