import RnSpinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { State } from "../../../store";
import colors from "../../../config/colors";
import { Spinner } from "native-base";

export default function LoadingSpinner() {
  const { loading } = useSelector((state: State) => state.app);
  return (
    <RnSpinner
      visible={loading}
      textContent={"Loading..."}
      overlayColor={"rgba(0, 0, 0, 0.4)"}
      customIndicator={<Spinner color={colors.dimTextColor} size={"lg"} />}
      textStyle={{ color: colors.dimTextColor }}
    />
  );
}
