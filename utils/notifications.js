import notifee, { RepeatFrequency, TriggerType } from "@notifee/react-native";
import moment from "moment";

export default class NotificationsManager {
  REMINDERS_CHANNEL = "reminders-channel";

  static myInstance = null;

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new NotificationsManager();
    }
    return this.myInstance;
  }

  checkPermissions = async (remindersOn) => {
    if (remindersOn) {
      await notifee.requestPermission();
    }
  };

  // listenReminders = async () => {
  //   notifee.onForegroundEvent(({ type, detail }) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log("User dismissed notification", detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         console.log("User pressed notification", detail.notification);
  //         break;
  //       default:
  //         console.log("This is default");
  //     }
  //   });

  //   notifee.onBackgroundEvent(async ({ type, detail }) => {
  //     const { notification } = detail;

  //     // Check if the user pressed the "Mark as read" action
  //     if (type === EventType.ACTION_PRESS) {
  //       // Update external API
  //       // console.log("------", type);
  //       // Remove the notification
  //       // await notifee.cancelNotification(notification.id);
  //     }
  //   });

  //   const initialNotification = await notifee.getInitialNotification();

  //   if (initialNotification) {
  //     console.log("Notification caused application to open", initialNotification.notification);
  //     console.log("Press action used to open the app", initialNotification.pressAction);
  //   }
  // };

  updateReminders(remindersOn, sound, remindersList) {
    notifee.cancelAllNotifications();
    if (remindersOn) {
      const array = JSON.parse(remindersList);
      for (let i = 0; i < array.length; i += 1) {
        if (array[i].enabled) {
          this.createReminder(array[i], sound);
        }
      }
    }
  }

  // removeAllDeliveredNotifications = () => {
  //   notifee.removeAllDeliveredNotifications();
  // };

  getScheduledNotifications = () => {
    notifee.getTriggerNotificationIds();
    // .then((ids) => console.log("All trigger notifications: ", ids));
  };

  async createReminder(reminder, sound) {
    // Build a channel
    this.checkPermissions();
    const channel = await notifee.createChannel({
      id: this.REMINDERS_CHANNEL,
      name: "Reminders Channel",
      sound,
      description: "Alert notification reminders for chosen Bani",
    });
    // .setSound(sound)
    // .setDescription("Alert notification reminders for chosen Bani");
    // Create the channel
    // firebase.notifications().android.createChannel(channel);
    // Build notification
    const currentTime = moment().utc().valueOf();
    let aTime = moment(reminder.time, "h:mm A").utc().valueOf();
    if (aTime < currentTime) {
      aTime = moment(reminder.time, "h:m A").add(1, "days");
    }
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Number(aTime),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        title: reminder.title,
        body: reminder.time,
        data: {
          key: "reminder.key",
          gurmukhi: reminder.gurmukhi,
          roman: reminder.translit,
        },
        android: {
          channelId: channel,
          smallIcon: "ic_notification",
        },
        ios: {
          badgeCount: 1,
          sound,
        },
      },
      trigger
    );

    // const notification = new firebase.notifications.Notification()
    //   .setNotificationId(reminder.key.toString())
    //   .setTitle(reminder.title)
    //   .setBody(reminder.time)
    //   .setSound(channel.sound)
    //   .setData({
    //     key: reminder.key,
    //     gurmukhi: reminder.gurmukhi,
    //     roman: reminder.translit,
    //   });
    // notification.android
    //   .setChannelId(this.REMINDERS_CHANNEL)
    //   .android.setSmallIcon("ic_notification");
    // notification.ios.setBadge(1);

    // firebase.notifications().scheduleNotification(notification, {
    //   fireDate: aTime,
    //   repeatInterval: "day",
    // });
  }
}
