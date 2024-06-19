import React from "react";
import { Box, Image, ScrollView, Text, VStack } from "native-base";

import colors from "../../config/colors";
import TertiaryToneButton from "../../components/utility/buttons/TertiaryToneButton";
import { useDispatch } from "react-redux";
import {
  addToken,
  setAuth,
  setUser,
  toggleLoading,
} from "../../store/app/app.actions";
import Feed from "../../components/layout/AppLayout";
import TextButton from "../../components/utility/buttons/TextButton";
import * as Yup from "yup";
import RequestService from "../../services/RequestService";
import { useFormik } from "formik";
import FormInput from "../../components/utility/forms/FormInput";
import FormInputPassword from "../../components/utility/forms/FormInputPassword";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { AuthUser } from "../../models/AuthUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PasswordReset {
  password: string;
  confirm_password: string;
}

export default function PasswordResetScreen({ navigation }) {
  const { token } = useSelector((state: State) => state.app);
  const validationSchema = Yup.object<PasswordReset>().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please enter password confirm password"),
  });

  const pF = useFormik<PasswordReset>({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: () => verify_identity(),
  });

  const dispatch = useDispatch();

  const verify_identity = async () => {
    dispatch(toggleLoading());

    const response = await RequestService.post(
      "reset_password",
      { password: pF.values.password },
      token,
      pF
    ).finally(() => {
      dispatch(toggleLoading());
    });

    if (!response.error_type) {
      setupLogin(response.data);
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

    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("token", JSON.stringify(data.access_token));

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
              Password Reset
            </Text>

            <VStack mt={10} space={5} w="100%">
              <Box>
                <FormInputPassword
                  isRequired
                  w="100%"
                  errorText={pF.errors.password}
                  isInvalid={pF.errors.password && pF.touched.password}
                  input={{
                    placeholder: "Password",
                    value: pF.values.password,
                    onChangeText: pF.handleChange("password"),
                    onBlur: pF.handleBlur("password"),
                  }}
                />
              </Box>
              <Box>
                <FormInputPassword
                  isRequired
                  w="100%"
                  errorText={pF.errors.confirm_password}
                  isInvalid={
                    pF.errors.confirm_password && pF.touched.confirm_password
                  }
                  input={{
                    placeholder: "Confirm Password",
                    value: pF.values.confirm_password,
                    onChangeText: pF.handleChange("confirm_password"),
                    onBlur: pF.handleBlur("confirm_password"),
                  }}
                />
              </Box>
            </VStack>
            <TertiaryToneButton
              opacity={!pF.isValid ? 0.7 : 1}
              onPress={() => pF.handleSubmit()}
              w="100%"
              mt={41}
              title="Reset Password"
              _text={{ style: { fontWeight: "800" } }}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Feed>
  );
}
