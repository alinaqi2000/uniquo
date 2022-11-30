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
  View,
  VStack,
} from "native-base";

import Feed from "../../components/layout/Feed";
import colors from "../../config/colors";
import UserAvatar from "../../components/utility/images/UserAvatar";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import CategoryItem from "../../components/utility/ui/CategoryItem";
import { Category } from "../../models/Category";
import CompetitionItem from "../../components/utility/ui/CompetitionItem";
import { Competition } from "../../models/Competition";
import spaces from "../../config/spaces";

export default function CompetitionScreen({ navigation }) {
  const { user } = useSelector((state: State) => state.app);
  const { feed } = useSelector((state: State) => state.competitions);
  const [firstName, lastName] = user.full_name.split(" ");

  useEffect(() => {}, []);

  return (
    <Feed>
      <View justifyContent={"center"} mx={spaces.xSpace}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={feed} // your array should go here
          renderItem={({ item }: { item: Competition }) => (
            <CompetitionItem navigation={navigation} competition={item} />
          )}
        />
      </View>
    </Feed>
  );
}
