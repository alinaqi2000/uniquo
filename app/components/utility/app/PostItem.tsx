import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Icon,
  Box,
  HStack,
  View,
  Text,
  VStack,
  Pressable,
  Link,
  Image,
  Skeleton,
  Badge,
} from "native-base";
import { Image as IMG } from "react-native";

import { Post } from "../../../models/Post";
import UserAvatar from "../images/UserAvatar";
import {
  EvilIcons,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../../../config/colors";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { PostImage } from "../../../models/PostImage";
import { useWindowDimensions } from "react-native";
import spaces from "../../../config/spaces";
import { useDispatch } from "react-redux";
import {
  pauseAllVideos,
  setCommentPost,
} from "../../../store/posts/posts.actions";
import { PostMedia } from "../../../models/PostMedia";
import PostVideo from "./PostVideo";
import Pluralize from "pluralize";
import ImageView from "react-native-image-viewing";
import { BaseCompetition } from "../../../models/constants";

interface Props {
  post: Post;
  navigation?: any;
  competition?: BaseCompetition;
  openActionSheet?: (post: Post) => void;

}
const STR_LEN = 80;

export default function PostItem({ post, competition, navigation, openActionSheet }: Props) {
  const dispatch = useDispatch();
  var status = null;
  var winner = null;
  
  if (post.votedByMe) {
    status = <Badge borderRadius={5} _text={{ fontSize: 10 }} colorScheme="tertiary">VOTED</Badge>
  }
  if (post.winner) {
    winner = <Icon
      as={EvilIcons}
      color={colors.secondaryColor}
      name={"trophy"}
      size={"lg"}
    />
  }

  return (
    <Box my={2}>
      {/* Header */}
      <HStack
        mx={spaces.xSpace}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <HStack alignItems={"center"}>
          <Pressable
            onPress={() => navigation.push("Profile", { user: post.user })}
          >
            <UserAvatar
              size={10}
              uri={post.user.avatar}
              alt={post.user.username}
            />
          </Pressable>
          <VStack ml={2}>
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              {post.user.username}
            </Text>
            <Text fontSize={"xs"} color={colors.dimTextColor}>
              {post.posted_at.relative}
            </Text>
          </VStack>
        </HStack>
        <HStack space={3}>
          {winner}
          {status}
          <Pressable
            onPress={() => {
              if (openActionSheet) {
                openActionSheet(post);
              }
            }}
          ><HStack w={"36px"} h={"24px"} justifyContent={"center"} alignItems={"center"} >
              <Icon
                size={"md"}
                color={"white"}
                as={MaterialIcons}
                name="more-horiz"
              />
            </HStack>
          </Pressable>
        </HStack>
      </HStack>
      {/* Description */}
      <VStack my={1} mx={spaces.xSpace}>
        <PostDescriptionItem post={post} />
      </VStack>
      <VStack>
        {post.media.length && (
          <PostMediaItems post={post} />
        )}
        {
          competition && competition.stage === "completed" ?
            <HStack
              borderColor={colors.secondaryBg}
              // borderBottomWidth={1}
              px={spaces.xSpace}
              py={2}
              justifyContent="space-between"
            >
              <HStack alignItems={"center"} space={2}>
                <Icon
                  as={MaterialIcons}
                  color={colors.dimTextColor}
                  name="how-to-vote"
                  size={"sm"}
                />
                <Text fontSize={"xs"} color={colors.dimTextColor}>
                  {Pluralize("vote", +post.votes, true)}
                </Text>
              </HStack>
              <Pressable
                onPress={() => {
                  dispatch(pauseAllVideos());
                  dispatch(setCommentPost(post));
                }}
              >
                <HStack alignItems={"center"} space={2}>
                  <Icon
                    as={Fontisto}
                    color={colors.dimTextColor}
                    name="comments"
                    size={"sm"}
                  />
                  <Text fontSize={"xs"} color={colors.dimTextColor}>
                    Comments
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
            : null
        }
      </VStack>
    </Box>
  );
}
export const PostDescriptionItem = ({ post }: { post: Post }) => {
  const greaterDesc = post.description.length > STR_LEN;
  const [fullDesc, setFullDesc] = useState(false);

  return <Text fontSize={"sm"} lineHeight={"sm"} my={2} color={colors.dimTextColor}>
    {greaterDesc
      ? fullDesc
        ? post.description
        : post.description.substring(0, STR_LEN) + "..."
      : post.description}

    {greaterDesc &&
      (fullDesc ? (
        <Link
          style={{ transform: [{ translateY: 3 }, { translateX: 4 }] }}
          _text={{
            style: {
              color: colors.dimTextColor,
            },
          }}
          onPress={() => setFullDesc(false)}
        >
          less
        </Link>
      ) : (
        <Link
          style={{ transform: [{ translateY: 3 }, { translateX: 4 }] }}
          _text={{
            style: {
              color: colors.dimTextColor,
            },
          }}
          onPress={() => setFullDesc(true)}
        >
          more
        </Link>
      ))}
  </Text>;
}
export const PostMediaItems = ({ post }: { post: Post }) => {
  const [index, setIndex] = React.useState(1);
  const [pause, setPause] = React.useState(false);
  const isCarousel = React.useRef(null);

  const dimensions = useWindowDimensions();

  return <Box
    mt={1}
    borderColor={colors.secondaryBg}
    borderTopWidth={1}
    borderBottomWidth={1}
  >
    <Box
      background={colors.secondaryBg}
      px={2}
      py={1}
      position={"absolute"}
      zIndex="111"
      right={2}
      rounded={12}
      top={2}
    >
      <Text fontSize={"xs"}>
        {index} / {post.media.length}
      </Text>
    </Box>
    <Carousel
      layoutCardOffset={9}
      ref={isCarousel}
      vertical={false}
      data={post.media}
      renderItem={({ item }: { item: any }) => (
        <SliderItem item={item} index={index - 1} urls={[...post.media.map((i) => {
          if (i.type === 'image') {
            return { uri: i.url }
          }

        }
        )]} />
      )}
      sliderWidth={dimensions.width}
      itemWidth={dimensions.width}
      onSnapToItem={(i) => setIndex(i + 1)}
      useScrollView={true}
    />
  </Box>
}
const SliderItem = ({ item, index, urls }: { item: PostMedia; index: number, urls: { uri: string }[] }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visible, setIsVisible] = useState(false);
  const dimensions = useWindowDimensions();

  useEffect(() => {
    if (item.type === "image") {

      IMG.getSize(item.url, (w, h) => {
        setHeight(360);
        const newW = (360 * w) / h;

        setWidth(newW);
      });
    }
  }, []);

  return (
    <HStack justifyContent={"center"}>
      {item.type === "image" ? (
        <>
          <Pressable onPress={() => setIsVisible(true)}>

            <Image
              h={loading ? 0 : height}
              w={loading ? 0 : width}
              onLoadEnd={() => setLoading(false)}

              alt={`${item.id}`}
              source={{ uri: item.url }}
            />
          </Pressable>
          <ImageView
            images={urls.filter(i => i !== undefined)}
            imageIndex={index}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          {loading ?
            <Skeleton
              borderRadius={5}
              h={height} w={width}
              startColor={colors.skeletonDim} />
            : null
          }
        </>
      ) : (
        <PostVideo uri={item.url} index={index} />
      )}
    </HStack>
  );
};

