import React from 'react';
import { Text, Image, ImageBackground, View, StyleSheet } from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from 'react-native-gesture-handler';

const App = () => {
  const pressed = useSharedValue(false);
  const value = useSharedValue(0);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value }
    ]
  }));


  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: value.value
      }
    ]
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.pageContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.animatedCard, animatedStyles]}>
            <Card user={users[1]} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  animatedCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }

});

export default App;
