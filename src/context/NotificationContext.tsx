import { NotificationContextProps, NotificationProps } from "@/types/notification";
import { createContext, useState } from "react";

export const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const addNotification = (notification: NotificationProps) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const removeNotification = (notification: NotificationProps) => {
    setNotifications((prev) => prev.filter(n => n.id !== notification.id));
  };

  const markAsSeen = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, seen: true } : notif))
    );
  };

  const clearNotifications = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, seen: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, markAsSeen, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
