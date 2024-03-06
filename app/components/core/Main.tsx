import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToken,
  setFirstTime,
  toggleLoading,
} from "../../store/app/app.actions";
import Navigation from "./Navigation";
import LoadingSpinner from "../utility/ui/LoadingSpinner";
import FlashMessage from "react-native-flash-message";

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
    dispatch(toggleLoading());
  }, []);

  useEffect(() => {
    dispatch(setFirstTime(firstTime));
  }, [firstTime]);
  return (
    <>
      <LoadingSpinner />
      <FlashMessage />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
}
