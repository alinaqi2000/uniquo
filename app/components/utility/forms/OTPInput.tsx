import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  IInputProps,
  FormControl,
  IFormControlProps,
  HStack,
  View,
  Pressable,
  VStack,
} from "native-base";
import colors from "../../../config/colors";
import { useWindowDimensions } from "react-native";

interface InputProps extends IFormControlProps {
  helperText?: string;
  errorText?: string;
  value: string;
  formikForm: { form: any; key: string };
}
export default function OTPInput(props: InputProps) {
  const { width } = useWindowDimensions();
  const [inpValues, setInpValues] = useState([]);
  const [output, setOutput] = useState("");
  const inpEl = useRef<HTMLInputElement>();
  var size = width / 5 - 25;

  const changeText = (text) => {
    var regex = /^\d*$/;
    if (regex.test(text)) {
      if (text.length <= 5) {
        props.formikForm.form.setValues({ [props.formikForm.key]: text });
        setOutput(text);
        setInpValues(text.split(""));
      }
    }
  };
  useEffect(() => {
    setOutput(props.value);
    setInpValues(props.value.split(""));
  }, [props.value]);

  return (
    <>
      <View
        w={width - 30}
        h={20}
        opacity={0}
        zIndex={2}
        position={"absolute"}
      >
        <Input
          isFocused={true}
          value={props.value}
          onChangeText={(text) => changeText(text)}
          onBlur={(text) => changeText(text)}
          keyboardType="number-pad"
          ref={inpEl}
          focusOutlineColor={colors.primaryBg}
        />
      </View>
      <FormControl {...props}>
        <HStack space={3} justifyContent={"center"}>
          {[1, 2, 3, 4, 5].map((inp, index) => (
            <Pressable
              onPress={() => {
                console.log("pressed");

                inpEl.current.focus();
              }}
              key={`inp-${index}`}
            >
              <Input
                w={size}
                h={size}
                readOnly={true}
                value={inpValues[index]}
                borderRadius={100}
                isFocused={index === output.length}
                textAlign={"center"}
                fontSize={16}
                onChangeText={(text) => changeText(text)}
                borderColor={colors.inputPlaceholder}
                placeholderTextColor={colors.inputPlaceholder}
              />
            </Pressable>
          ))}
        </HStack>

        <VStack alignItems={"center"} mt={2}>
          {props.helperText ? (
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
              {props.helperText}
            </FormControl.HelperText>
          ) : null}
          {props.errorText ? (
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              {props.errorText}
            </FormControl.ErrorMessage>
          ) : null}
        </VStack>
      </FormControl>
    </>
  );
}
