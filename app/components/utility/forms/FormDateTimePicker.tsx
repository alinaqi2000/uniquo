import React, { useEffect, useState } from "react";
import {
  Input,
  IInputProps,
  FormControl,
  IFormControlProps,
  Icon,
} from "native-base";
import colors from "../../../config/colors";
import { Pressable } from "react-native";
import UtilService from "../../../services/UtilService";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface InputProps extends IFormControlProps {
  helperText?: string;
  errorText?: string;
  defaultValue?: any;
  time: boolean;
  input: IInputProps;
  picker: any;
  formikForm: { form: any; key: string };
}
export default function FormDateTimePicker(props: InputProps) {
  let defaultDateValue = `${UtilService.convertDisplayTimeFormat(
    props.defaultValue || new Date()
  )} | ${UtilService.convertDisplayDateFormat(
    props.defaultValue || new Date()
  )}`;

  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayInp] = useState(defaultDateValue);

  useEffect(() => {
    setDisplayInp(
      `${UtilService.convertDisplayTimeFormat(
        props.defaultValue
      )} | ${UtilService.convertDisplayDateFormat(props.defaultValue)}`
    );
  }, [props.defaultValue]);

  const handleConfirm = (date) => {
    setDisplayInp(
      `${UtilService.convertDisplayTimeFormat(
        date
      )} | ${UtilService.convertDisplayDateFormat(date)}`
    );

    props.formikForm.form.setValues({
      ...props.formikForm.form.values,
      // [props.formikForm.key]: `${UtilService.convertDateTimeFormat(date)}`,
      [props.formikForm.key]: `${date}`,
    });
    setOpen(false);
  };

  return (
    <FormControl {...props}>
      <DateTimePickerModal
        isVisible={open}
        mode="datetime"
        minuteInterval={30}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
      <Pressable onPress={() => setOpen(true)}>
        <Input
          borderColor={colors.inputBorder}
          readOnly
          placeholderTextColor={colors.inputPlaceholder}
          value={displayValue}
          {...props.input}
          pl={2}
          textAlign={"right"}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="date-range" />}
              size={4}
              ml={2}
              color={colors.dimTextColor}
            />
          }
          placeholder="Name"
        />
      </Pressable>
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
    </FormControl>
  );
}
