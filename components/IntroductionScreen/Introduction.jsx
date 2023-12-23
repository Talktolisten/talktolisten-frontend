import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, FONT_NUNITO } from '../../styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Paginator from './Paginator';
import NextButton from './NextButton';
import slides from './slides';
import IntroductionItem from './IntroductionItem';

const Introduction = ({ setViewedOnboarding }) => {
  //slides.js contained the description for AIMEE's features

  //gets index of which slide is being shown
  const [currentIndex, setCurrentIndex] = useState(0);

  //scrollX is used to position the animation of the yellow dots
  const scrollX = useRef(new Animated.Value(0)).current;

  //used to persist which slide number the user is currently on
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  //once the user is on the last slide, the button changes to "Let's Go"
  const [lastSlide, setLastSlide] = useState(false);
  useEffect(() => {
    if (currentIndex === 3) {
      setLastSlide(true);
    } else {
      setLastSlide(false);
    }
  }, [currentIndex]);

  //Controls how the user navigates from the last slide to home page. AyncStorage is used to save that the onboarding instructions have already been viewed and will only be displayed once.
  //See Note in HomeScreen/Home.jsx for how the onboarding would be reset if the user deletes their account
  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true');
        setViewedOnboarding(true);
      } catch (err) {
        console.log('Error @setItem: ', err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <IntroductionItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton scrollTo={scrollTo} lastSlide={lastSlide} />
      </View>
    </SafeAreaView>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});