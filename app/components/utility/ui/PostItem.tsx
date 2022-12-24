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
} from "native-base";
import { Image as IMG } from "react-native";

import { Post } from "../../../models/Post";
import UserAvatar from "../images/UserAvatar";
import {
  EvilIcons,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../../../config/colors";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { PostImage } from "../../../models/PostImage";
import { useWindowDimensions } from "react-native";
import spaces from "../../../config/spaces";
import { useDispatch } from "react-redux";
import { setCommentPost } from "../../../store/posts/posts.actions";

interface Props {
  post: Post;
  navigation?: any;
}
// const SilderItem = (props: any) => {
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const dimensions = useWindowDimensions();

//   useEffect(() => {
//     IMG.getSize(props.item.url, (w, h) => {
//       setWidth(w);
//       const newH = (dimensions.width * h) / w;
//
//       setHeight(newH);
//     });
//   }, []);

//   return (
//     <Box>
//       <Image
//         h={height}
//         alt={`${props.item.id}`}
//         source={{ uri: props.item.url }}
//       />
//     </Box>
//   );
// };

const SilderItem = (props: any) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const dimensions = useWindowDimensions();

  useEffect(() => {
    IMG.getSize(props.item.url, (w, h) => {
      setHeight(360);
      const newW = (360 * w) / h;

      setWidth(newW);
    });
  }, []);

  return (
    <HStack justifyContent={"center"}>
      <Image
        h={height}
        w={width}
        alt={`${props.item.id}`}
        source={{ uri: props.item.url }}
      />
    </HStack>
  );
};
const STR_LEN = 80;

export default function PostItem({ post, navigation }: Props) {
  const greaterDesc = post.description.length > STR_LEN;
  const [fullDesc, setFullDesc] = useState(false);
  const [index, setIndex] = React.useState(1);
  const isCarousel = React.useRef(null);

  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();

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
              {post.posted_at}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <Pressable>
            <Icon
              size={"md"}
              color={"white"}
              as={MaterialIcons}
              name="more-horiz"
            />
          </Pressable>
        </HStack>
      </HStack>
      {/* Description */}
      <VStack my={1} mx={spaces.xSpace}>
        <Text fontSize={14} color={colors.dimTextColor}>
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
        </Text>
      </VStack>
      <VStack>
        {post.images.length && (
          <Box
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
                {index} / {post.images.length}
              </Text>
            </Box>
            <Carousel
              layoutCardOffset={9}
              ref={isCarousel}
              vertical={false}
              data={post.images}
              renderItem={({ item, index }) => (
                <SilderItem
                  item={item}
                  total={post.images.length}
                  index={index + 1}
                />
              )}
              sliderWidth={dimensions.width}
              itemWidth={dimensions.width}
              onSnapToItem={(i) => setIndex(i + 1)}
              useScrollView={true}
            />
          </Box>
        )}
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
              {post.votes} votes
            </Text>
          </HStack>
          <Pressable onPress={() => dispatch(setCommentPost(post))}>
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
      </VStack>
    </Box>
  );
}
