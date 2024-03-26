import { View, Text } from "react-native";
import React, { useEffect } from "react";
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
import CompetitionScreen from "../../screens/competitions/CompetitionFeedScreen";
import SettingScreen from "../../screens/setting/SettingScreen";
import NotificationScreen from "../../screens/dashboard/NotificationScreen";
import PostsScreen from "../../screens/posts/PostsScreen";
import { Icon, Pressable } from "native-base";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import MyPostsScreen from "../../screens/posts/MyPostsScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import EmailVerificationScreen from "../../screens/auth/EmailVerificationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addToken, setUser } from "../../store/app/app.actions";
import { useDispatch } from "react-redux";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import ForgotPasswordVerificationScreen from "../../screens/auth/ForgotPasswordVerificationScreen";
import PasswordResetScreen from "../../screens/auth/PasswordResetScreen";
import OrganizeCompetitionScreen from "../../screens/competitions/organize/OrganizeCompetitionScreen";
import MyCompetitionsScreen from "../../screens/competitions/MyCompetitionsScreen";
import ProcessCompetitionPaymentScreen from "../../screens/competitions/organize/ProcessCompetitionPaymentScreen";
import CardPaymentModal from "../../screens/competitions/organize/CardPaymentModal";
import PaymentSuccessModal from "../../screens/competitions/organize/PaymentSuccessModal";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const app = useSelector((state: State) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    async function get() {
      try {
        const token = JSON.parse(await AsyncStorage.getItem("token"));
        if (token) dispatch(addToken(token));

        const user = JSON.parse(await AsyncStorage.getItem("user"));
        if (user) dispatch(setUser(user));
      } catch (e) {}
    }
    get();
  }, []);

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
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ ...navigationOptions, headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerificationScreen}
          options={{ ...navigationOptions, headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ ...navigationOptions, headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordVerification"
          component={ForgotPasswordVerificationScreen}
          options={{ ...navigationOptions, headerShown: false }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordResetScreen}
          options={{ ...navigationOptions, headerShown: false }}
        />
      </Stack.Navigator>
    );
  return (
    <AuthService>
      {(user, isAuth, authenticating) => {
        if (user)
          return (
            <Stack.Navigator
              screenOptions={{
                animation: "fade_from_bottom",
              }}
            >
              {/* <Stack.Screen
                name="Components"
                component={Components}
                options={{ ...navigationOptions, headerShown: false }}
              /> */}
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
                name="OrganizeCompetition"
                component={OrganizeCompetitionScreen}
                options={({ route }: any) => ({
                  ...navigationOptions,
                  title: route.params?.title || "Organize Competition",
                })}
              />
              <Stack.Screen
                name="Detail&ProcessCompetitionPayment"
                component={ProcessCompetitionPaymentScreen}
                options={({ route }: any) => ({
                  ...navigationOptions,
                  title: route.params?.title || "Process Payment",
                })}
              />
              <Stack.Group
                screenOptions={{
                  presentation: "transparentModal",
                  headerShown: false,
                }}
              >
                <Stack.Screen name="CardPayment" component={CardPaymentModal} />
                <Stack.Screen
                  name="PaymentSuccess"
                  options={{
                    animation: "slide_from_right",
                    animationDuration: 50,
                  }}
                  component={PaymentSuccessModal}
                />
              </Stack.Group>

              <Stack.Screen
                name="CompetitionsFeed"
                component={CompetitionScreen}
                options={({ route }: any) => ({
                  ...navigationOptions,
                  title: route.params.title,
                })}
              />
              <Stack.Screen
                name="MyCompetitions"
                component={MyCompetitionsScreen}
                options={({ route }: any) => ({
                  ...navigationOptions,
                  title: route.params?.title || "My Competitions",
                })}
              />
              <Stack.Screen
                name="PostsFeed"
                component={PostsScreen}
                options={({ route }: any) => ({
                  ...navigationOptions,
                  headerTitleAlign: "center",
                  title: "#" + route.params.title,
                  // headerRight: () => (
                  //   <Pressable onPress={() => alert("This is a button!")}>
                  //     <Icon />
                  //   </Pressable>
                  // ),
                })}
              />
              <Stack.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                  ...navigationOptions,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  ...navigationOptions,
                  // headerShown: false,
                  title: "",
                }}
              />
              <Stack.Screen
                name="MyPosts"
                component={MyPostsScreen}
                options={{
                  ...navigationOptions,
                  // headerShown: false,
                  title: "",
                }}
              />

              <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                  ...navigationOptions,
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          );
      }}
    </AuthService>
  );
}
