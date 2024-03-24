import { Box, FlatList, HStack, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import colors from "../../../config/colors";
import spaces from "../../../config/spaces";
import { PostComment } from "../../../models/PostComment";
import { setReplyTo } from "../../../store/posts/posts.actions";
import UserAvatar from "../images/UserAvatar";

interface Props {
  comment: PostComment;
}
export default function ReplyItem({ comment }: Props) {
  return (
    <VStack space={1} mb={1}>
      <HStack space={3}>
        <UserAvatar mt={1} size={"xs"} uri={comment.by.avatar} />
        <VStack space={0.3}>
          <Text fontSize={"xs"}>{comment.by.username}</Text>
          <Text fontSize={"10"}>{comment.text}</Text>
          <HStack space={5}>
            <Text color={colors.dimTextColor} fontSize={"xs"}>
              {comment.date}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
