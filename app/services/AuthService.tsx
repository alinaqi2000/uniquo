// import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function AuthService({ children }: { children: JSX.Element }) {
//   const navigation = useNavigation();

  useEffect(() => {
    verifyAuth();
    return () => {};
  }, []);

  const verifyAuth = async () => {
    // navigation.navigate("Onboarding01", {});
  };

  return children;
}
