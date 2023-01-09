import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import NotificationCard from "../Components/NotificationCard";
import {
  notificationAction,
  notificationInitialState,
  notificationReducer,
} from "../Reducer";

export const NotificationContext = createContext();
function Notification({ children }) {
  const [state, dispatch] = useReducer(
    notificationReducer,
    notificationInitialState
  );

  const deleteNotifcation = (id) => {
    dispatch({
      type: notificationAction.DELETE,
      payload: {
        id: id,
      },
    });
  };

  const closeNotification = (id) => {
    dispatch({
      type: notificationAction.INACTIVE,
      payload: {
        id: id,
      },
    });
    setTimeout(() => {
      deleteNotifcation(id);
    }, 1000);
  };

  const notify = (type, message) => {
    const notificationId = state.notifications.length;
    dispatch({
      type: notificationAction.ADD,
      payload: {
        notification: {
          id: notificationId,
          type: type,
          message: message,
          active: true,
        },
      },
    });
    setTimeout(() => {
      closeNotification(notificationId);
    }, 6000);
    return notificationId;
  };

  const showNotifications = useCallback(
    () => (
      <>
        {state.notifications.map((notification) => (
          <AnimatePresence key={notification?.id}>
            {notification?.active && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: "10%",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: "0%",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: "10%",
                }}
              >
                <NotificationCard
                  type={notification?.type}
                  message={notification?.message}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </>
    ),
    [state]
  );

  useEffect(() => {
    state;
  }, [state]);

  const value = {
    notifications: state?.notifications,
    notify,
    closeNotification,
  };
  return (
    <>
      <NotificationContext.Provider value={value}>
        <div className="w-full h-fit fixed left-0 top-0 pt-10 flex flex-col justify-center items-center gap-3 z-50">
          {showNotifications()}
        </div>
        {children}
      </NotificationContext.Provider>
    </>
  );
}

export default Notification;
