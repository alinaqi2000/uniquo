import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import colors from "../../config/colors";
import OTPInput from "../../components/utility/forms/OTPInput";
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
import { useSelector } from "react-redux";
import { State } from "../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ForgotPasswordVerification {
  code: string;
}

export default function ForgotPasswordVerificationScreen({ navigation }) {
  const { token } = useSelector((state: State) => state.app);

  const validationSchema = Yup.object<ForgotPasswordVerification>().shape({
    code: Yup.number()
      .min(5, "Code must be at least 5 characters")
      .required("Please enter a valid code"),
  });

  const eF = useFormik<ForgotPasswordVerification>({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: () => verify_email(),
  });

  useEffect(() => {
    if (eF.values.code.length == 5) {
      eF.handleSubmit();
    }
  }, [eF.values]);

  const dispatch = useDispatch();

  const verify_email = async () => {
    dispatch(toggleLoading());

    const response = await RequestService.post(
      "verify_forget_password",
      { code: eF.values.code },
      token,
      eF
    ).finally(() => {
      dispatch(toggleLoading());
    });

    if (response.error_type == "authorization") {
      eF.setValues({ code: "" });
    }
    if (!response.error_type) {
      dispatch(addToken(response.data.access_token));

      navigation.navigate("PasswordReset");
    }
  };
  const resendCode = async () => {
    dispatch(toggleLoading());
    return await RequestService.post(
      "resend_forget_password",
      {},
      token
    ).finally(() => {
      dispatch(toggleLoading());
    });
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
              Email Verification
            </Text>
            <Text mt={2} color={colors.dimTextColor}>
              Please enter the verification code. Also check "Spam" section,
              incase you have not received the email.
            </Text>
            <VStack mt={10} space={5} w="100%">
              <Box>
                <OTPInput
                  isRequired
                  w="100%"
                  errorText={eF.errors.code}
                  value={eF.values.code}
                  isInvalid={eF.errors.code && eF.touched.code}
                  formikForm={{ form: eF, key: "code" }}
                />
              </Box>
            </VStack>
            {/* <TertiaryToneButton
              onPress={() => eF.handleSubmit()}
              w="100%"
              mt={50}
              title="Verify Code"
              _text={{ style: { fontWeight: "800" } }}
            /> */}
          </VStack>
          <HStack mt={10} mx={2} justifyContent={"space-between"} px={5}>
            <Text fontWeight={"normal"}>Didn't receive the code?</Text>
            <Timer resendCode={resendCode} />
          </HStack>
        </VStack>
      </ScrollView>
    </Feed>
  );
}
function Timer(props) {
  const [timer, setTimer] = useState(0);
  let timerInterval = null;
  useEffect(() => {
    timerInterval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);
  const resendCode = async () => {
    await props.resendCode();
    setTimer(0);
    clearInterval(timerInterval);
  };
  if (timer < 60) return <Text>Wait for {60 - timer} seconds</Text>;
  return (
    <Pressable onPress={resendCode}>
      <Text ml={4} fontWeight={"normal"} underline={true}>
        Resend Code
      </Text>
    </Pressable>
  );
}
