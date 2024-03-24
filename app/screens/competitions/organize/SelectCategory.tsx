import {
  Box,
  Button,
  Card,
  FlatList,
  HStack,
  Icon,
  Popover,
  Pressable,
  ScrollView,
  Text,
  Tooltip,
  VStack,
} from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import RequestService from "../../../services/RequestService";
import { useDispatch } from "react-redux";
import { setCategories } from "../../../store/competitions/competitions.actions";
import spaces from "../../../config/spaces";
import colors from "../../../config/colors";
import { Category } from "../../../models/Category";
import CategoryItem from "../../../components/utility/app/CategoryItem";
import { useWindowDimensions } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import FormInput from "../../../components/utility/forms/FormInput";
import UtilService from "../../../services/UtilService";
import UserAvatar from "../../../components/utility/images/UserAvatar";
import Lottie from "../../../components/utility/animated/Lottie";
import OutlineButton from "../../../components/utility/buttons/OutlineButton";
import TertiaryToneButton from "../../../components/utility/buttons/TertiaryToneButton";
import { styles } from "../../../config/styles";

const CATEGORIES_CHUNK_SIZE = 3;

interface Props {
  onClose: () => void;
  form: any;
}
export default function SelectCategory(props: Props) {
  const { categories } = useSelector((state: State) => state.competitions);
  const { token, user } = useSelector((state: State) => state.app);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [myCategories, setMyCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [otherCategories, setOtherCategories] = useState([]);
  const [searchInp, setSearchInp] = useState("");

  useEffect(() => {
    fetchCategories();
    return () => {
      dispatch(setCategories([]));
    };
  }, []);

  useEffect(() => {
    generateChunks(UtilService.searchItems(categories, searchInp, ["title"]));
  }, [searchInp]);

  useEffect(() => {
    generateChunks(categories);
  }, [categories]);

  const fetchCategories = async () => {
    setLoading(true);
    const responses = await Promise.all([
      // RequestService.get("categories", token),
      RequestService.get("user_categories", token),
    ]).catch(() => props.onClose());

    if (Array.isArray(responses)) {
      const responseCategories = [];
      responses.forEach((res) => {
        if (!res.error_type) {
          responseCategories.push(...res.data);
        } else {
          props.onClose();
        }
      });

      dispatch(setCategories(responseCategories));
      setLoading(false);
    }
  };

  const generateChunks = (cats: Category[]) => {
    const chunked_my_categories = makeChunks(
      cats.filter(
        (cat) => cat.suggested_by && cat.suggested_by.username == user.username
      )
    );
    const chunked_other_categories = makeChunks(
      cats.filter(
        (cat) =>
          cat.suggested_by == null ||
          (cat.suggested_by && cat.suggested_by.username !== user.username)
      )
    );
    setMyCategories(chunked_my_categories);
    setOtherCategories(chunked_other_categories);
  };

  const makeChunks = (items: Category[]) => {
    const chunkedData = [];
    for (let i = 0; i < items.length; i += CATEGORIES_CHUNK_SIZE) {
      chunkedData.push(items.slice(i, i + CATEGORIES_CHUNK_SIZE));
    }
    return chunkedData;
  };
  const initialFocusRef = useRef(null);

  const handlePress = (cat: Category) => {
    props.form.setValues({
      ...props.form.values,
      category_id: cat.id,
      category_title: cat.title,
    });
    props.onClose();
  };

  const requestNewCategory = async () => {
    setRequesting(true);
    const response = await RequestService.post(
      "categories",
      { title: searchInp },
      token
    ).finally(() => setRequesting(false));

    if (!response.error_type) {
      setSearchInp("");
      fetchCategories();
    }
  };
  return (
    <VStack mt={2} ml={spaces.xSpace} space={2}>
      {loading ? (
        <HStack my={6} justifyContent={"center"}>
          <Lottie animation="dots" h={48} w={80} />
        </HStack>
      ) : (
        <>
          <HStack justifyContent={"space-between"}>
            <FormInput
              input={{
                placeholder: "Search categories",
                value: searchInp,
                onChangeText: setSearchInp,
              }}
              w={width / 2}
            />
            <Popover
              initialFocusRef={initialFocusRef}
              trigger={(triggerProps) => {
                return (
                  <Button width={40} variant={"unstyled"} {...triggerProps}>
                    <Icon
                      as={<MaterialIcons name={"info-outline"} />}
                      size={5}
                      color={colors.dimTextColor}
                    />
                  </Button>
                );
              }}
            >
              <Popover.Content borderColor={colors.inputBorder}>
                <Popover.Arrow
                  bgColor={colors.secondaryBg}
                  borderColor={colors.inputBorder}
                />
                <Popover.Header
                  borderColor={colors.inputBorder}
                  bgColor={colors.secondaryBg}
                  _text={{ fontSize: "xs", color: colors.dimTextColor }}
                >
                  Categories Types
                </Popover.Header>
                <Popover.Body
                  borderColor={colors.inputBorder}
                  bgColor={colors.secondaryBg}
                >
                  <VStack space={3}>
                    <HStack alignItems={"center"}>
                      <Icon
                        as={<Feather name={"check-circle"} />}
                        size={3}
                        mr="3"
                        color={"tertiary.400"}
                      />
                      <Text fontSize={"sm"} color={colors.dimTextColor}>
                        Verified
                      </Text>
                    </HStack>
                    <HStack alignItems={"center"}>
                      <Icon
                        as={<Feather name={"check-circle"} />}
                        size={3}
                        mr="3"
                        color={"muted.400"}
                      />
                      <Text fontSize={"sm"} color={colors.dimTextColor}>
                        Not Verified
                      </Text>
                    </HStack>
                  </VStack>
                </Popover.Body>
              </Popover.Content>
            </Popover>
          </HStack>
          {searchInp &&
          myCategories.length == 0 &&
          otherCategories.length == 0 ? (
            <VStack mt={5} space={5} mr={spaces.xSpace}>
              <Text>You can request "{searchInp}" as a new category</Text>
              <TertiaryToneButton
                disabled={requesting}
                title={requesting ? "Requesting..." : "Request Now"}
                onPress={requestNewCategory}
              />
            </VStack>
          ) : null}
          <Box>
            <ScrollView overScrollMode="auto">
              <VStack>
                {myCategories.length ? (
                  <VStack mx={spaces.xSpace * -1}>
                    <HStack alignItems={"baseline"}>
                      <Text
                        fontWeight={"semibold"}
                        color={colors.dimTextColor}
                        my={3}
                        ml={spaces.xSpace}
                        fontSize={"xs"}
                      >
                        MY CATEGORIES
                      </Text>
                      <Box
                        h={1}
                        w={4}
                        ml={1}
                        style={{ transform: [{ translateY: -3 }] }}
                        bg={colors.secondaryColor}
                        opacity={50}
                      />
                    </HStack>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={myCategories}
                      renderItem={({
                        item,
                        index,
                      }: {
                        item: Category[];
                        index: number;
                      }) => (
                        <Box
                          key={`row-${index}`}
                          ml={index == 0 ? spaces.xSpace : 0}
                          mr={spaces.xSpace}
                        >
                          <VStack mr={3} space={1}>
                            {item.map((category, index) => (
                              <CatItem
                                key={`cat-${index}`}
                                onPress={handlePress}
                                category={category}
                                width={width}
                              />
                            ))}
                          </VStack>
                        </Box>
                      )}
                    />
                  </VStack>
                ) : null}
                {otherCategories.length ? (
                  <VStack mt={5} mx={spaces.xSpace * -1}>
                    <HStack alignItems={"baseline"}>
                      <Text
                        fontWeight={"semibold"}
                        color={colors.dimTextColor}
                        my={3}
                        ml={spaces.xSpace}
                        fontSize={"xs"}
                      >
                        All CATEGORIES
                      </Text>
                      <Box
                        h={1}
                        w={4}
                        ml={1}
                        style={{ transform: [{ translateY: -3 }] }}
                        bg={colors.secondaryColor}
                        opacity={50}
                      />
                    </HStack>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={otherCategories}
                      renderItem={({
                        item,
                        index,
                      }: {
                        item: Category[];
                        index: number;
                      }) => (
                        <Box
                          key={`row-${index}`}
                          ml={index == 0 ? spaces.xSpace : 0}
                          mr={spaces.xSpace}
                        >
                          <VStack mr={3} space={1}>
                            {item.map((category, index) => (
                              <CatItem
                                key={`cat-${index}`}
                                onPress={handlePress}
                                category={category}
                                width={width}
                              />
                            ))}
                          </VStack>
                        </Box>
                      )}
                    />
                  </VStack>
                ) : null}
              </VStack>
            </ScrollView>
          </Box>
        </>
      )}
    </VStack>
  );
}
interface CatItemProps {
  category: Category;
  width: number;
  onPress: (cat: Category) => void;
}
function CatItem({ category, width, onPress }: CatItemProps) {
  return (
    <Pressable onPress={() => onPress(category)} {...styles.rippleStyles}>
      <Card w={width / 1.66} shadow={3}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"xs"} color={colors.dimTextColor}>
            {category.title}
          </Text>
          <HStack space={2} justifyContent={"flex-end"} alignItems={"center"}>
            {category.suggested_by ? (
              <UserAvatar
                size={"xs"}
                uri={category.suggested_by.avatar}
                alt={category.suggested_by.username}
              />
            ) : null}
            <Icon
              as={<Feather name={"check-circle"} />}
              size={3}
              mr="2"
              color={category.verified ? "tertiary.400" : "muted.400"}
            />
          </HStack>
        </HStack>
      </Card>
    </Pressable>
  );
}
