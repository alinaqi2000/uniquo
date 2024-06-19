import React from "react";
import { Box, Image, ScrollView, Text, VStack } from "native-base";

import colors from "../../config/colors";
import TertiaryToneButton from "../../components/utility/buttons/TertiaryToneButton";
import { useDispatch } from "react-redux";
import { addToken, toggleLoading } from "../../store/app/app.actions";
import Feed from "../../components/layout/AppLayout";
import TextButton from "../../components/utility/buttons/TextButton";
import * as Yup from "yup";
import RequestService from "../../services/RequestService";
import { useFormik } from "formik";
import FormInput from "../../components/utility/forms/FormInput";

interface ForgotPassword {
  identity: string;
}

export default function ForgotPasswordScreen({ navigation }) {
  const validationSchema = Yup.object<ForgotPassword>().shape({
    identity: Yup.string().required("Please enter your email or username"),
  });

  const eF = useFormik<ForgotPassword>({
    initialValues: {
      identity: "",
    },
    validationSchema,
    onSubmit: () => verify_identity(),
  });

  const dispatch = useDispatch();

  const verify_identity = async () => {
    dispatch(toggleLoading());

    const response = await RequestService.post(
      "forget_password",
      { identity: eF.values.identity },
      "",
      eF
    ).finally(() => {
      dispatch(toggleLoading());
    });

    if (!response.error_type) {
      dispatch(addToken(response.data.access_token));

      navigation.navigate("ForgotPasswordVerification");
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
              Forgot you password?
            </Text>
            <Text mt={2} color={colors.dimTextColor}>
              Please enter your email or username. We will send you a
              verification code via email.
            </Text>
            <VStack mt={10} space={5} w="100%">
              <Box>
                <FormInput
                  isRequired
                  w="100%"
                  errorText={eF.errors.identity}
                  isInvalid={eF.errors.identity && eF.touched.identity}
                  input={{
                    placeholder: "Email or username",
                    value: eF.values.identity,
                    onChangeText: eF.handleChange("identity"),
                    onBlur: eF.handleBlur("identity"),
                  }}
                />
              </Box>
            </VStack>
            <TertiaryToneButton
              opacity={!eF.isValid ? 0.7 : 1}
              onPress={() => eF.handleSubmit()}
              w="100%"
              mt={41}
              title="Verify Identity"
              _text={{ style: { fontWeight: "800" } }}
            />
            <TextButton
              onPress={() => navigation.navigate("Login")}
              w="100%"
              mt={10}
              title="Back to login"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Feed>
  );
}
