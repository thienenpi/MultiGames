import { getUserById } from "../api";

const getFriends = async ({ id }) => {
  const res = await getUserById({ id: id });
  const userInfo = res.data;

  return userInfo.friends;
};

const checkIfFriend = async ({ id, friendId }) => {
  const friends = await getFriends({ id: id });

  return friends.includes(friendId);
};

export { getFriends, checkIfFriend };
