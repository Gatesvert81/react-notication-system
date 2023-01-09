import { notificationAction } from "./notificationAction";

// Initial notification state. It's empty for now
export const notificationInitialState = {
  notifications: [],
};

// Our reducer function
export default (state = notificationInitialState, { type, payload }) => {
  switch (type) {
    case notificationAction.ADD:
      // Add notification to the list (state..notifications)
      return { notifications: [...state.notifications, payload.notification] };
    case notificationAction.DELETE:
      // Remove/Delete notification
      const deleteNotifcation = state.notifications?.filter(
        (notification) => notification.id !== payload.id
      );
      return { notifications: [...deleteNotifcation] };
    case notificationAction.INACTIVE:
      // Make notifcation inactive
      const notifications = state.notifications?.map((notification) => {
        if (notification.id === payload.id) {
          return {
            ...notification,
            active: false,
          };
        }
        return notification;
      });
      return { notifications: [...notifications] };
    default:
      return state;
  }
};
