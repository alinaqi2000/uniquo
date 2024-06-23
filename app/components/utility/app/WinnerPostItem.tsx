import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  IPressableProps,
  Image,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import colors from "../../../config/colors";
import { Pressable, useWindowDimensions } from "react-native";
import { Post } from "../../../models/Post";
import UserAvatar from "../images/UserAvatar";
import { Image as IMG } from "react-native";
import { PostMedia } from "../../../models/PostMedia";
import spaces from "../../../config/spaces";
import MediaItem from "./common/MediaItem";

interface PressableProps extends IPressableProps {
  icon?: string;
}

interface PostProps extends PressableProps {
  post: Post;
  navigation?: any;
  onPress?: any;
}
export default function WinnerPostItem({ post, navigation }: PostProps) {
  return (
    <Pressable
      onPress={() => {
        if (navigation) {
          navigation.push("PostsFeed", {
            title: post.competition.title,
            competition: post.competition,
          });
        }
      }}
    >
      <Box
        shadow={3}
        backgroundColor={colors.boxBg}
        px={3}
        py={3}
        rounded={15}
        w={250}
        h={180}
        mr={2}
        mb={2}
        borderWidth={1}
        borderColor={colors.inputBorder}
        overflow="hidden"
      >
        <VStack space={5}>
          <HStack alignItems={"center"}>
            <Pressable
              onPress={() => navigation.push("Profile", { user: post.user })}
            >
              <UserAvatar
                size={"sm"}
                uri={post.user.avatar}
                alt={post.user.username}
              />
            </Pressable>
            <VStack ml={2}>
              <Text fontSize={11} fontWeight={"semibold"}>
                {post.user.username}
              </Text>
              <Text fontSize={10} color={colors.dimTextColor}>
                {post.posted_at.relative}
              </Text>
            </VStack>
          </HStack>

          <HStack space={3}>
            {post.media.length ? (
              <MediaItem index={1} item={post.media[0]} />
            ) : null}
            <Box>
              <Text fontSize={12} numberOfLines={5} w={120}>
                {post.description}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
}
export const WinnerPostItemSkeleton = () => {
  return (
    <Box
      shadow={3}
      backgroundColor={colors.boxBg}
      px={3}
      py={3}
      rounded={15}
      w={250}
      h={180}
      mr={2}
      mb={2}
      overflow="hidden"
    >
      <VStack space={5}>
        <HStack justifyContent={"space-between"} alignItems="center">
          <HStack alignItems={"center"}>
            {/* Avatar */}
            <Skeleton
              w={"36px"}
              h={"36px"}
              rounded={"full"}
              startColor={colors.skeletonStart}
            />
            <VStack ml={2} space={1.5}>
              <Skeleton
                w={"80px"}
                h={2}
                rounded={"full"}
                startColor={colors.skeletonStart}
              />
              <Skeleton
                w={"50px"}
                ml={0.5}
                h={1.5}
                rounded={"full"}
                startColor={colors.skeletonStart}
              />
            </VStack>
          </HStack>
        </HStack>

        <HStack space={3}>
          <Skeleton
            w={100}
            h={100}
            rounded={5}
            startColor={colors.skeletonDim}
          />
          <VStack space={3} mt={2}>
            <Skeleton
              w={"100px"}
              h={2}
              rounded={"full"}
              startColor={colors.skeletonStart}
            />
            <Skeleton
              w={"90px"}
              h={2}
              rounded={"full"}
              startColor={colors.skeletonDim}
            />
            <Skeleton
              w={"80px"}
              h={2}
              rounded={"full"}
              startColor={colors.skeletonDim}
            />
            <Skeleton
              w={"90px"}
              h={2}
              rounded={"full"}
              startColor={colors.skeletonDim}
            />
            <Skeleton
              w={"40px"}
              h={2}
              rounded={"full"}
              startColor={colors.skeletonDim}
            />
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
