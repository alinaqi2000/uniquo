import React, { useEffect, useState } from "react";
import { FlatList, HStack, Icon, Image, Text, View, VStack } from "native-base";

import { useSelector } from "react-redux";
import { State } from "../../store";
import PostItem from "../../components/utility/app/PostItem";
import { Post } from "../../models/Post";
import Feed from "../../components/layout/AppLayout";
import UserAvatar from "../../components/utility/images/UserAvatar";
import { User } from "../../models/User";
import colors from "../../config/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import spaces from "../../config/spaces";
import { Dimensions, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { SvgXml } from "react-native-svg";
import PostCommentSheet from "../../components/utility/app/PostCommentSheet";
import CompetitionItem from "../../components/utility/app/CompetitionItem";
import { Competition } from "../../models/Competition";
import PostSingleImageItem from "../../components/utility/app/PostSingleImageItem";
import { PostMedia } from "../../models/PostMedia";
import { useDispatch } from "react-redux";
import {
  setFeedPosts,
  setMyPosts,
  setMyVotedPosts,
  setProfileFeedPosts,
  setVotedPosts,
} from "../../store/posts/posts.actions";
import RequestService from "../../services/RequestService";
import { setFeedCompetitions, setProfileFeedCompetitions } from "../../store/competitions/competitions.actions";
import { gifs } from "../../config/assets";

// const Tab = createBottomTabNavigator();

export default function ProfileScreen({ navigation, route }) {

  const { token } = useSelector((state: State) => state.app);
  const [loading, setLoading] = useState(true);
  const { user }: { user: User } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(setProfileFeedPosts([]));
      dispatch(setMyVotedPosts([]));
      dispatch(setProfileFeedCompetitions([]));
    };
  }, []);
  const fetchData = async () => {
    setLoading(true);

    const [myResponse, votedResponse, organizedCompetitions] = await Promise.all([
      RequestService.get("posts?username=" + user.username, token),
      RequestService.get("posts/voted?username=" + user.username, token),
      RequestService.get("competitions?type=organized&username=" + user.username, token),
    ]).finally(() => setLoading(false));

    if (!myResponse.error_type) {
      dispatch(setProfileFeedPosts(myResponse.data));
    }
    if (!votedResponse.error_type) {
      dispatch(setMyVotedPosts(votedResponse.data));
    }
    if (!organizedCompetitions.error_type) {
      dispatch(setProfileFeedCompetitions(organizedCompetitions.data));
    }

  };

  useEffect(() => {
    console.log("called");

    return () => {
      dispatch(setProfileFeedPosts([]));
      dispatch(setMyVotedPosts([]));
      dispatch(setProfileFeedCompetitions([]));
    };
  }, []);

  return (
    <Feed>
      <View flex={1} height={Dimensions.get("screen").height}>
        <ProfileTabs navigation={navigation} user={user} />
      </View>
      <PostCommentSheet />
    </Feed>
  );
}

