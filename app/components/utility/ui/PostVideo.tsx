import { View, Text, useWindowDimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { Box, Button, Icon, Spinner } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import { useDispatch } from "react-redux";
import { pauseAllVideos as pauseAll } from "../../../store/posts/posts.actions";

interface Props {
  uri: string;
  index: number;
}
export default function PostVideo({ uri, index }: Props) {
  const { pauseAllVideos } = useSelector((state: State) => state.posts);
  const video = React.useRef(null);
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState<any>({});
  const [volume, setVolume] = React.useState(0);
  const dimensions = useWindowDimensions();
  const [height, setHeight] = useState(360);
  const [width, setWidth] = useState(dimensions.width);

  useEffect(() => {
    video.current.pauseAsync();
  }, [index]);
  useEffect(() => {
    if (status.isPlaying) video.current.pauseAsync();
  }, [pauseAllVideos]);
  return (
    <View>
      <Box
        h={1}
        bg={colors.dimTextColor}
        width={
          status.isLoaded
            ? (status.positionMillis / status.durationMillis) * dimensions.width
            : 0
        }
      />
      <Video
        ref={video}
        resizeMode={ResizeMode.COVER}
        source={{
          uri,
        }}
        onReadyForDisplay={(response: any) => {
          if (status.isLoaded) {
            const newW =
              (height * response.naturalSize.width) /
              response.naturalSize.height;
            setWidth(dimensions.width);
          }
        }}
        style={{ width, height }}
        useNativeControls={false}
        isLooping
        onPlaybackStatusUpdate={(status) => {
          console.log(status);
          setStatus(() => status);
        }}
      />
      {!status.isLoaded ? (
        <Spinner
          position={"absolute"}
          opacity={50}
          color={colors.dimTextColor}
          size={"lg"}
          style={{
            transform: [
              { translateX: dimensions.width / 2 - 20 },
              { translateY: height / 2 - 20 },
            ],
          }}
        />
      ) : (
        <Pressable
          onPress={() => {
            if (status.isPlaying) {
              video.current.pauseAsync();
            } else {
              dispatch(pauseAll());
              video.current.playAsync();
            }
          }}
        >
          <Icon
            position={"absolute"}
            opacity={50}
            color={colors.dimTextColor}
            size={"20"}
            style={{
              transform: [
                { translateX: dimensions.width / 2 - 40 },
                { translateY: height / -2 - 40 },
              ],
            }}
            as={MaterialIcons}
            name={status.isPlaying ? "pause" : "play-arrow"}
          />
        </Pressable>
      )}
    </View>
  );
}
