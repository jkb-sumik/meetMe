import React, { useEffect } from "react";
import { FlatList } from "react-native";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
// import CustomHeaderButton from "../components/CustomHeaderButton";
import DataItem from "../components/DataItem";
import PageContainer from "../components/PageContainer";

const ChatListScreen = (props) => {
  //Pytajniki sprawia ze wezmie wartosc tylko jesli istnieje bez ? zwroci error, jesli nie istnieje zwroci undefind
  const selectedUser = props.route?.params?.selectedUserId;
  const userData = useSelector((state) => state.auth.userData);
  const userChats = useSelector((state) => {
    const chatsData = state.chats.chatsData;
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  });
  const storedUsers = useSelector((state) => state.users.storedUsers);

  // useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => {
  //       return (
  //         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
  //           <Item
  //             title="New chat"
  //             iconName="create-outline"
  //             onPress={() => props.navigation.navigate("NewChat")}
  //           />
  //         </HeaderButtons>
  //       );
  //     },
  //   });
  // }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const chatUsers = [selectedUser, userData.userId];

    const navigationProps = {
      newChatData: { users: chatUsers },
    };

    props.navigation.navigate("ChatScreen", navigationProps);
  }, [props.route?.params]);

  return (
    <PageContainer>
      <FlatList
        data={userChats}
        renderItem={(itemData) => {
          const chatData = itemData.item;
          const chatId = chatData.key;
          const otherUserId = chatData.users.find(
            (uid) => uid !== userData.userId
          );
          const otherUser = storedUsers[otherUserId];
          if (!otherUser) return;
          const { firstName, lastName, profilePicture, city } = otherUser;
          return (
            <DataItem
              title={`${firstName} ${lastName}`}
              subTitle={chatData.latestMessageText || "New Chat"}
              image={profilePicture}
              chat={true}
              city={city}
              onPress={() => {
                props.navigation.navigate("ChatScreen", { chatId });
              }}
            />
          );
        }}
      />
    </PageContainer>
  );
};

export default ChatListScreen;