function ProfileTabs({ user, navigation }) {
  const layout = useWindowDimensions();
  const { user: authUser } = useSelector((state: State) => state.app);
  const { profileFeed, myVoted } = useSelector((state: State) => state.posts);
  const [index, setIndex] = useState(0);
  const [totalWon, setTotalWon] = useState(0);

  const tabs = [
    { key: "my_posts", title: "My Posts" },
    { key: "my_competitions", title: "My Competitions" },
  ];
  if (authUser.username === user.username) {
    tabs.push({ key: "voted_posts", title: "My Voted Posts" })
  }
  const [routes] = useState(tabs);

  useEffect(() => {
    var won = 0;
    profileFeed.forEach(p => {
      if (p.winner) {
        won += 1
      }
    })
    setTotalWon(won)
  }, [profileFeed])

  return (
    <>
      <VStack mx={spaces.xSpace}>
        <HStack mb={2} justifyContent="space-between" alignItems="center">
          <UserAvatar size={"xl"} uri={user.avatar} />
          <VStack alignItems={"center"}>
            <Text color={colors.dimTextColor} mb={2}>
              Posts
            </Text>
            <Text fontSize={"md"} fontWeight="semibold">
              {profileFeed.length}
            </Text>
          </VStack>
          <VStack alignItems={"center"}>
            <Text color={colors.dimTextColor} mb={2}>
              Won
            </Text>
            <Text fontSize={"md"} fontWeight="semibold">
              {totalWon}
            </Text>
          </VStack>
          <VStack alignItems={"center"}>
            <Text color={colors.dimTextColor} mb={2}>
              Voted
            </Text>
            <Text fontSize={"md"} fontWeight="semibold">
              {myVoted.length}
            </Text>
          </VStack>
        </HStack>

        <VStack>
          <Text fontSize={"md"}>{user.full_name}</Text>
          <Text fontSize={"xs"} color={colors.dimTextColor}>
            {user.username}
          </Text>
        </VStack>
      </VStack>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          my_posts: () => MY_POSTS(navigation),
          my_competitions: () => MY_COMPETITIONS(navigation),
          voted_posts: () => VOTED_POSTS(navigation),
        })}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderIcon={({ route, focused, color }) => {
              var icon = "";
              if (route.key == "my_competitions") {
                return (
                  <SvgXml
                    width="24"
                    height="24"
                    xml={`<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.45 3.87304C24.2423 3.63771 23.9869 3.4493 23.7008 3.32032C23.4146 3.19134 23.1043 3.12476 22.7905 3.125H20.6793C20.6871 2.81445 20.6914 2.50195 20.692 2.1875V2.16504C20.691 0.965331 19.6941 0 18.4842 0H6.51261C5.30275 0 4.30577 0.965331 4.30479 2.16504V2.1875C4.30479 2.50227 4.30903 2.81477 4.31749 3.125H2.20635C1.89205 3.12367 1.58113 3.1898 1.29457 3.31891C1.00801 3.44803 0.752488 3.63713 0.545251 3.87345C0.338015 4.10977 0.18389 4.38781 0.0932805 4.68879C0.00267132 4.98977 -0.0223124 5.30669 0.020016 5.61816C0.657655 10.2724 3.64567 14.1401 7.69268 16.105C8.53782 17.3901 9.50404 18.3462 10.5489 18.8813C10.5249 19.0475 10.4923 19.2122 10.4512 19.375C10.2602 20.1027 9.90775 20.7781 9.42006 21.3511C8.93238 21.924 8.32196 22.3798 7.63409 22.6845C7.63116 22.6875 7.62774 22.6909 7.62481 22.6875C7.40286 22.7851 7.21557 22.9474 7.0875 23.1533C6.95943 23.3592 6.89654 23.599 6.9071 23.8412C6.91766 24.0835 7.00116 24.3169 7.14666 24.5109C7.29216 24.7048 7.49286 24.8503 7.72246 24.9282C7.85271 24.976 7.99042 25.0003 8.12916 25H16.8633C17.1338 25.002 17.3973 24.9134 17.6117 24.7483C17.826 24.5832 17.9789 24.351 18.046 24.0889C18.1131 23.8267 18.0905 23.5497 17.9818 23.3019C17.8731 23.0541 17.6845 22.8498 17.4462 22.7216C17.4086 22.7031 17.3705 22.6875 17.3329 22.6684C16.6529 22.3615 16.05 21.9065 15.5684 21.3367C15.0867 20.7669 14.7384 20.0967 14.549 19.375C14.5079 19.2122 14.4753 19.0475 14.4514 18.8813C15.4962 18.3442 16.4624 17.3901 17.3076 16.105C21.3546 14.1401 24.3426 10.272 24.9802 5.61816C25.0224 5.30625 24.9969 4.98892 24.9054 4.68777C24.8139 4.38662 24.6586 4.10873 24.45 3.87304ZM1.26893 5.4497C1.25043 5.31499 1.26118 5.17787 1.30044 5.04769C1.3397 4.91751 1.40656 4.79732 1.49645 4.69531C1.58478 4.594 1.69393 4.51294 1.81644 4.45767C1.93895 4.40239 2.07195 4.37419 2.20635 4.37499H4.37071C4.59481 8.07469 5.3799 11.4062 6.54141 13.9848C3.74332 12.041 1.75717 8.99657 1.26893 5.4497ZM23.7279 5.4497C23.2396 8.99706 21.2535 12.0415 18.4549 13.9853C19.6164 11.4072 20.4015 8.07714 20.6256 4.37548H22.7905C22.925 4.37461 23.058 4.40277 23.1806 4.45805C23.3032 4.51333 23.4125 4.59443 23.5009 4.69579C23.5906 4.79779 23.6573 4.91792 23.6965 5.04801C23.7357 5.1781 23.7464 5.3151 23.7279 5.4497Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1092 5.39163L13.5554 6.32376C13.603 6.42482 13.6746 6.5127 13.764 6.57969C13.8533 6.64668 13.9578 6.69075 14.0681 6.70804L15.0661 6.85745C15.6246 6.94095 15.8472 7.64895 15.4435 8.0552L14.7214 8.78079C14.642 8.86155 14.5828 8.96001 14.5489 9.06807C14.5149 9.17613 14.5071 9.2907 14.5261 9.40237L14.6965 10.4278C14.7941 11.0015 14.2082 11.439 13.7083 11.168L12.8158 10.6841C12.7184 10.631 12.6093 10.6032 12.4984 10.6032C12.3875 10.6032 12.2784 10.631 12.1811 10.6841L11.2886 11.168C10.7896 11.4385 10.2037 11.001 10.3013 10.4273L10.4717 9.40188C10.4907 9.29021 10.4828 9.17564 10.4489 9.06758C10.4149 8.95952 10.3558 8.86107 10.2764 8.7803L9.55335 8.05667C9.14909 7.65042 9.37222 6.94241 9.93076 6.85892L10.9287 6.7095C11.0391 6.69221 11.1435 6.64814 11.2329 6.58115C11.3222 6.51416 11.3938 6.42629 11.4414 6.32522L11.8876 5.3931C11.9412 5.27622 12.0272 5.17715 12.1354 5.10765C12.2435 5.03815 12.3694 5.00113 12.4979 5.00098C12.6265 5.00082 12.7524 5.03754 12.8608 5.10678C12.9691 5.17602 13.0553 5.27488 13.1092 5.39163Z" fill="#1F2933"/>
                    <g opacity="0.12">
                    <path d="M18.4842 0H14.7028C15.9126 0 16.9096 0.965331 16.9106 2.16504V2.1875C16.9106 10.3139 14.2209 17.1186 10.6079 18.9096C11.1933 19.2096 11.8406 19.369 12.4984 19.375C17.0234 19.375 20.692 11.6797 20.692 2.1875V2.16504C20.691 0.965331 19.6941 0 18.4842 0Z" fill="#17292D"/>
                    </g>
                    </svg>
          `}
                  />
                );
              }

              if (route.key == "my_posts")
                return (
                  <Icon
                    name={"grid-on"}
                    as={MaterialIcons}
                    size={6}
                    color={color}
                  />
                );
              if (route.key == "voted_posts")
                return (
                  <SvgXml
                    width="24"
                    height="24"
                    xml={`<svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8586 1.34964C11.7627 2.18155 9.51954 3.31371 7.00004 4.50695C5.72742 6.10798 5.40912 9.63017 5.09082 12.1919L8.59096 7.70925L11.7728 10.9113C10.1819 12.8324 8.59096 14.1133 9.22727 15.0738C9.86358 15.7141 10.8182 15.3939 11.7728 14.4334C14.6306 11.8778 16.5455 10.9113 16.5455 7.70948L21 5.45407V0.0107415C18.8105 -0.094113 15.8102 0.584637 13.8585 1.35038L13.8586 1.34964ZM8.65062 8.67972L5.58821 12.592C5.37647 12.8628 4.93327 12.9064 4.67332 12.6821L0 18.5956L5.2302 23.3987H8.98863L16.2273 15.0739L14.2884 13.1227C13.6663 13.6622 12.9754 14.2198 12.2203 14.8939C12.2132 14.901 12.2074 14.907 12.2003 14.9137C11.6796 15.4336 11.143 15.8117 10.5497 15.9744C9.94843 16.1394 9.24797 16.0052 8.7799 15.5342C8.75016 15.5037 8.72353 15.47 8.70045 15.434C8.43722 15.0367 8.39882 14.5269 8.52156 14.1131C8.6443 13.6993 8.8769 13.3322 9.15787 12.9624C9.61864 12.3561 10.2658 11.6663 10.8979 10.9411L8.65062 8.67972ZM0 23.7051V24.9859L18.4546 25V23.7191L0 23.7051Z" fill="white"/>
              </svg>
          `}
                  />
                );
            }}
            renderLabel={() => ""}
            indicatorStyle={{ backgroundColor: "white" }}
            style={{ backgroundColor: colors.primaryBg }}
          />
        )}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}

