import { Text, VStack } from "native-base";
import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import Modal from "../../../components/layout/Modal";
import Lottie from "../../../components/utility/animated/Lottie";
import colors from "../../../config/colors";
import TertiaryToneButton from "../../../components/utility/buttons/TertiaryToneButton";
import OutlineButton from "../../../components/utility/buttons/OutlineButton";
import { OrganizerCompetition } from "../../../models/OrganizerCompetition";
import { PaymentMode } from "../../../models/PaymentMode";

export default function PaymentSuccessModal({ navigation, route }) {
  const { width } = useWindowDimensions();

  const {
    competition,
    paymentMode,
  }: {
    paymentMode: PaymentMode;
    competition: OrganizerCompetition;
  } = route.params;

  return (
    <Modal navigation={navigation} topCloseButton title={"Payment Successful"}>
      <VStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack alignItems={"center"} space={10}>
            <Lottie w={width / 1.1} h={150} animation="payment_success" />
            <Text textAlign={"center"} fontSize={"lg"} color={"tertiary.400"}>
              Payment Success!
            </Text>
            {paymentMode === "competition_participation" ? (
              <Text textAlign={"center"} fontSize={"md"}>
                Participation fee for{" "}
                <Text color={"tertiary.400"}>#{competition.slug}</Text> has been
                paid. You can participate before the voting starts.
              </Text>
            ) : null}

            {paymentMode === "competition_hosting" ? (
              <Text textAlign={"center"} fontSize={"md"}>
                Bil for <Text color={"tertiary.400"}>#{competition.slug}</Text>{" "}
                has been paid. You can publish it whenever you want.
              </Text>
            ) : null}
            <OutlineButton title="Close" onPress={() => navigation.goBack()} />
          </VStack>
        </ScrollView>
      </VStack>
    </Modal>
  );
}
