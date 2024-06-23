import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  IPressableProps,
  Icon,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import colors from "../../../config/colors";
import { Pressable } from "react-native";
import { Post } from "../../../models/Post";
import UserAvatar from "../images/UserAvatar";
import { Image as IMG } from "react-native";
import { PostMedia } from "../../../models/PostMedia";
import spaces from "../../../config/spaces";
import { Competition } from "../../../models/Competition";
import { MaterialIcons } from "@expo/vector-icons";
import MediaItem from "./common/MediaItem";
import { useChannel } from "ably/react";
import { styles } from "../../../config/styles";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import RequestService from "../../../services/RequestService";

interface PressableProps extends IPressableProps {
  icon?: string;
}

interface PostProps extends PressableProps {
  post: Post;
  competition: Competition;
  navigation?: any;
  onPress?: any;
  deleteDraft?: any;
}
export default function DraftPostItem({
  post,
  competition,
  deleteDraft,
  navigation,
}: PostProps) {
  const [statePost, setStatePost] = useState(post)
  const { feed } = useSelector((state: State) => state.competitions);
  const { token } = useSelector((state: State) => state.app);

  const { channel } = useChannel("post-updated", 'competition-' + competition.id + "-post-" + statePost.id, (message) => {
    if (message.data && message.data.post) {
      const messagePost = message.data.post;
      setStatePost({ ...messagePost })
    }
  });
  useEffect(() => {
    const findCompetition = feed.find((c) => c.id == competition.id);
    if (statePost && findCompetition.myDraftPosts) {
      const findPost = findCompetition.myDraftPosts.find((p) => p.id == statePost.id);

      setStatePost(findPost);
    }
    () => {
      channel.unsubscribe();
    }
  }, [feed])
  useEffect(() => {
    getPost();
  }, []);


  const getPost = async () => {

    const response = await RequestService.get("posts/single/" + statePost.id, token);

    if (!response.error_type) {
      setStatePost(response.data);
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (navigation) {
          navigation.push("CreatePost", {
            competition,
            post: statePost,
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
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack>
              <Pressable
                onPress={() => navigation.push("Profile", { user: statePost.user })}
              >
                <UserAvatar
                  size={"sm"}
                  uri={statePost.user.avatar}
                  alt={statePost.user.username}
                />
              </Pressable>
              <VStack ml={2}>
                <Text fontSize={11} fontWeight={"semibold"}>
                  {statePost.user.username}
                </Text>
                <Text fontSize={10} color={colors.dimTextColor}>
                  {statePost.posted_at.relative}
                </Text>
              </VStack>
            </HStack>

            <HStack
              w={"36px"}
              h={"36px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Pressable onPress={() => deleteDraft(statePost)} {...styles.rippleStyles}>
                <HStack justifyContent={"center"} alignItems={"center"} w={"48px"} h={"48px"}>
                  <Icon
                    as={MaterialIcons}
                    name="delete-outline"
                    color={"red.400"}
                    size={"sm"}
                  />
                </HStack>
              </Pressable>
            </HStack>
          </HStack>

          <HStack space={3}>
            {statePost.media && statePost.media.length ? (<>
              <MediaItem index={1} item={statePost.media[0]} />
            </>
            ) : (
              <MediaItem
                index={1}
                item={
                  new PostMedia(
                    0,
                    "image",
                    "https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-gallery-vector-icon-png-image_1028015.jpg"
                  )
                }
              />
            )}
            <Box>
              <Text
                fontSize={12}
                numberOfLines={5}
                overflow={"hidden"}
                w={120}
              >
                {statePost.description}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
}



export const DraftPostItemSkeleton = () => {
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
