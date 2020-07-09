import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import { CommentsContext } from "../../context/comments/CommentsContext";
import { AppContext } from "../../context/app/AppContext";
import { Comment } from "./childs/Comment";

export const Comments = ({ target_controller, target_subject, target_id }) => {
  const { getComments, commentsLoading, comments_list_response } = useContext(
    CommentsContext
  );

  useEffect(() => {
    getComments(target_controller, target_subject, target_id);
  }, []);

  if (!commentsLoading && comments_list_response.items.length !== 0) {
    let comments_list = [];
    comments_list_response.items.map((item) => {
      comments_list.push(
        <Comment key={item.date_pub + item.content} item={item} />
      );
    });
    return (
      <SafeAreaView style={{ marginVertical: 10, flex: 1 }}>
        {comments_list}
      </SafeAreaView>
    );
  } else if (!commentsLoading && comments_list_response.items.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Комментарии отстутсвуют</Text>
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
};
