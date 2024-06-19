import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToken,
  setFirstTime,
  toggleLoading,
} from "../../store/app/app.actions";
import Navigation from "./Navigation";
import LoadingSpinner from "../utility/app/LoadingSpinner";
import FlashMessage from "react-native-flash-message";
import { useConnectionStateListener } from "ably/react";

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
    // dispatch(toggleLoading());
  }, []);

  useEffect(() => {
    dispatch(setFirstTime(firstTime));
  }, [firstTime]);

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });
  useConnectionStateListener("failed", () => {
    console.log("Failed to connect Ably!");
  });

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
