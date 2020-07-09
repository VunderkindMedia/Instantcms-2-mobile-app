import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { CommentsContext } from "../../context/comments/CommentsContext";
import { AppContext } from "../../context/app/AppContext";
import { Comment } from "./childs/Comment";

export const Comments = ({ navigation, route }) => {
  const { theme, settings } = useContext(AppContext);
  const { getComments, commentsLoading, comments_list_response } = useContext(
    CommentsContext
  );

  useEffect(() => {
    getComments(
      route.params.target_controller,
      route.params.target_subject,
      route.params.target_id
    );
  }, []);

  if (!commentsLoading && comments_list_response.items.length !== 0) {
    return (
      <View>
        <FlatList
          style={{
            marginVertical: 5,
            backgroundColor:
              theme === "dark"
                ? settings.options.dark_mode_color3
                : settings.options.light_mode_color3,
          }}
          data={comments_list_response.items}
          renderItem={(data) => <Comment item={data.item} />}
        />
      </View>
    );
  } else if (!commentsLoading && comments_list_response.items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
