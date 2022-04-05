// import React, { useEffect } from "react";
// import * as Notifications from "expo-notifications";
// import ButtonComponent from "./ButtonComponent";

// const onSubmit = () => {
//   const dummyDate = new Date("1 1 0 8:00 PM EST");
//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Chain",
//       body: "Your Valorant store has changed!",
//     },
//     trigger: {
//       hour: dummyDate.getHours(),
//       minute: dummyDate.getMinutes(),
//       channelId: "new-emails",
//       repeats: true,
//     },
//     identifier: "valorant-store-changed",
//   });
// };

// // const TimerNotification = () => {
// //   useEffect(() => {
// //     askNotification();
// //     const listener = Notifications.addNotificationReceivedListener(console.log);
// //     return () => listener.remove();
// //   }, []);

// //   return <ButtonComponent title="a" onPress={onSubmit} />;
// // };

// export default TimerNotification;
