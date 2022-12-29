import React, { useEffect, useState } from "react";
import { FlatList, HStack, Text, View, VStack } from "native-base";

import Feed from "../../components/layout/Feed";
import { useSelector } from "react-redux";
import { State } from "../../store";
import PostItem from "../../components/utility/ui/PostItem";
import { Post } from "../../models/Post";
import PostCommentSheet from "../../components/utility/ui/PostCommentSheet";

export default function MyPostsScreen({ navigation, route }) {
  const { user } = useSelector((state: State) => state.app);
  const competitions = useSelector((state: State) => state.competitions);
  var { my } = useSelector((state: State) => state.posts);
  const { post } = route.params;
  my = my.filter((item) => item.id !== post.id);
  my.unshift(post);
  useEffect(() => {}, []);

  return (
    <Feed>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={my} // your array should go here
        renderItem={({ item }: { item: Post }) => (
          <PostItem post={item} navigation={navigation} />
        )}
      />

      <PostCommentSheet />
    </Feed>
  );
}
