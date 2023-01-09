import React, { useEffect, useState } from "react";
import { notificationAction } from "../Reducer";

function NotificationCard({ type, message }) {
  const [bgColor, setBgColor] = useState("bg-white");
  useEffect(() => {
    switch (type) {
      case notificationAction.ALERT:
        setBgColor("bg-info");
        break;
      case notificationAction.ERROR:
        setBgColor("bg-error");
        break;
      case notificationAction.SUCCESS:
        setBgColor("bg-success");
        break;
      case notificationAction.WARNING:
        setBgColor("bg-warning");
        break;
      default:
        setBgColor("bg-gray-300");
        break;
    }
  }, [type, message]);

  return (
    <div className={`card w-96 ${bgColor} text-primary-content`}>
      <div className="card-body">
        <h2 className="card-title">Notification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default NotificationCard;
