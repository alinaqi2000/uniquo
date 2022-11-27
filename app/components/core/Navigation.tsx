import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/dashboard/HomeScreen";
import Onboarding01Screen from "../../screens/onboarding/Onboarding01Screen";
import { navigationOptions } from "../../config/navigationOptions";
import Onboarding02Screen from "../../screens/onboarding/Onboarding02Screen";
import Onboarding03Screen from "../../screens/onboarding/Onboarding03Screen";
import Components from "../../screens/utility/Components";
import { useSelector } from "react-redux";
import { State } from "../../store";
import LoginScreen from "../../screens/auth/LoginScreen";
import AuthService from "../../services/AuthService";
import CompetitionScreen from "../../screens/competitions/CompetitionScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const app = useSelector((state: State) => state.app);

  if (app.firstTime)
    return (
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Onboarding01"
          component={Onboarding01Screen}
          options={{ ...navigationOptions, headerShown: false }}
        />

        <Stack.Screen
          name="Onboarding02"
          component={Onboarding02Screen}
          options={{ ...navigationOptions, headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding03"
          component={Onboarding03Screen}
          options={{ ...navigationOptions, headerShown: false }}
        />
      </Stack.Navigator>
    );

  if (!app.user)
    return (
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ ...navigationOptions, headerShown: false }}
        />
      </Stack.Navigator>
    );

  if (app.user)
    return (
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            ...navigationOptions,
            headerShown: false,
            animation: "default",
          }}
        />
        <Stack.Screen
          name="CompetitionsFeed"
          component={CompetitionScreen}
          options={({ route }: any) => ({
            ...navigationOptions,
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="Components"
          component={Components}
          options={{ ...navigationOptions, headerShown: false }}
        />
      </Stack.Navigator>
    );
}
