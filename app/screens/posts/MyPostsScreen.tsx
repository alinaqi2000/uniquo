import React, { useEffect, useState } from "react";
import { FlatList, HStack, Text, View, VStack } from "native-base";

import Feed from "../../components/layout/AppLayout";
import { useSelector } from "react-redux";
import { State } from "../../store";
import PostItem from "../../components/utility/app/PostItem";
import { Post } from "../../models/Post";
import PostCommentSheet from "../../components/utility/app/PostCommentSheet";
import { setMyPosts } from "../../store/posts/posts.actions";
import { PostMedia } from "../../models/PostMedia";
import { User } from "../../models/User";
import { useDispatch } from "react-redux";

export default function MyPostsScreen({ navigation, route }) {
  const { user } = useSelector((state: State) => state.app);
  const competitions = useSelector((state: State) => state.competitions);
  var { profileFeed } = useSelector((state: State) => state.posts);
  const { post } = route.params;

  profileFeed = profileFeed.filter((item) => item.id !== post.id);
  profileFeed.unshift(post);

  useEffect(() => { }, []);

  const dispatch = useDispatch();
  useEffect(() => {

  }, []);

  return (
    <Feed>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileFeed} // your array should go here
        renderItem={({ item }: { item: Post }) => (
          <PostItem post={item} navigation={navigation} />
        )}
      />

      <PostCommentSheet />
    </Feed>
  );
}
