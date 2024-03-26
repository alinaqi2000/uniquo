import {
  Box,
  Button,
  HStack,
  Pressable,
  StatusBar,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import colors from "../../config/colors";
import spaces from "../../config/spaces";
import HeaderActionButton from "../utility/buttons/HeaderActionButton";
import { styles } from "../../config/styles";
import BackButton from "../utility/buttons/BackButton";
import { useNavigation } from "@react-navigation/native";

interface ModalProps {
  navigation: any;
  children: any;
  title?: any;
  tapOverlayToClose?: boolean;
  hasOverlayBackground?: boolean;
  topCloseButton?: boolean;
  topBackButton?: boolean;
}

export default function Modal({
  navigation,
  children,
  title,
  hasOverlayBackground,
  tapOverlayToClose,
  topCloseButton,
  topBackButton,
}: ModalProps) {
  const { height } = useWindowDimensions();
  const nav = useNavigation();
  const topSpace = (spaces.modalTopSpace / 100) * height;
  return (
    <VStack bg={hasOverlayBackground ? colors.overlay : "transparent"}>
      {/* overlay */}
      {hasOverlayBackground ? (
        <StatusBar backgroundColor={colors.overlay} />
      ) : null}

      <Pressable
        onPress={() => (tapOverlayToClose ? navigation.goBack() : null)}
      >
        <View h={topSpace} />
      </Pressable>

      {/* modal */}
      <View
        bg={colors.primaryBg}
        borderTopRadius={spaces.boxBorderRadius}
        h={height - topSpace}
        pb={spaces.xSpace}
      >
        {/* title bar */}
        {title || topCloseButton || topCloseButton ? (
          <HStack
            h={50}
            justifyContent={"start"}
            alignItems={"center"}
            borderBottomWidth={1}
            borderColor={colors.dimBorder}
            px={spaces.xSpace / 2}
          >
            <HStack flex={1}>
              {topBackButton ? (
                <BackButton
                  _icon={{ size: "sm" }}
                  pl={3}
                  py={2}
                  maxW={16}
                  {...styles.rippleStyles}
                  onPress={() => navigation.goBack()}
                />
              ) : null}
            </HStack>
            <Text flex={0} fontSize={"lg"} py={2}>
              {title}
            </Text>
            <HStack flex={1} justifyContent={"flex-end"}>
              {topCloseButton ? (
                <HeaderActionButton
                  pl={3}
                  py={2}
                  maxW={16}
                  icon="close"
                  {...styles.rippleStyles}
                  _icon={{ size: "md", color: colors.primaryTextColor }}
                  onPress={() => nav.goBack()}
                />
              ) : null}
            </HStack>
          </HStack>
        ) : null}

        {/* content area */}
        <View p={spaces.xSpace}>{children}</View>
      </View>
    </VStack>
  );
}
