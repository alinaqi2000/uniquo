import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
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
import { apiConfig } from "../../config/apiConfig";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface rF {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function RegisterScreen({ navigation }) {
  const [formData, setData] = React.useState<rF | null>(null);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please enter password confirm password"),
  });
  const rF = useFormik<rF>({
    initialValues: {
      email: "",
      password: "",
      full_name: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {}, []);

  const dispatch = useDispatch();
  const register = async () => {
    const response = await axios
      .post(apiConfig.apiURL + "register", {
        full_name: rF.values.full_name,
        email: rF.values.email,
        password: rF.values.password,
      })
      .catch(console.log);
    console.log(response);

    // dispatch(
    //   setUser(
    //     new AuthUser(
    //       "Ali Naqi Al-Musawi",
    //       "ali@gmail.com",
    //       "ali.naqi2000",
    //       "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
    //       "92",
    //       "3061561248",
    //       1900,
    //       "login",
    //       ""
    //     )
    //   )
    // );
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
              Register
            </Text>
            <Text mt={2} color={colors.dimTextColor}>
              Create a new account
            </Text>

            <VStack mt={10} space={5} w="100%">
              <Box>
                <FormInput
                  isRequired
                  w="100%"
                  errorText={rF.errors.full_name}
                  isInvalid={rF.errors.full_name && rF.touched.full_name}
                  input={{
                    placeholder: "Full Name",
                    value: rF.values.full_name,
                    onChangeText: rF.handleChange("full_name"),
                    onBlur: rF.handleBlur("full_name"),
                  }}
                />
              </Box>
              <Box>
                <FormInput
                  isRequired
                  w="100%"
                  errorText={rF.errors.email}
                  isInvalid={rF.errors.email && rF.touched.email}
                  input={{
                    placeholder: "Email",
                    value: rF.values.email,
                    onChangeText: rF.handleChange("email"),
                    onBlur: rF.handleBlur("email"),
                  }}
                />
              </Box>
              <Box>
                <FormInputPassword
                  isRequired
                  w="100%"
                  errorText={rF.errors.password}
                  isInvalid={rF.errors.password && rF.touched.password}
                  input={{
                    placeholder: "Password",
                    value: rF.values.password,
                    onChangeText: rF.handleChange("password"),
                    onBlur: rF.handleBlur("password"),
                  }}
                />
              </Box>
              <Box>
                <FormInputPassword
                  isRequired
                  w="100%"
                  errorText={rF.errors.confirm_password}
                  isInvalid={
                    rF.errors.confirm_password && rF.touched.confirm_password
                  }
                  input={{
                    placeholder: "Confirm Password",
                    value: rF.values.confirm_password,
                    onChangeText: rF.handleChange("confirm_password"),
                    onBlur: rF.handleBlur("confirm_password"),
                  }}
                />
              </Box>
            </VStack>

            <TertiaryToneButton
              onPress={() => rF.handleSubmit()}
              w="100%"
              mt={50}
              title="Register"
              _text={{ style: { fontWeight: "800" } }}
            />
            <Button onPress={register} w={"100%"} mt={3} bg={"light.100"}>
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
              onPress={() => navigation.navigate("Login")}
              w="100%"
              mt={10}
              title="Already registered? Login Now"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Feed>
  );
}