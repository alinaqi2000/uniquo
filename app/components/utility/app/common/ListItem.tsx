import { ITextProps, Text } from "native-base";

interface Props extends ITextProps {
  text: string;
}
export default function ListItem(props: Props) {
  return (
    <Text {...props}>
      {"\u2022"} {props.text}
    </Text>
  );
}
