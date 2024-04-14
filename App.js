import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import * as Updates from 'expo-updates';
import store from './redux/store';
import { loadFonts } from './util/helpers';
import Nav from './navigation/Nav';


export default function App() {
  enableScreens();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFontData = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadFontData();
  }, []);

  
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);
  
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Nav />
      </GestureHandlerRootView>
    </Provider>
  );
}

