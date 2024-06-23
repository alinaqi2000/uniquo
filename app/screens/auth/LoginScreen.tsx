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
import TertiaryToneButton from "../../components/utility/buttons/TertiaryToneButton";
import { useDispatch } from "react-redux";
import {
  addToken,
  setAuth,
  setUser,
  toggleLoading,
} from "../../store/app/app.actions";
import { AuthUser } from "../../models/AuthUser";
import Feed from "../../components/layout/AppLayout";
import TextButton from "../../components/utility/buttons/TextButton";
import * as Yup from "yup";
import RequestService from "../../services/RequestService";
import { useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import UtilService from "../../services/UtilService";

const ANDROID_ID = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;

interface LoginForm {
  identity: string;
  password: string;
}
export default function LoginScreen({ navigation }) {
  const [request, googleResponse, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_ID,
  });

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

  useEffect(() => {
    async function google_login() {
      dispatch(toggleLoading());
      const res: any = googleResponse;
      const response = await RequestService.post("google_login", {
        accessToken: res.authentication.accessToken,
        // deviceModel: Platform.OS == "android" ? DeviceInfo.getModel() : "",
      }).finally(() => {
        dispatch(toggleLoading());
      });

      if (!response.error_type) {
        setupLogin(response.data);
      }
    }
    if (googleResponse && googleResponse.type == "success") {
      google_login();
    }
  }, [googleResponse]);

  const dispatch = useDispatch();

  const login = async () => {
    dispatch(toggleLoading());
    const response = await RequestService.post(
      "email_login",
      {
        identity: lF.values.identity,
        password: lF.values.password,
      },
      "",
      lF
    ).finally(() => {
      dispatch(toggleLoading());
    });

    if (response.error_type === "verification") {
      dispatch(addToken(response.messages?.access_token));

      navigation.navigate("EmailVerification");
    }
    if (!response.error_type) {
      setupLogin(response.data);
      // navigation.navigate("Login");
    }
  };
  const setupLogin = async (data) => {
    const user = new AuthUser(
      data.user.full_name,
      data.user.email,
      data.user.username,
      data.user.avatar,
      data.user.phone_code,
      data.user.phone_no,
      data.user.balance,
      data.user.auth_provider
    );

    await UtilService.store("user", user);
    await UtilService.store("token", data.access_token);

    dispatch(addToken(data.access_token));
    dispatch(setAuth(true));
    dispatch(setUser(user));
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
              <HStack justifyContent={"flex-end"} px={1}>
                <TextButton
                  onPress={() => navigation.navigate("ForgotPassword")}
                  title="Forgot password?"
                  underline={true}
                />
              </HStack>
            </VStack>
            <TertiaryToneButton
              opacity={!lF.isValid ? 0.7 : 1}
              onPress={() => lF.handleSubmit()}
              w="100%"
              mt={50}
              title="Sign In"
              _text={{ style: { fontWeight: "800" } }}
            />
            <Button
              onPress={() => promptAsync()}
              w={"100%"}
              mt={3}
              bg={"light.100"}
            >
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
              title="New to Uniquo? Register now"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Feed>
  );
}
