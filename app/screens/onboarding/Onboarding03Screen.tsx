import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, HStack, Image, Pressable, Text, View, VStack } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import Default from "../../components/layout/Default";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import colors from "../../config/colors";
import { setFirstTime } from "../../store/app/app.actions";

export default function Onboarding03Screen({ navigation }) {
  const dispatch = useDispatch();
  const goHome = async () => {
    await AsyncStorage.setItem("firstTime", JSON.stringify("no"));
    dispatch(setFirstTime(false));
    // navigation.navigate("Login");
  };
  const dimensions = useWindowDimensions();

  return (
    <Default>
      <VStack alignItems={"center"} minH={dimensions.height}>
        <HStack
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image
            alt="Uniquo"
            h={50}
            w={50}
            source={require("../../../assets/icon.png")}
          />
          <Pressable onPress={goHome}>
            <Text
              fontWeight={"semibold"}
              fontSize={"xl"}
              color={colors.secondaryColor}
            >
              SKIP
            </Text>
          </Pressable>
        </HStack>
        <HStack
          justifyContent={"center"}
          alignItems={"center"}
          h={dimensions.height * 0.5}
          mt={30}
        >
          <Image
            alt="Onboarding"
            source={require("../../../assets/images/onboarding03.png")}
          />
        </HStack>
        <VStack alignItems={"center"}>
          <Text fontSize={"xl"} textAlign="center" fontWeight={"semibold"}>
            Create interactive financial
          </Text>
          <Text
            fontSize={"md"}
            mt={2}
            color={colors.dimTextColor}
            textAlign="center"
          >
            This highlights how effective interactive financial content can be
            for finance companies in communicating their key messages to
            customers.
          </Text>
        </VStack>
        <SecondaryIconButton
          position={"absolute"}
          bottom={10}
          onPress={goHome}
          mt={20}
          px={10}
          title="Get Started"
          icon="arrow-forward-outline"
        />
      </VStack>
    </Default>
  );
}
