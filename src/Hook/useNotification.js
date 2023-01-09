import React, { useContext } from "react";
import { NotificationContext } from "../Context/Notification";

function useNotification() {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error("useNotification must be used within NotificationContext");
  }
  return context;
}

export default useNotification;
