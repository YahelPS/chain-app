import * as Notifications from "expo-notifications";

export async function schedulePushNotification(
  date: any,
  repeats: boolean,
  id: string,
  body: string
) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Chain",
      body,
    },
    trigger: {
      hour: date.getHours(),
      minute: date.getMinutes(),
      channelId: "new-emails",
      repeats,
    },
    identifier: id,
  });
  return id;
}
