import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import OneSignal, { OpenedEvent } from 'react-native-onesignal';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';

const oneSignalAppId = Platform.OS === 'ios' ? '' : '05b3d335-563c-4405-8baf-0a288aeba49d';
OneSignal.setAppId(oneSignalAppId);

OneSignal.setEmail('araujocarlos893@gmail.com');

OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response: OpenedEvent) => {
      // console.log(response.action);

      const { actionId } = response.action as any;
      
      switch(actionId) {
        case '1': return console.log('Ver todas');
        case '2': return console.log('Ver pedido');
        default: return console.log('Não foi clicado nenhuma opção')
      }
    })

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
