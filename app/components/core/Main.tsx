import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/app/app.actions";
import HomeScreen from "../../screens/dashboard/HomeScreen";
import Onboarding01Screen from "../../screens/onboarding/Onboarding01Screen";
import { navigationOptions } from "../../config/navigationOptions";
import Onboarding02Screen from "../../screens/onboarding/Onboarding02Screen";
import Onboarding03Screen from "../../screens/onboarding/Onboarding03Screen";
import Components from "../../screens/utility/Components";

const Stack = createNativeStackNavigator();

interface Props {
  token: string;
}
export default function Main({ token }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("got Token ", token);

    dispatch(addToken(token));
  }, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Components"
          component={Components}
          options={navigationOptions}
        />
        <Stack.Screen
          name="Onboarding01"
          component={Onboarding01Screen}
          options={navigationOptions}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding02"
          component={Onboarding02Screen}
          options={navigationOptions}
        />
        <Stack.Screen
          name="Onboarding03"
          component={Onboarding03Screen}
          options={navigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
