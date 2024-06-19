import React, { useEffect, useRef, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import {
  AlertDialog,
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { BackHandler, useWindowDimensions } from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Competition } from "../../models/Competition";
import RequestService from "../../services/RequestService";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { toggleLoading } from "../../store/app/app.actions";
import { useDispatch } from "react-redux";
import UtilService from "../../services/UtilService";
import PostTextInput from "../../components/utility/forms/PostTextInput";
import TertiaryToneButton from "../../components/utility/buttons/TertiaryToneButton";
import PrimaryOutlineButton from "../../components/utility/buttons/PrimaryOutlineButton";
import spaces from "../../config/spaces";
import { Post } from "../../models/Post";
import { setFeedCompetitions } from "../../store/competitions/competitions.actions";
import UIService from "../../services/UIService";
import PrimaryIconButton from "../../components/utility/buttons/PrimaryIconButton";
import * as ImagePicker from "expo-image-picker";
import UploadMedia from "./UploadMedia";
import { PostMedia } from "../../models/PostMedia";
import colors from "../../config/colors";
import ListItem from "../../components/utility/app/common/ListItem";

interface CreatePostForm {
  description: string;
}
export default function CreatePostScreen({ navigation, route }) {
  const { width, height } = useWindowDimensions();
  const { token } = useSelector((state: State) => state.app);
  const { feed } = useSelector((state: State) => state.competitions);
  const [pickerAssets, setPickerAssets] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const { competition, post }: { competition: Competition; post: Post | null } =
    route.params;
  const [stateCompetition, setStateCompetition] = useState(competition);
  const [statePost, setStatePost] = useState(post);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const cancelRef = useRef(null);
  const publishRef = useRef(null);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    description: Yup.string().max(
      500,
      "Text should not contain more than 500 characters."
    ),
  });

  const pF = useFormik<CreatePostForm>({
    initialValues: {
      description: statePost ? statePost.description : "",
    },
    validationSchema,
    onSubmit: () => publishPost(),
  });

  useEffect(() => {
    const findCompetition = feed.find((c) => c.id == competition.id);
    if (statePost) {
      const findPost = findCompetition.myDraftPosts.find((p) => p.id == statePost.id);

      setStatePost(findPost);
    }
    setStateCompetition(findCompetition);
  }, [feed]);

  useEffect(() => {
    const hardwareBackPressListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => handleCancel()
    );
    return () => {
      hardwareBackPressListener.remove();
    };
  }, [pF.values]);


  const handleCancel = () => {

    if (cancelOpen) {
      setCancelOpen(false);
      return true;
    }
    if (!cancelOpen) {
      if (!statePost && pF.values.description) {
        setCancelOpen(true);
        return true;
      }
      if (statePost && pF.values.description !== statePost.description) {
        setCancelOpen(true);
        return true;
      }

    }
    return false;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });


    if (!result.canceled) {

      setPickerAssets([
        ...pickerAssets,
        ...result.assets
      ]);
    }
  };

  const saveDraft = async () => {
    if (pF.isValid) {
      var url = `posts_text/${competition.id}/draft`;
      if (statePost) {
        url = `posts/${competition.id}/update/${statePost.id}?_method=PUT`;
      }

      dispatch(toggleLoading());
      const response = await RequestService.post(
        url,
        { description: pF.values.description },
        token,
        pF
      ).finally(() => dispatch(toggleLoading()));

      if (response.error_type === "validation") {
        return UIService.showErrorToast(response.messages.error);
      }

      if (!response.error_type) {
        if (statePost) {
          putPostInCompetition(Competition.fromData(response.data))
        } else {
          putPostInCompetition(Post.fromData(response.data))
        }
        UIService.showSuccessToast("Post saved in draft.");

        // if (statePost) {
        return navigation.goBack();
        // }

        // return navigation.replace("Detail&ParticipateCompetition", {
        //   competition,
        // });

      }
    }
  };
  const putPostInCompetition = (p: Post | Competition) => {
    var tempCompetition = competition;
    if (p instanceof Post) {
      if (statePost) {
        const postIndex = tempCompetition.myDraftPosts.findIndex((p) => p.id == statePost.id);
        if (postIndex === -1) {
          tempCompetition.myDraftPosts.push(p);
        } else {
          tempCompetition.myDraftPosts[postIndex] = p
        }
      } else {
        setStatePost(p);

        if (tempCompetition.myDraftPosts && tempCompetition.myDraftPosts.length) {
          tempCompetition.myDraftPosts.push(p);
        } else {
          tempCompetition.myDraftPosts = [p]
        }
      }

    } else {
      tempCompetition = { ...p };
    }

    const updatedCompetitions = UtilService.updateObject(
      feed,
      "id",
      competition.id,
      tempCompetition
    );

    dispatch(setFeedCompetitions(updatedCompetitions));

  }

  const deleteMedia = async (mItem: PostMedia) => {
    dispatch(toggleLoading());

    const response = await RequestService.delete(
      "posts/" + competition.id + "/delete_media/" + mItem.id,
      token
    ).finally(() => dispatch(toggleLoading()));

    if (!response.error_type) {
      var tempCompetition = competition;

      const postIndex = tempCompetition.myDraftPosts.findIndex((p) => p.id === post.id);
      if (postIndex !== -1) {

        const mediaIndex = tempCompetition.myDraftPosts[postIndex].media.findIndex((m) => m.id === mItem.id);
        if (mediaIndex !== -1) {
          tempCompetition.myDraftPosts[postIndex].media.splice(mediaIndex, 1);
        }

      }

      const updatedCompetitions = UtilService.updateObject(
        feed,
        "id",
        competition.id,
        tempCompetition
      );

      dispatch(setFeedCompetitions(updatedCompetitions));

      UIService.showSuccessToast("Media deleted from draft.");
    }
  };


  const publishPost = async () => {
    dispatch(toggleLoading());

    const response = await RequestService.patch(
      "posts/" + competition.id + "/publish/" + statePost.id, {},
      token
    ).finally(() => dispatch(toggleLoading()));

    if (!response.error_type) {

      putPostInCompetition(Competition.fromData(response.data))

      UIService.showSuccessToast("Post published for approval. Wait for Uniquo to approve it.", "Post Published!");

      return navigation.goBack();
    }
  };

  return (
    <AppLayout>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={cancelOpen}
        onClose={() => setCancelOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton
            _icon={{ size: 4, color: colors.dimTextColor }}
          />
          <AlertDialog.Header
            bgColor={colors.primaryBg}
            _text={{ color: colors.dimTextColor }}
          >
            Discard Changes?
          </AlertDialog.Header>
          <AlertDialog.Footer bgColor={colors.primaryBg}>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                _text={{ color: "red.400" }}
                onPress={() => navigation.goBack()}
              >
                Discard
              </Button>
              <Button
                _text={{ color: "tertiary.400", fontWeight: "semibold" }}
                onPress={async () => saveDraft()}
                variant="unstyled"
              >
                Save
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <AlertDialog
        leastDestructiveRef={publishRef}
        isOpen={publishOpen}
        onClose={() => setPublishOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton
            _icon={{ size: 4, color: colors.dimTextColor }}
          />
          <AlertDialog.Header
            bgColor={colors.primaryBg}
            _text={{ color: colors.dimTextColor }}
          >
            Publish this draft?
          </AlertDialog.Header>
          <AlertDialog.Body bgColor={colors.boxBg}>
            <VStack space={3}>
              <ListItem fontSize={"xs"} text="The post will be published for organizer's approval." />
              <ListItem fontSize={"xs"} text="You will not be able to make changes afterwards." />
              <ListItem fontSize={"xs"} text="Other drafts will also be deleted." />
            </VStack>
          </AlertDialog.Body>
          <AlertDialog.Footer bgColor={colors.primaryBg}>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                _text={{ color: "red.400" }}
                onPress={() => setPublishOpen(false)}
              >
                Cancel
              </Button>
              <Button
                _text={{ color: "tertiary.400", fontWeight: "semibold" }}
                onPress={async () => {
                  setPublishOpen(false)
                  publishPost()
                }}
                variant="unstyled"
              >
                Publish
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>


      <View flex={1} w={"100%"} justifyContent={"space-between"} h={height}>
        <Box>
          <PostTextInput
            w="100%"
            errorText={pF.errors.description}
            isInvalid={pF.errors.description && pF.touched.description}
            input={{
              placeholder: "Share your uniqueness...",
              value: pF.values.description,
              onChangeText: pF.handleChange("description"),
              onBlur: pF.handleBlur("description"),
            }}
          />
        </Box>
        <ScrollView>
          <VStack mx={spaces.xSpace} mt={"5"} space={5}>
            <PrimaryIconButton
              icon="camera-outline"
              disabled={statePost && statePost.media.length >= 3}
              title={(statePost ? statePost.media.length : 0) + "/3 Add Media"}
              onPress={pickImage}
            />
            {
              statePost &&
              statePost.media.map((mediaItem, idx) => <UploadMedia
                deleteMedia={deleteMedia}
                key={`item-${idx}`}
                mediaItem={mediaItem}
              />)
            }
            {pickerAssets.map((asset, idx) => <UploadMedia
              key={`media-${idx}`}
              setPost={(p) => {
                putPostInCompetition(p)
                setPickerAssets([])
              }}
              pickerAsset={asset} uploadUrl={`posts_${asset.type}/${stateCompetition.id}/draft${statePost ? `/${statePost.id}` : ""}`}
            />)}
          </VStack>
        </ScrollView>

        <HStack my={5} w={width} justifyContent={"center"} space={10}>
          <PrimaryOutlineButton
            minW={"35%"}
            title={statePost ? "Update Draft" : "Save Draft"}
            onPress={() => saveDraft()}
          />
          <TertiaryToneButton _disabled={{ backgroundColor: colors.dimBorder }} disabled={!(statePost && statePost.media.length)} minW={"45%"} title="Publish For Approval" onPress={() => {
            if (statePost && pF.values.description !== statePost.description) {
              setCancelOpen(true);
              return true;
            }
            setPublishOpen(true)
          }} />
        </HStack>
      </View>
    </AppLayout>
  );
}
