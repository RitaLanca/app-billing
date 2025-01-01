export interface NotificationProps {
    id: string;
    message: string;
    isUrgent:boolean;
    seen: boolean;
  }
  
  export interface NotificationContextProps {
    notifications: Notification[];
    addNotification: (notification: NotificationProps) => void;
    markAsSeen: (id: string) => void;
    clearNotifications: () => void;
    removeNotification: () => void;
  }