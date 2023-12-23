
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { loadFonts } from './util/helpers';

import Nav from './navigation/Nav';


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontData = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadFontData();
  }, []);

  if (!fontsLoaded) {
    return null; // or render a loading screen
  }

  return (
    <>
      <StatusBar style="dark" />
      <Nav />
    </>
  );
}

