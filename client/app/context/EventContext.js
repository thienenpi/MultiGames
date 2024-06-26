import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../utils/config";
import { InvitationDialog } from "../components";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [inviteRoom, setInviteRoom] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    socket.on("invite", (room) => {
      console.log(`Invited to ${room}`);
      setInviteRoom(room);
      setVisible(true);
    });

    return () => {
      socket.off("invite");
    };
  }, [socket]);

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <EventContext.Provider value={{ inviteRoom }}>
      {children}
      <InvitationDialog
        visible={visible}
        onChangeVisible={hideModal}
        inviteRoom={inviteRoom}
      ></InvitationDialog>
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
