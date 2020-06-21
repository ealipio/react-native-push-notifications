import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

export default function App() {
  const PUSH_REGISTRATION_ENDPOINT = 'http://3758e15940d5.ngrok.io/token';
  const MESSAGE_ENPOINT = 'http://3758e15940d5.ngrok.io/message';
  const [messageText, setMessageText] = React.useState('Holi');
  const [notification, setNotification] = React.useState();

  React.useEffect(() => {
    const registerForPushNotificationsAsync = async ({ token }) => {
      const handleNotification = (notification) => {
        console.log(notification);
      };
      const notificationSubscription = Notifications.addListener(
        handleNotification
      );
      return fetch(PUSH_REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: {
            value: token,
          },
          user: {
            username: 'warly',
            name: 'Dan Ward',
          },
        }),
      });
    };

    async function askNotificationPermission() {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (permission.status === 'granted') {
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token)
        registerForPushNotificationsAsync({ token });
      }
    }

    askNotificationPermission();
  });

  const handleChangeText = (text) => {
    setMessageText(text);
  };

  const sendMessage = () => {
    fetch(MESSAGE_ENPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messageText,
      }),
    });
    setMessageText('');
  };
  const renderNotification = () => {
    //
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={messageText}
        onChangeText={handleChangeText}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={sendMessage} style={styles.button}>
        <Text style={styles.buttonText}>Send.</Text>
      </TouchableOpacity>
      {notification ? renderNotification() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
