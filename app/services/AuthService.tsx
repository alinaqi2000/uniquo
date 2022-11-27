// import { useNavigation } from "@react-navigation/native";
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../store";

export default function AuthService({ children }) {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.name);
  const { user, isAuth, authenticating } = useSelector(
    (state: State) => state.app
  );

  useEffect(() => {
    verifyAuth();
    return () => {};
  }, [user]);

  const verifyAuth = async () => {
    console.log(route.name);
  };

  return <>{children(user, isAuth, authenticating)}</>;
}
