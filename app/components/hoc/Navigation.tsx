import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding01 from "../../screens/onboarding/Onboarding01Screen";
import Home from "../../screens/dashboard/HomeScreen";
import Components from "../../screens/utility/Components";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="/" component={Components} />
        <Stack.Screen name="Onboarding01" component={Onboarding01} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
