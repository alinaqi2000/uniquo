import {
  Actionsheet,
  HStack,
  IActionsheetItemProps,
  IIconProps,
  ITextProps,
  Icon,
  Text,
} from "native-base";
import colors from "../../../../config/colors";
import { Feather } from "@expo/vector-icons";
import { styles } from "../../../../config/styles";

interface ActionItemProps extends IActionsheetItemProps {
  text: string;
  icon?: string;
  _text?: ITextProps;
  _icon?: IIconProps;
}

export default function ActionItem({
  text,
  icon,
  _text,
  _icon,
  onPress,
}: ActionItemProps) {
  return (
    <Actionsheet.Item
      bg={colors.primaryBg}
      {...styles.rippleStyles}
      onPress={onPress}
    >
      <HStack justifyContent={"flex-start"} alignItems={"center"} space={6}>
        {icon ? (
          <Icon
            as={Feather}
            color={colors.dimTextColor}
            name={icon}
            size="sm"
            {..._icon}
          />
        ) : null}
        <Text {..._text}>{text}</Text>
      </HStack>
    </Actionsheet.Item>
  );
}