export const PostItemSkeleton = () => {
  return (
    <Box my={2}>
      {/* Header */}
      <HStack
        mx={spaces.xSpace}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <HStack alignItems={"center"}>
          {/* Avatar */}
          <Skeleton
            w={"45px"}
            h={"45px"}
            rounded={"full"}
            startColor={colors.skeletonStart}
          />
          <VStack ml={2} space={2}>
            <Skeleton
              w={"80px"}
              h={3}
              rounded={"full"}
              startColor={colors.skeletonStart}
            />
            <Skeleton
              w={"50px"}
              ml={1}
              h={2}
              rounded={"full"}
              startColor={colors.skeletonStart}
            />
          </VStack>
        </HStack>
        <HStack>
          {/* more */}
          <Skeleton
            w={"20px"}
            h={2}
            rounded={"full"}
            startColor={colors.skeletonStart}
          />
        </HStack>
      </HStack>
      {/* Description */}
      <VStack my={2} mx={spaces.xSpace} space={1}>
        {/* text */}
        <Skeleton
          w={"80%"}
          h={2}
          rounded={"full"}
          startColor={colors.skeletonStart}
        />
        <Skeleton
          w={"50%"}
          h={2}
          rounded={"full"}
          startColor={colors.skeletonStart}
        />
      </VStack>
      <VStack>
        {/* images */}
        <Skeleton
          w={"100%"}
          h={"300px"}
          rounded={"5"}
          startColor={colors.skeletonDim}
        />
        <HStack
          borderColor={colors.secondaryBg}
          px={spaces.xSpace}
          py={2}
          justifyContent="space-between"
        >
          <HStack alignItems={"center"} space={2}>
            {/* votes */}
            <Skeleton
              w={"20px"}
              h={"20px"}
              rounded={"lg"}
              startColor={colors.skeletonDim}
            />
            <Skeleton
              w={"60px"}
              h={2}
              rounded={"sm"}
              startColor={colors.skeletonDim}
            />
          </HStack>
          <HStack alignItems={"center"} space={2}>
            {/* Comments */}
            <Skeleton
              w={"20px"}
              h={"20px"}
              rounded={"lg"}
              startColor={colors.skeletonDim}
            />
            <Skeleton
              w={"60px"}
              h={2}
              rounded={"sm"}
              startColor={colors.skeletonDim}
            />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};
