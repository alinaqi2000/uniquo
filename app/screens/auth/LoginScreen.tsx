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
import * as Yup from "yup";
import RequestService from "../../services/RequestService";
import { useFormik } from "formik";

interface LoginForm {
  identity: string;
  password: string;
}

export default function LoginScreen({ navigation }) {
  const validationSchema = Yup.object<LoginForm>().shape({
    identity: Yup.string().required("Please enter your email or username"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const lF = useFormik<LoginForm>({
    initialValues: {
      identity: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => login(),
  });

  useEffect(() => {}, []);

  const dispatch = useDispatch();

  const login = async () => {
    const response = await RequestService.post(
      "email_login",
      {
        identity: lF.values.identity,
        password: lF.values.password,
      },
      lF
    );
    if (!response.error_type) {
      dispatch(
        setUser(
          new AuthUser(
            response.data.user.full_name,
            response.data.user.email,
            response.data.user.username,
            response.data.user.avatar,
            response.data.user.phone_code,
            response.data.user.phone_no,
            response.data.user.balance,
            response.data.user.auth_provider,
            response.data.access_token
          )
        )
      );
      // navigation.navigate("Login");
    }
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
                  errorText={lF.errors.identity}
                  isInvalid={lF.errors.identity && lF.touched.identity}
                  input={{
                    placeholder: "Email or username",
                    value: lF.values.identity,
                    onChangeText: lF.handleChange("identity"),
                    onBlur: lF.handleBlur("identity"),
                  }}
                />
              </Box>
              <Box>
                <FormInputPassword
                  isRequired
                  w="100%"
                  errorText={lF.errors.password}
                  isInvalid={lF.errors.password && lF.touched.password}
                  input={{
                    placeholder: "Password",
                    value: lF.values.password,
                    onChangeText: lF.handleChange("password"),
                    onBlur: lF.handleBlur("password"),
                  }}
                />
              </Box>
            </VStack>
            <TertiaryToneButton
              onPress={() => lF.handleSubmit()}
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
                <Text color="dark.400" ml={4} fontWeight={"bold"}>
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
