import { Box, FlatList, HStack, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import colors from "../../../config/colors";
import spaces from "../../../config/spaces";
import { PostComment } from "../../../models/PostComment";
import { setReplyTo } from "../../../store/posts/posts.actions";
import UserAvatar from "../images/UserAvatar";
import ReplyItem from "./ReplyItem";

interface Props {
  comment: PostComment;
}
export default function CommentItem({ comment }: Props) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [showReplies, setShowReplies] = useState(false);
  return (
    <VStack w={width} space={1} mb={2}>
      <HStack space={3}>
        <UserAvatar mt={1} size={"sm"} uri={comment.by.avatar} />
        <VStack space={0.3}>
          <Text>{comment.by.username}</Text>
          <Text fontSize={"12"}>{comment.text}</Text>
          <HStack space={5}>
            <Text color={colors.dimTextColor} fontSize={"xs"}>
              {comment.date}
            </Text>
            <Pressable onPress={() => dispatch(setReplyTo(comment))}>
              <Text color={colors.dimTextColor} fontSize={"xs"}>
                Reply
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
      {comment.replies.length ? (
        <VStack ml={width * 0.12}>
          <Pressable onPress={() => setShowReplies(!showReplies)}>
            <HStack alignItems={"center"} space={2}>
              <Box
                w={width * 0.1}
                opacity={70}
                background={colors.dimTextColor}
                h={0.5}
              />
              <Text fontSize={"xs"} color={colors.dimTextColor}>
                {showReplies ? "Hide" : "Show"} Replies (
                {comment.replies.length})
              </Text>
            </HStack>
          </Pressable>

          {showReplies && (
            <Box my={1}>
              <FlatList
                data={comment.replies}
                renderItem={({ item }) => <ReplyItem comment={item} />}
              />
            </Box>
          )}
        </VStack>
      ) : (
        ""
      )}
    </VStack>
  );
}
