import { HStack, Image, Skeleton } from "native-base";
import { useState, useEffect } from "react";
import { PostMedia } from "../../../../models/PostMedia";
import { Image as IMG } from "react-native";
import colors from "../../../../config/colors";

const MediaItem = ({ item, index }: { item: PostMedia; index: number }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        IMG.getSize(item.url, (w, h) => {
            setWidth(100);
            // const newH = (100 * h) / w;

            setHeight(100);
        });
    }, []);

    return (
        <HStack justifyContent={"center"}>
            {item.type == "image" ? (
                <>
                    <Image
                        borderRadius={5}
                        onLoadEnd={() => setLoading(false)}
                        h={loading ? 0 : height}
                        w={loading ? 0 : width}
                        resizeMode="cover"
                        alt={`${item.id}`}
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
                <></>
            )}
        </HStack>
    );
};

export default MediaItem