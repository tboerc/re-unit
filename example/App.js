import React from 'react';
import {View, StyleSheet} from 'react-native';

import {createStylefy} from '../lib/';

// Create your theme colors presets. It's dynamic, fell free to choose wich color scheme you like
const themes = {
  light: {
    text: '#000000',
    primary: '#FAFAFA',
  },

  dark: {
    text: '#ffffff',
    primary: '#040404',
  },
};

// Call createStylefy passing your theme colors. It will return the provider and the hook.
// You can then export both of this functions to use later on your components.
const {useStylefy, StylefyProvider} = createStylefy(themes);

// Create a normal StyleSheet
const rawStyles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },

  anotherBox: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

const Screen = () => {
  // Optionaly, pass the styles object through the Hook, so it will multiply all allowed values with
  // the unit based on device width. This helps a lot on responsive. Or, if you don't want to update
  // your styles object, just use without it. Ex: `useResponsive()`. But remeber, you can't access
  // the `styles` property of the returned value then.
  const {rw, styles, orientation} = useStylefy(rawStyles);

  return (
    <View>
      <View style={styles.box} />

      <View
        style={{width: 100 * rw, height: 100 * rw, backgroundColor: 'yellow'}}
      />

      {orientation === 'landscape' && <View style={styles.anotherBox} />}
    </View>
  );
};

const App = () => {
  return (
    // Remeber to wrap your app with StylefyProvider and pass your initial theme
    <StylefyProvider initialTheme="dark">
      <Screen />
    </StylefyProvider>
  );
};

export default App;
