import { useNotificationContext } from "@/layout/NotificationProvider";

export function useNotification() {
  const { notify } = useNotificationContext();

  return {
    success: (msg: string) => notify(msg, "success"),
    error: (msg: string) => notify(msg, "error"),
    info: (msg: string) => notify(msg, "info"),
  };
}