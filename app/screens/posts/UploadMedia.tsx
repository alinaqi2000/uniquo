import { Box, HStack, Icon } from "native-base";
import React, { useEffect, useState } from "react";
import ImageView from "react-native-image-viewing";
import { apiConfig } from "../../config/apiConfig";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { ImagePickerAsset } from "expo-image-picker";
import { PostMedia } from "../../models/PostMedia";
import { Post } from "../../models/Post";
import { Competition } from "../../models/Competition";
import MediaItem from "../../components/utility/app/common/MediaItem";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import { Pressable } from "react-native";
import { styles } from "../../config/styles";
import { toggleLoading } from "../../store/app/app.actions";
import { useDispatch } from "react-redux";
import RequestService from "../../services/RequestService";
import CircularProgress from 'react-native-circular-progress-indicator';
import UIService from "../../services/UIService";

interface UploadMediaProps {
    mediaItem?: PostMedia
    uploadUrl?: string;
    pickerAsset?: ImagePickerAsset
    setPost?: (post: Post | Competition) => void
    deleteMedia?: (mediaItem: PostMedia) => void

}
export default function UploadMedia({ mediaItem, uploadUrl, pickerAsset, setPost, deleteMedia }: UploadMediaProps) {
    const { token } = useSelector((state: State) => state.app);
    const [visible, setIsVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(5);
    const [uploadError, setUploadError] = useState(false);

    const [media, setMedia] = useState<PostMedia>(mediaItem ? mediaItem : new PostMedia(0, pickerAsset.type, pickerAsset.uri));
    const dispatch = useDispatch();

    useEffect(() => {
        if (pickerAsset) {
            uploadImage(pickerAsset.uri)
        }
    }, [mediaItem])

    const uploadImage = async (uri) => {
        try {

            const formData = new FormData();
            formData.append("image", {
                uri,
                name: 'image.jpg', // Set a filename
                type: 'image/jpeg', // Set the image type based on URI
            });

            const response = axios.post(apiConfig.apiURL + uploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token,
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log("Upload progress:", progress);
                    setUploadProgress(progress)
                },
            });
            const res = (await response).data

            if (!res.error_type) {
                if (res.data) {
                    setPost(Post.fromData(res.data))
                }
            }
        } catch (error) {
            setUploadError(true);
            UIService.showErrorToast("File could not be uploaded, You can try later.", "Upload Failure!")

        }
    };




    if (media && media.id !== 0) {
        return <Box
            shadow={2}
            backgroundColor={colors.boxBg}
            px={3}
            py={2}
            rounded={15}
            w={"100%"}
        >
            <HStack justifyContent={"space-between"} alignItems={"center"}>
                <HStack alignItems={"center"} space={4}>
                    <Pressable onPress={() => setIsVisible(true)}>
                        <MediaItem
                            index={1}
                            item={mediaItem}
                        />
                    </Pressable>
                    <ImageView
                        images={[{ uri: media.url }]}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                    />
                </HStack>
                <Pressable onPress={() => deleteMedia(mediaItem)}
                    {...styles.rippleStyles}
                >
                    <Box px={5}>
                        <Icon
                            as={MaterialIcons}
                            color={"danger.400"}
                            size={"lg"}
                            name={"delete-outline"}
                        />
                    </Box>
                </Pressable>
            </HStack>
        </Box>
    }

    return (
        <Box
            shadow={2}
            backgroundColor={colors.boxBg}
            px={3}
            py={2}
            rounded={15}
            w={"100%"}
        >
            <HStack justifyContent={"space-between"} alignItems={"center"}>
                <HStack alignItems={"center"} space={4}>
                    <Pressable onPress={() => setIsVisible(true)}>
                        <MediaItem
                            index={1}
                            item={media}
                        />
                    </Pressable>
                    <ImageView
                        images={[{ uri: media.url }]}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                    />
                </HStack>
                <CircularProgress
                    value={uploadError ? 0 : uploadProgress}
                    radius={40}
                    inActiveStrokeOpacity={0.5}
                    activeStrokeWidth={15}
                    inActiveStrokeWidth={20}
                    progressValueStyle={{ fontWeight: '500', color: colors.dimTextColor }}
                    inActiveStrokeColor={uploadError ? "red" : colors.dimTextColor}
                    activeStrokeSecondaryColor={uploadError ? "red" : "green"}
                    activeStrokeColor={uploadError ? "red" : "green"}
                    dashedStrokeConfig={{
                        count: 20,
                        width: 2,
                    }}
                />
                {/* <Pressable onPress={() => deleteMedia(mediaItem)}
                    {...styles.rippleStyles}
                >
                    <Box px={5}>
                        <Icon
                            as={MaterialIcons}
                            color={"danger.400"}
                            size={"lg"}
                            name={"delete-outline"}
                        />
                    </Box>
                </Pressable> */}
            </HStack>
        </Box>);
}
