import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToken, setFirstTime } from "../../store/app/app.actions";
import Navigation from "./Navigation";

interface Props {
  token: string;
  firstTime: boolean;
}
export default function Main({ token, firstTime }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToken(token));
  }, [token]);

  useEffect(() => {
    dispatch(setFirstTime(firstTime));
  }, [firstTime]);
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
