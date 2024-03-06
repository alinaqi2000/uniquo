// import { useNavigation } from "@react-navigation/native";
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../store";
import RequestService from "./RequestService";
import { useDispatch } from "react-redux";
import { addToken, setAuth, setUser } from "../store/app/app.actions";
import { AuthUser } from "../models/AuthUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthService({ children }) {
  const navigation = useNavigation();
  // const route = useRoute();
  const dispatch = useDispatch();
  const { user, token, isAuth, authenticating } = useSelector(
    (state: State) => state.app
  );

  useEffect(() => {
    verifyAuth();
  }, []);
  const verifyAuth = async () => {
    const response = await RequestService.post("verify_token", {}, token);

    if (response.error_type) {
      dispatch(setUser(null));
      dispatch(setAuth(false));
      dispatch(addToken(""));
      await AsyncStorage.setItem("user", "");
      await AsyncStorage.setItem("token", JSON.stringify(""));
    }
    if (!response.error_type) {
      dispatch(setAuth(true));

      dispatch(
        setUser(
          new AuthUser(
            response.data.user.full_name,
            response.data.user.email,
            response.data.user.username,
            response.data.user.avatar,
            response.data.user.phone_code,
            response.data.user.phone_no,
            response.data.user.balance,
            response.data.user.auth_provider
          )
        )
      );
    }
  };

  return <>{children(user, isAuth, authenticating)}</>;
}
