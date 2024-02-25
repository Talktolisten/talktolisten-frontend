
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <>
        <StatusBar style="dark" />
        <Nav />
      </>
    </Provider>
  );
}

