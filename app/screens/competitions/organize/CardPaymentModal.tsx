import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import React from "react";
import Modal from "../../../components/layout/Modal";
import PrimaryButton from "../../../components/utility/buttons/PrimaryButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../../store/app/app.actions";
import RequestService from "../../../services/RequestService";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import FormInput from "../../../components/utility/forms/FormInput";
import { OrganizerCompetition } from "../../../models/OrganizerCompetition";
import colors from "../../../config/colors";
import spaces from "../../../config/spaces";
import UIService from "../../../services/UIService";
import { setMyCompetitions } from "../../../store/competitions/competitions.actions";
import UtilService from "../../../services/UtilService";

interface CardPaymentForm {
  card_number: string;
  card_name: string;
  expiry_date: string;
  cvv: string;
}
export default function CardPaymentModal({ navigation, route }) {
  const { token } = useSelector((state: State) => state.app);
  const { my } = useSelector((state: State) => state.competitions);
  const dispatch = useDispatch();

  const { competition }: { competition: OrganizerCompetition } = route.params;

  const validationSchema = Yup.object().shape({
    card_number: Yup.string()
      .required("Card number is required")
      .length(16, "Card number must be 16 digits")
      .matches(/^\d+$/, "Card number must be numeric"),
    card_name: Yup.string().required("Cardholder name is required"),
    expiry_date: Yup.string()
      .required("Expiry date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "Invalid expiry date format (MM/YY)"
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .length(3, "CVV must be 3 digits")
      .matches(/^\d+$/, "CVV must be numeric"),
  });

  const cF = useFormik<CardPaymentForm>({
    initialValues: {
      card_number: "",
      card_name: "",
      expiry_date: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: () => cardPayment(),
  });

  const makeExpiry = (newValue) => {
    const formattedValue = newValue
      .replace(/\D/g, "") // Remove non-digits
      .slice(0, 4) // Limit to 4 characters (MM/YY)
      .replace(/^(\d{2})/, "$1/"); // Add '/' after 2nd digit (if present)
    cF.setFieldValue("expiry_date", formattedValue);
  };
  const makeCVV = (newValue) => {
    const formattedValue = newValue
      .replace(/\D/g, "") // Remove non-digits
      .slice(0, 3); // Limit to 3 characters (123)
    cF.setFieldValue("cvv", formattedValue);
  };
  const makeCard = (newValue) => {
    const formattedValue = newValue
      .replace(/\D/g, "") // Remove non-digits
      .slice(0, 16); // Limit to 16 characters (123)
    cF.setFieldValue("card_number", formattedValue);
  };
  const cardPayment = async () => {
    dispatch(toggleLoading());

    const response = await RequestService.post(
      "payments/competition/card",
      {
        competition_id: competition.id,
        card_number: cF.values.card_number,
        card_name: cF.values.card_name,
        expiry_date: cF.values.expiry_date,
        cvv: cF.values.cvv,
      },
      token,
      cF
    ).finally(() => {
      dispatch(toggleLoading());
    });

    if (!response.error_type) {
      const updatedMyCompetitions = UtilService.updateObject(
        my,
        "id",
        competition.id,
        response.data
      );
      dispatch(setMyCompetitions(updatedMyCompetitions));

      navigation.replace("PaymentSuccess", { competition });
    }
  };
  return (
    <Modal
      navigation={navigation}
      topBackButton
      hasOverlayBackground
      title={"Card Payment"}
    >
      <VStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              bg={colors.secondaryColor}
              px={3}
              py={2}
              // mb={2}
              borderRadius={5}
            >
              <Text
                fontSize={"xs"}
                fontWeight={"semibold"}
                color={colors.secondaryTextColor}
              >
                Total Bill
              </Text>
              <Text
                fontSize={"md"}
                color={"tertiary.700"}
                fontWeight={"semibold"}
              >
                {UIService.currency(competition.financials.total_amount)}
              </Text>
            </HStack>
            <VStack mt={5} space={5} w="100%">
              <Box>
                <FormInput
                  isRequired
                  w="100%"
                  errorText={cF.errors.card_number}
                  isInvalid={cF.errors.card_number && cF.touched.card_number}
                  input={{
                    placeholder: "Card Number",
                    value: cF.values.card_number,
                    keyboardType: "decimal-pad",
                    onChangeText: makeCard,
                    onBlur: cF.handleBlur("card_number"),
                  }}
                />
              </Box>
              <Box>
                <FormInput
                  isRequired
                  w="100%"
                  errorText={cF.errors.card_name}
                  isInvalid={cF.errors.card_name && cF.touched.card_name}
                  input={{
                    placeholder: "Cardholder Name",
                    value: cF.values.card_name,
                    onChangeText: cF.handleChange("card_name"),
                    onBlur: cF.handleBlur("card_name"),
                  }}
                />
              </Box>
              <HStack space={5} justifyContent={"space-between"}>
                <Box flex={1}>
                  <FormInput
                    isRequired
                    w="100%"
                    errorText={cF.errors.expiry_date}
                    isInvalid={cF.errors.expiry_date && cF.touched.expiry_date}
                    input={{
                      placeholder: "MM/YY",
                      keyboardType: "decimal-pad",
                      value: cF.values.expiry_date,
                      onChangeText: makeExpiry,
                      onBlur: cF.handleBlur("expiry_date"),
                    }}
                  />
                </Box>
                <Box flex={1}>
                  <FormInput
                    isRequired
                    w="100%"
                    errorText={cF.errors.cvv}
                    isInvalid={cF.errors.cvv && cF.touched.cvv}
                    input={{
                      placeholder: "Security Code (CVV)",
                      keyboardType: "decimal-pad",
                      value: cF.values.cvv,
                      onChangeText: makeCVV,
                      onBlur: cF.handleBlur("cvv"),
                    }}
                  />
                </Box>
              </HStack>
              <PrimaryButton
                onPress={() => cF.handleSubmit()}
                title="Pay Now"
              />
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </Modal>
  );
}
