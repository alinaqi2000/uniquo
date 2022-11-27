import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, HStack, Image, Pressable, Text, View, VStack } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";
import Default from "../../components/layout/Default";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import colors from "../../config/colors";
import { setFirstTime } from "../../store/app/app.actions";

export default function Onboarding02Screen({ navigation }) {
  const dispatch = useDispatch();
  const goHome = async () => {
    await AsyncStorage.setItem("firstTime", JSON.stringify("no"));
    dispatch(setFirstTime(false));
    // navigation.navigate("Login");
  };
  return (
    <Default>
      <VStack>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Image alt="Uniquo" source={require("../../../assets/icon.png")} />
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
        <HStack justifyContent={"center"} h={360} mt={50}>
          <Image
            alt="Onboarding"
            source={require("../../../assets/images/onboarding02.png")}
          />
        </HStack>
        <VStack alignItems={"center"}>
          <Text fontSize={"xl"} textAlign="center" fontWeight={"semibold"}>
            Create interactive financial
          </Text>
          <Text
            fontSize={"lg"}
            mt={5}
            color={colors.dimTextColor}
            textAlign="center"
          >
            This highlights how effective interactive financial content can be
            for finance companies in communicating their key messages to
            customers.
          </Text>
          <SecondaryIconButton
            onPress={() => navigation.navigate("Onboarding03")}
            mt={20}
            px={10}
            title="Next"
            icon="arrow-forward-outline"
          />
        </VStack>
      </VStack>
    </Default>
  );
}
