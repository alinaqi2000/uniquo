import { MaterialIcons } from "@expo/vector-icons";
import {
  VStack,
  Box,
  HStack,
  Icon,
  Checkbox,
  Text,
  Pressable,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import FormDateTimePicker from "../../../components/utility/forms/FormDateTimePicker";
import FormInput from "../../../components/utility/forms/FormInput";
import FormTextArea from "../../../components/utility/forms/FormTextArea";
import colors from "../../../config/colors";
import { FormikProps } from "formik";
import { DraftCompetition } from "../../../models/form/DraftCompetition";

interface CompetitionFormProps {
  form: FormikProps<DraftCompetition>;
  onOpenCategories: () => void;
}
export default function CompetitionForm({
  form,
  onOpenCategories,
}: CompetitionFormProps) {
  const { width } = useWindowDimensions();
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    return () => {
      form.setValues({ ...new DraftCompetition() });
    };
  }, []);
  useEffect(() => {
    setPaid(form.values.entry_fee !== "0");
  }, [form.values.entry_fee]);
  return (
    <VStack alignItems={"center"} px={5}>
      <VStack mt={5} space={3} w="100%">
        <Box>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text>Category</Text>
            <Pressable onPress={onOpenCategories} w={width / 2}>
              <FormInput
                isRequired
                maxW={width / 2}
                errorText={form.errors.category_title}
                isInvalid={
                  form.errors.category_title && form.touched.category_title
                }
                input={{
                  size: "sm",
                  borderWidth: 0,
                  // borderBottomWidth: 1,
                  py: 1,
                  boxSize: "1/2",
                  textAlign: "right",
                  readOnly: true,
                  placeholder: "Select Category",
                  InputRightElement: (
                    <Icon
                      as={<MaterialIcons name={"edit"} />}
                      size={4}
                      mr="2"
                      color={colors.primaryColor}
                    />
                  ),
                  value: form.values.category_title,
                }}
              />
            </Pressable>
          </HStack>
        </Box>

        <Box>
          <FormInput
            isRequired
            w="100%"
            errorText={form.errors.title}
            isInvalid={form.errors.title && form.touched.title}
            input={{
              placeholder: "Title",
              value: form.values.title,
              onChangeText: form.handleChange("title"),
              onBlur: form.handleBlur("title"),
            }}
          />
        </Box>
        {form.values._id ? (
          <Box>
            <FormInput
              isRequired
              w="100%"
              errorText={form.errors.slug}
              isInvalid={form.errors.slug && form.touched.slug}
              icon="hash"
              input={{
                placeholder: "Hashtag",
                value: form.values.slug,
                onChangeText: form.handleChange("slug"),
                onBlur: form.handleBlur("slug"),
              }}
            />
          </Box>
        ) : null}
        <Box>
          <FormTextArea
            isRequired
            w="100%"
            errorText={form.errors.description}
            isInvalid={form.errors.description && form.touched.description}
            input={{
              size: "xs",
              py: 1.5,
              placeholder: "Description",
              value: form.values.description,
              onChangeText: form.handleChange("description"),
              onBlur: form.handleBlur("description"),
            }}
          />
        </Box>

        <Box h={50} justifyContent={"center"}>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Checkbox
              value={"1"}
              isChecked={paid}
              onChange={() => {
                setPaid(!paid);
                form.setFieldValue("entry_fee", "0");
              }}
              colorScheme={"tertiary"}
            >
              Paid
            </Checkbox>
            {paid && (
              <FormInput
                isRequired
                maxW={125}
                errorText={form.errors.entry_fee}
                isInvalid={form.errors.entry_fee && form.touched.entry_fee}
                input={{
                  size: "xs",
                  py: 1,
                  placeholder: "Entry Fee (Rs.)",
                  value: form.values.entry_fee,
                  keyboardType: "decimal-pad",
                  onChangeText: form.handleChange("entry_fee"),
                  onBlur: form.handleBlur("entry_fee"),
                }}
              />
            )}
          </HStack>
        </Box>
        <Box>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text>Prize Money</Text>
            <FormInput
              isRequired
              maxW={125}
              errorText={form.errors.prize_money}
              isInvalid={form.errors.prize_money && form.touched.prize_money}
              input={{
                size: "xs",
                py: 1,
                boxSize: "1/2",
                placeholder: "Prize Money (Rs.)",
                value: form.values.prize_money,
                keyboardType: "decimal-pad",
                onChangeText: form.handleChange("prize_money"),
                onBlur: form.handleBlur("prize_money"),
              }}
            />
          </HStack>
        </Box>
        <Box>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text>Participants</Text>
            <FormInput
              isRequired
              maxW={125}
              errorText={form.errors.participants_allowed}
              isInvalid={
                form.errors.participants_allowed &&
                form.touched.participants_allowed
              }
              input={{
                size: "xs",
                py: 1,
                boxSize: "1/2",
                placeholder: "(100, 200, etc)",
                value: form.values.participants_allowed,
                keyboardType: "decimal-pad",
                onChangeText: form.handleChange("participants_allowed"),
                onBlur: form.handleBlur("participants_allowed"),
              }}
            />
          </HStack>
        </Box>
        <Box>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text>Voting Start</Text>
            <FormDateTimePicker
              errorText={form.errors.voting_start_at}
              defaultValue={form.values.voting_start_at}
              isRequired
              time={true}
              maxW={180}
              isInvalid={
                form.errors.voting_start_at && form.touched.voting_start_at
              }
              input={{ fontSize: "xs", py: 1 }}
              picker={{}}
              formikForm={{ form: form, key: "voting_start_at" }}
            />
          </HStack>
        </Box>
        <Box>
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Text>Announcement</Text>
            <FormDateTimePicker
              errorText={form.errors.announcement_at}
              defaultValue={form.values.announcement_at}
              isRequired
              time={true}
              maxW={180}
              isInvalid={
                form.errors.announcement_at && form.touched.announcement_at
              }
              input={{ fontSize: "xs", py: 1 }}
              picker={{}}
              formikForm={{ form: form, key: "announcement_at" }}
            />
          </HStack>
        </Box>
      </VStack>
    </VStack>
  );
}
