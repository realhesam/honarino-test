"use client";

import { CheckCircle, Info, XCircle } from "lucide-react";
import { createContext, useContext, useState } from "react";

export type NotificationType = "success" | "error" | "info";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextValue {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, type: NotificationType = "info") => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3500);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationContainer notifications={notifications} />
    </NotificationContext.Provider>
  );
}

function NotificationContainer({ notifications }: { notifications: Notification[] }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`
            flex items-center gap-3 min-w-[260px] max-w-sm px-4 py-3 rounded-xl
            shadow-lg border border-stone-200 bg-white/90 backdrop-blur
            animate-toast-in
          `}
        >
          {icons[n.type]}
          <span className="text-sm text-stone-700">{n.message}</span>
        </div>
      ))}
    </div>
  );
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("NotificationProvider is missing");
  }
  return ctx;
}
