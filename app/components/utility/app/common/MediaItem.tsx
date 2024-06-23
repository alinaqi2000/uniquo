import { HStack, Icon, Image, Pressable, Skeleton, Text } from "native-base";
import { useState, useEffect, useRef } from "react";
import { PostMedia } from "../../../../models/PostMedia";
import { Image as IMG, useWindowDimensions } from "react-native";
import colors from "../../../../config/colors";
import { ResizeMode, Video } from "expo-av";
import ImageView from "react-native-image-viewing";
import spaces from "../../../../config/spaces";
import { MaterialIcons } from "@expo/vector-icons";
import { State } from "../../../../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pauseAllVideos as pauseAll } from "../../../../store/posts/posts.actions";

const MediaItem = ({ item, index }: { item: PostMedia; index: number }) => {
    const { pauseAllVideos } = useSelector((state: State) => state.posts);
    const [width, setWidth] = useState(item.type == "video" ? 60 : 100);
    const [height, setHeight] = useState(100);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<any>({});
    const video = useRef(null);
    const dimensions = useWindowDimensions();
    const [visible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (item.type === "image") {
            IMG.getSize(item.url, (w, h) => {
                setWidth(100);
                // const newH = (100 * h) / w;

                setHeight(100);
            });
        } else {
            dispatch(pauseAll());
        }

    }, []);
    useEffect(() => {
        if (visible && item.type === "video") {
            // setHeight(dimensions.height - spaces.xSpace);
            // setWidth(dimensions.width - spaces.xSpace)
        }
    }, [visible]);

    useEffect(() => {
        if (status.isPlaying) video.current.pauseAsync();
    }, [pauseAllVideos]);

    return (
        <HStack justifyContent={"center"}>
            <Pressable onPress={() => setIsVisible(true)}>

                {item.type === "image" ? (
                    <>
                        <Image
                            borderRadius={5}
                            onLoadEnd={() => setLoading(false)}
                            h={loading ? 0 : height}
                            w={loading ? 0 : width}
                            resizeMode="cover"
                            alt={`Processing media...`}
                            source={{ uri: item.url }}
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
                    <>
                        <Video
                            ref={video}
                            resizeMode={ResizeMode.CONTAIN}
                            source={{
                                uri: item.url
                            }}
                            onReadyForDisplay={(response: any) => {
                                if (status.isLoaded) {
                                    const newW =
                                        (height * response.naturalSize.width) /
                                        response.naturalSize.height;
                                    setWidth(newW);
                                }
                            }}
                            style={{ maxWidth: 100, width: !loading ? width : 0, height: !loading ? height : 0 }}
                            useNativeControls={false}
                            onPlaybackStatusUpdate={(status) => {
                                if (status["isBuffering"] !== undefined && status['isBuffering'] === false) {
                                    setLoading(false);
                                }
                                // if (status["isBuffering"] !== undefined && status['isBuffering'] == true) {
                                //     setLoading(true);

                                // }

                                setStatus(() => status);
                            }}
                        />
                        {loading ?
                            <Skeleton
                                borderRadius={5}
                                h={height} w={width}
                                startColor={colors.skeletonDim} />
                            : null
                        }
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
                                size={"8"}
                                style={{
                                    transform: [
                                        { translateX: (width) - (width * .8) },
                                        { translateY: height / -2 - 16 },
                                    ],
                                }}
                                as={MaterialIcons}
                                name={status.isPlaying ? "pause" : "play-arrow"}
                            />
                        </Pressable>

                    </>
                )}
            </Pressable>
            {
                item.type === "image" ?
                    <ImageView
                        images={[{ uri: item.url }]}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                    />
                    : null
            }
        </HStack>
    );
};

export default MediaItem