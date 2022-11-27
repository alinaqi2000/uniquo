import React from "react";
import {
  Center,
  Heading,
  HStack,
  List,
  Stack,
  StatusBar,
  Text,
  View,
  VStack,
} from "native-base";
import SecondaryIconButton from "../utility/buttons/SecondaryIconButton";
import colors from "../../config/colors";
import PrimaryButton from "../utility/buttons/PrimaryButton";
import PrimaryIconButton from "../utility/buttons/PrimaryIconButton";
import SecondaryButton from "../utility/buttons/SecondaryButton";
import OutlineButton from "../utility/buttons/OutlineButton";
import PrimaryOutlineButton from "../utility/buttons/PrimaryOutlineButton";
import FormInput from "../utility/forms/FormInput";
import FormTextArea from "../utility/forms/FormTextArea";
import TertiaryToneButton from "../utility/buttons/TertiaryToneButton";
import FormInputPassword from "../utility/forms/FormInputPassword";
import UserAvatar from "../utility/images/UserAvatar";
import NotificationItem from "../utility/ui/NotificationItem";
import SettingButton from "../utility/buttons/SettingButton";
import CategoryItem from "../utility/ui/CategoryItem";
import { FlatList } from "react-native";
import CompetitionItem from "../utility/ui/CompetitionItem";
import { Category } from "../../models/Category";
import { User } from "../../models/User";
import { Competition } from "../../models/Competition";

export default function DevComponents() {
  const categories = [
    new Category(1, "Sports", "sports"),
    new Category(2, "Art & Culture", "art-culture"),
    new Category(3, "Memes", "memes"),
    new Category(4, "Cars", "cars"),
  ];
  const compeitions = [
    new Competition(
      1,
      false,
      "Sargodha Cars Competition",
      null,
      "sargodha-cars-competition",
      5000,
      100,
      5000,
      500,
      "Sep 16, 2022",
      "16:01",
      "Sep 16, 2022",
      "06:14",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Imran ",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://coursebari.com/wp-content/uploads/2021/06/899048ab0cc455154006fdb9676964b3.jpg"
      ),
      null
    ),
    new Competition(
      2,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae error natus perferendis voluptatum tempore commodi nihil. Dolorem cupiditate dolorum quam provident, nesciunt inventore suscipit veniam expedita temporibus perferendis vero autem.",
      "sports-competition",
      5000,
      100,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://coursebari.com/wp-content/uploads/2021/06/899048ab0cc455154006fdb9676964b3.jpg"
      ),
      null
    ),
  ];
  return (
    <VStack>
      <Heading fontSize={"3xl"} color="primary.500">
        Components
      </Heading>
      {/* Buttons */}
      <VStack my={5} space={4}>
        <Heading fontSize={"lg"}>Buttons</Heading>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Primary</Text>
          <PrimaryButton title="Button " />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Primary Icon</Text>
          <PrimaryIconButton title="Button " icon="arrow-forward-outline" />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Secondary</Text>
          <SecondaryButton title="Button " />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Secondary Icon</Text>
          <SecondaryIconButton title="Button " icon="arrow-forward-outline" />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Primary Outline</Text>
          <PrimaryOutlineButton title="Button " />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Outline</Text>
          <OutlineButton title="Button " />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Tertiary Tone</Text>
          <TertiaryToneButton title="Button " />
        </HStack>
      </VStack>
      {/* Forms */}
      <VStack my={5} space={4}>
        <Heading fontSize={"lg"}>Forms</Heading>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Input</Text>
          <FormInput placeholder="Enter name..." width={"1/2"} />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Password</Text>
          <FormInputPassword width={"1/2"} />
        </HStack>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Text Area</Text>
          <FormTextArea placeholder="Enter name..." width={"1/2"} />
        </HStack>
      </VStack>

      {/* User */}
      <VStack my={5} space={4}>
        <Heading fontSize={"lg"}>User</Heading>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text>Avatar</Text>
          <UserAvatar
            uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="AJ"
          />
        </HStack>
      </VStack>

      {/* UI Items */}
      <VStack my={5} space={4}>
        <Heading fontSize={"lg"}>UI Items</Heading>
        <VStack justifyContent={"center"} space={1}>
          <Text>Notification</Text>
          <NotificationItem />
        </VStack>
        <VStack justifyContent={"center"} space={1}>
          <Text>Setting</Text>
          <SettingButton />
        </VStack>
        <VStack justifyContent={"center"} space={1}>
          <Text>Category</Text>
          <FlatList
            horizontal={true}
            data={categories} // your array should go here
            renderItem={({ item }) => <CategoryItem category={item} />}
          />
        </VStack>
        <VStack justifyContent={"center"} space={1}>
          <Text>Competition</Text>
          <FlatList
            data={compeitions} // your array should go here
            renderItem={({ item }) => <CompetitionItem competition={item} />}
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
