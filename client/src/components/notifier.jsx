import { useEffect } from 'react';
import Parking from './Parking';

const usePageVisibility = (slot) => {
  useEffect(() => {
    // Request permission for notifications on page load
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
          console.log("Notification permission denied.");
        }
      });
    }

    let notificationTimeout;

    const handleVisibilityChange = () => {
      if (document.hidden && status1 == "Available") {
        // Delay the notification by 5 seconds
        notificationTimeout = setTimeout(() => {
          sendPushNotification(slot);
          console.log(status1)
        }, 1000);
      } else {
        // Clear timeout if the user returns before delay ends
        clearTimeout(notificationTimeout);
      }
    };

    const sendPushNotification = (slot) => {
      if (Notification.permission === "granted") {
        new Notification(`Beep! Beep!, Slot ${slot} available!`, {
          body: "There are slot available! Click to return.",
          icon: "/path-to-your-icon.png",
        });
      } else {
        console.log("Notification permission not granted.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(notificationTimeout); // Clean up timeout on unmount
    };
  }, []);
};

export default usePageVisibility;
