import React, { useEffect } from "react";
import { Avatar, Box, Button, Heading, HStack, Link, Text } from "native-base";

import Default from "../../components/layout/Default";

export default function HomeScreen({ navigation }) {
  useEffect(() => {}, []);

  return (
    <Default>
      <Box mx={2}>
        <Text mb={4} color={"primary.600"} bold fontSize={"3xl"}>
          About 👉
        </Text>

        <Text fontSize={"sm"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          explicabo atque magnam a, similique quibusdam facere quasi cupiditate
          quas, quia, itaque voluptate sunt placeat suscipit aspernatur sit
          quisquam autem animi.
        </Text>
      </Box>
    </Default>
  );
}
