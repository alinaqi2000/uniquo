import React, { useEffect, useState } from "react";
import { FlatList, HStack, Text, View, VStack } from "native-base";

import Feed from "../../components/layout/Feed";
import { useSelector } from "react-redux";
import { State } from "../../store";
import PostItem from "../../components/utility/ui/PostItem";
import { Post } from "../../models/Post";
import colors from "../../config/colors";
import spaces from "../../config/spaces";
import PostCommentSheet from "../../components/utility/ui/PostCommentSheet";

export default function PostsScreen({ navigation }) {
  const { user } = useSelector((state: State) => state.app);
  const competitions = useSelector((state: State) => state.competitions);
  const { feed } = useSelector((state: State) => state.posts);
  const competition = competitions.feed[0];

  useEffect(() => {}, []);

  return (
    <Feed>
      {/* <HStack>
        <Text mx={spaces.xSpace} color={colors.dimTextColor}>
          {competition.description}
        </Text>
      </HStack> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={feed} // your array should go here
        renderItem={({ item }: { item: Post }) => (
          <PostItem post={item} navigation={navigation} />
        )}
      />

      <PostCommentSheet />
    </Feed>
  );
}
