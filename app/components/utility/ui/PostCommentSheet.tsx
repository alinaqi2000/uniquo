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
import CommentItem from "./CommentItem";

export default function PostCommentSheet() {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const keyboard = useKeyboard();
  const inpRef = useRef(null);
  const toast = useToast();
  const { commentPost, postComments, replyTo } = useSelector(
    (state: State) => state.posts
  );
  const { user } = useSelector((state: State) => state.app);

  useEffect(() => {
    dispatch(
      setPostComments([
        new PostComment(
          1,
          1,
          "comment",
          "this is comment",
          new User(
            "Ali Musawi",
            "ali@a.com",
            "ali.musawi",
            "http://i.imgur.com/74sByqd.jpg"
          ),
          "12 min"
        ),
        new PostComment(
          2,
          1,
          "comment",
          "this is second comment",
          new User(
            "Imran Ali",
            "imran@a.com",
            "ali.imran",
            "https://www.energetixfitnessstudio.com/admin/uploads/team/1574939358.jpg"
          ),
          "16 hrs"
        ),
      ])
    );
  }, []);

  useEffect(() => {
    !!replyTo && inpRef.current.focus();
  }, [replyTo]);

  const sendComment = async () => {
    if (!!comment) {
      const newComment = new PostComment(
        !!replyTo ? replyTo.replies.length + 1 : postComments.length + 1,
        commentPost.id,
        !!replyTo ? "reply" : "comment",
        comment,
        new User(user.full_name, user.email, user.username, user.avatar),
        "now"
      );
      if (replyTo) {
        const index = postComments.findIndex((c) => c.id === replyTo.id);

        const newComments = postComments;
        newComments[index].replies.push(newComment);
        dispatch(setPostComments([...newComments]));
      } else {
        dispatch(setPostComments([...postComments, newComment]));
      }
      inpRef.current.blur();
      setComment("");
      dispatch(setReplyTo(null));
    } else {
      inpRef.current.focus();
      // toast.show({
      //   description: "Please type something...",
      //   avoidKeyboard: true,
      //   zIndex:9
      // });
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
          pb={keyboard + 70}
          bg={colors.primaryBg}
          h={height * 0.7}
        >
          <>
            {!!commentPost && (
              <VStack space={2} px={spaces.xSpace}>
                <HStack w={"100%"}>
                  <Text fontSize={"md"}>Comments ({postComments.length})</Text>
                </HStack>
                <FlatList
                  data={postComments}
                  renderItem={({ item }) => <CommentItem comment={item} />}
                />
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
                  placeholderTextColor={colors.inputPlacehoder}
                  w={width * 0.8 - spaces.xSpace * 2}
                  borderWidth={0}
                  fontSize="md"
                  _focus={{ style: { backgroundColor: colors.primaryBg } }}
                  defaultValue={comment}
                  onChangeText={(newText) => setComment(newText)}
                />
                <Pressable onPress={sendComment}>
                  <Box
                    justifyContent={"center"}
                    alignItems="center"
                    w={width - width * 0.8 - spaces.xSpace * 2}
                    minH={50}
                  >
                    <Text
                      fontWeight={!!comment ? "bold" : "normal"}
                      fontSize="md"
                    >
                      Send
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
