import { Fontisto } from "@expo/vector-icons";
import {
  useDisclose,
  Actionsheet,
  Button,
  FlatList,
  Input,
  HStack,
  Pressable,
  Text,
  Box,
  KeyboardAvoidingView,
  useKeyboardBottomInset,
  VStack,
  Icon,
  useToast,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import colors from "../../../config/colors";
import spaces from "../../../config/spaces";
import { PostComment } from "../../../models/PostComment";
import { User } from "../../../models/User";
import { State } from "../../../store";
import {
  setCommentPost,
  setPostComments,
  setReplyTo,
} from "../../../store/posts/posts.actions";
import { useKeyboard } from "../../hooks/useKeyboard";
import CommentItem, { CommentItemSkeleton } from "./CommentItem";
import RequestService from "../../../services/RequestService";
import UtilService from "../../../services/UtilService";

export default function PostCommentSheet() {
  const { token } = useSelector((state: State) => state.app);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const keyboard = useKeyboard();
  const inpRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { commentPost, postComments, replyTo } = useSelector(
    (state: State) => state.posts
  );
  const { user } = useSelector((state: State) => state.app);

  useEffect(() => {
    if (commentPost) {
      getComments();
    }
    return () => {
      dispatch(setCommentPost(null))
      dispatch(setPostComments([]))
      dispatch(setReplyTo(null))
    }
  }, [])



  useEffect(() => {
    !!replyTo && inpRef.current.focus();
  }, [replyTo]);

  const sendComment = async () => {
    setSending(true);

    if (!!comment) {
      var url = `posts/${commentPost.id}/comments`;
      if (replyTo) {
        url = `posts/${commentPost.id}/comments/${replyTo.id}`
      }


      const response = await RequestService.post(
        url,
        { text: comment },
        token
      ).finally(() => setSending(false));

      if (replyTo) {
        replyTo.replies = [...replyTo.replies, response.data];


        const updatedComments = UtilService.updateObject(
          postComments,
          "id",
          replyTo.id,
          replyTo
        );

        dispatch(setPostComments(updatedComments))
      } else {
        dispatch(setPostComments([...postComments, response.data]))
      }

      inpRef.current.blur();
      setComment("");
      dispatch(setReplyTo(null));
    } else {
      inpRef.current.focus();
    }
  };


  const getComments = async () => {

    const response = await RequestService.get("posts/" + commentPost.id + "/comments", token)
      .finally(() => setLoading(false));

    if (!response.error_type) {
      dispatch(setPostComments([...response.data]));
    }
  };

  return (
    <>
      {/* <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}> */}
      <Actionsheet
        accessibilityRole="scrollbar"
        isOpen={!!commentPost}
        onClose={() => dispatch(setCommentPost(null))}
      >
        <Actionsheet.Content
          pb={keyboard + 100}
          bg={colors.primaryBg}
          h={height * 0.7}
        >
          <>
            {!!commentPost && (
              <VStack space={2} w={width} px={spaces.xSpace}>
                <HStack w={"100%"}>
                  <Text fontSize={"md"}>Comments ({postComments.length})</Text>
                </HStack>
                {loading ? UtilService.generateNumbersArray(10).map(i => <CommentItemSkeleton key={`skele-${i}`} />) :

                  <FlatList
                    data={postComments}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CommentItem key={`comment-${item.id}`} comment={item} />}
                  />

                }
              </VStack>
            )}
            <VStack
              px={spaces.xSpace}
              position={"absolute"}
              bottom={keyboard - 1}
              w={width}
              borderTopColor={colors.secondaryBg}
              borderTopWidth={1}
              bg={colors.primaryBg}
            >
              {!!replyTo && (
                <HStack mt={2} mb={0} justifyContent="space-between">
                  <Text fontSize={"xs"}>
                    Replying to
                    <Text fontWeight={"bold"}>@{replyTo.by.username}</Text>
                  </Text>
                  <Pressable onPress={() => dispatch(setReplyTo(null))}>
                    <Icon as={Fontisto} size="xs" name="close-a" />
                  </Pressable>
                </HStack>
              )}
              <HStack justifyContent={"center"}>
                <Input
                  ref={inpRef}
                  blurOnSubmit={true}
                  placeholder="Type here..."
                  placeholderTextColor={colors.inputPlaceholder}
                  w={width * 0.78 - spaces.xSpace * 2}
                  borderWidth={0}
                  fontSize="md"
                  _focus={{ style: { backgroundColor: colors.primaryBg } }}
                  defaultValue={comment}
                  onChangeText={(newText) => setComment(newText)}
                />
                <Pressable onPress={sendComment} disabled={sending}>
                  <Box
                    justifyContent={"center"}
                    alignItems="center"
                    w={width - width * 0.78 - spaces.xSpace * 2}
                    minH={50}
                  >
                    <Text
                      fontWeight={!!comment ? "bold" : "normal"}
                      fontSize="md"
                    >
                      {sending ? "Sending" : "Send"}
                    </Text>
                  </Box>
                </Pressable>
              </HStack>
            </VStack>
          </>
        </Actionsheet.Content>
      </Actionsheet>
      {/* </KeyboardAvoidingView> */}
    </>
  );
}
