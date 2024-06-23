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

export default function PostSingleImageItem({ post, navigation }: Props) {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();

  return (
    <Pressable onPress={() => navigation.push("MyPosts", { post })}>
      <HStack justifyContent={"center"}>
        {
          post.media.length ?
            <Image
              h={dimensions.width / 3}
              w={dimensions.width / 3}
              alt={`${post.id}`}
              source={{ uri: post.media[0].url }}
            />
            : null
        }
      </HStack>
    </Pressable>
  );
}
