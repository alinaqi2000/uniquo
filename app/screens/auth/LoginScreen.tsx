import React, { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import colors from "../../config/colors";
import FormInput from "../../components/utility/forms/FormInput";
import FormInputPassword from "../../components/utility/forms/FormInputPassword";
import { Pressable } from "react-native";
import TertiaryToneButton from "../../components/utility/buttons/TertiaryToneButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/app/app.actions";
import { AuthUser } from "../../models/AuthUser";
import Feed from "../../components/layout/AppLayout";
import TextButton from "../../components/utility/buttons/TextButton";

interface LoginForm {
  email: string;
  password: string;
}
export default function LoginScreen({ navigation }) {
  const [formData, setData] = React.useState<LoginForm | null>(null);

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
          "login",
          ""
        )
      )
    );
    // navigation.navigate("Home");
  };
  return (
    <Feed>
      <ScrollView>
        <VStack mb={10} justifyContent={"space-between"}>
          <VStack mt={30} alignItems={"center"} px={5}>
            <Image
              source={require("../../../assets/icon-text.png")}
              resizeMode="contain"
              height={100}
              width={200}
              alt={"Uniquo"}
            />
            <Text fontSize={"2xl"} fontWeight="semibold">
              Login
            </Text>
            <Text mt={2} color={colors.dimTextColor}>
              Please sign in to your account
            </Text>
            <VStack mt={10} space={5} w="100%">
              <Box>
                <FormInput
                  isRequired
                  w="100%"
                  input={{
                    placeholder: "Email",
                    onChangeText: (value) =>
                      setData({ ...formData, email: value }),
                  }}
                />
              </Box>
              <Box>
                <FormInputPassword
                  isRequired
                  w="100%"
                  input={{
                    placeholder: "Password",
                    onChangeText: (value) =>
                      setData({ ...formData, password: value }),
                  }}
                />
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text mt={2} textAlign={"right"}>
                    Forgot Password?
                  </Text>
                </Pressable>
              </Box>
            </VStack>
            <TertiaryToneButton
              onPress={login}
              w="100%"
              mt={50}
              title="Sign In"
              _text={{ style: { fontWeight: "800" } }}
            />
            <Button onPress={login} w={"100%"} mt={3} bg={"light.100"}>
              <HStack alignItems={"center"}>
                <Image
                  h={26}
                  source={require("../../../assets/images/google.png")}
                  alt="G"
                />
                <Text color="dark.400" ml={4} fontWeight={"normal"}>
                  Continue with Google
                </Text>
              </HStack>
            </Button>
            <TextButton
              onPress={() => navigation.navigate("Register")}
              w="100%"
              mt={10}
              title="New to Uniquo? Register Now"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Feed>
  );
}
