import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { AppRoutes } from './app.routes';

import { Notification } from '../components/Notification';

const  linking = {
  prefixes: ['com.eduardoarad.igniteshoes://', 'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      },
      cart: {
        path: 'cart'
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  
  const [notification, setNotification] = useState<OSNotification | null>(null)

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification();

      setNotification(response);
    })

    return () => unsubscribe;
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification && (
        <Notification
          onClose={() => setNotification(null)}
          data={notification}
        />
      )}
    </NavigationContainer>
  );
}