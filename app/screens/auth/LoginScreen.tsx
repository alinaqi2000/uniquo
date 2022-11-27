import React, { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "native-base";

import Default from "../../components/layout/Default";
import colors from "../../config/colors";
import FormInput from "../../components/utility/forms/FormInput";
import FormInputPassword from "../../components/utility/forms/FormInputPassword";
import { Pressable } from "react-native";
import TertiaryToneButton from "../../components/utility/buttons/TertiaryToneButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/app/app.actions";
import { AuthUser } from "../../models/AuthUser";

export default function LoginScreen({ navigation }) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const login = () => {
    dispatch(
      setUser(
        new AuthUser(
          "Ali Naqi Al-Musawi",
          "ali@gmail.com",
          "ali.naqi2000",
          "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
          "92",
          "3061561248",
          1900,
          "login"
        )
      )
    );
    // navigation.navigate("Home");
  };
  return (
    <Default>
      <VStack justifyContent={"space-between"}>
        <VStack mt={30} alignItems={"center"} px={5}>
          <Image source={require("../../../assets/logo.png")} alt={"Uniquo"} />
          <Text fontSize={"2xl"} fontWeight="semibold">
            Login
          </Text>
          <Text mt={2} color={colors.dimTextColor}>
            Please sign in to your account
          </Text>
          <VStack mt={10} space={5} w="100%">
            <Box>
              <FormInput placeholder="Email" w="100%" />
            </Box>
            <Box>
              <FormInputPassword placeholder="Password" w="100%" />
              <Pressable>
                <Text mt={2} textAlign={"right"}>
                  Forgot Password?
                </Text>
              </Pressable>
            </Box>
          </VStack>
          <TertiaryToneButton
            onPress={login}
            w="100%"
            mt={100}
            title="Signin"
            _text={{ style: { fontWeight: "bold" } }}
          />
          <Button onPress={login} w={"100%"} mt={3} bg={"light.100"}>
            <HStack alignItems={"center"}>
              <Image
                h={26}
                source={require("../../../assets/images/google.png")}
                alt="G"
              />
              <Text color="dark.400" ml={4} fontWeight={"semibold"}>
                Sign In with Google
              </Text>
            </HStack>
          </Button>
        </VStack>
      </VStack>
    </Default>
  );
}
