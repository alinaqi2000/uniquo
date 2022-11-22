import { View, Text } from "react-native";
import React from "react";
import { Center, VStack } from "native-base";
import Default from "../../components/layout/Default";
import DevComponents from "../../components/dev/DevComponents";

export default function Components() {
  return (
    <Default>
      <DevComponents />
    </Default>
  );
}