function MY_POSTS(navigation) {
  const { profileFeed } = useSelector((state: State) => state.posts);
  if (!profileFeed.length) {
    return <VStack mt={20} mx={spaces.xSpace} alignItems={"center"}>
      <Image source={gifs.empty} alt={"Empty posts list"} />
      <Text fontSize={"md"} textAlign={"center"}>
        Not post to show
      </Text>
    </VStack>
  }
  return (
    <>
      <FlatList
        numColumns={3}
        showsVerticalScrollIndicator={false}
        data={profileFeed} // your array should go here
        renderItem={({ item }: { item: Post }) => (
          <PostSingleImageItem post={item} navigation={navigation} />
        )}
      />
    </>
  );
}
function MY_COMPETITIONS(navigation) {
  const { profileFeed } = useSelector((state: State) => state.competitions);

  if (!profileFeed.length) {
    return <VStack mt={20} mx={spaces.xSpace} alignItems={"center"}>
      <Image source={gifs.empty} alt={"Empty competitions list"} />
      <Text fontSize={"md"} textAlign={"center"}>
        No organized competition
      </Text>
    </VStack>
  }

  return (
    <View mx={spaces.xSpace}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileFeed} // your array should go here
        renderItem={({ item }: { item: Competition }) => (
          <CompetitionItem navigation={navigation} competition={item} />
        )}
      />
    </View>
  );
}
function VOTED_POSTS(navigation) {
  const { voted } = useSelector((state: State) => state.posts);

  if (!voted.length) {
    return <VStack mt={20} mx={spaces.xSpace} alignItems={"center"}>
      <Image source={gifs.empty} alt={"Empty posts list"} />
      <Text fontSize={"md"} textAlign={"center"}>
        Not post to show
      </Text>
    </VStack>
  }
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={voted} // your array should go here
        renderItem={({ item }: { item: Post }) => (
          <PostItem post={item} navigation={navigation} />
        )}
      />
    </>
  );
}
