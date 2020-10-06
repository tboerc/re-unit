import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ResponsiveProvider, useResponsive} from 'lib/';

// Create a normal StyleSheet
const raw_styles = StyleSheet.create(undefined);

const Screen = () => {
  // Optionaly, pass the styles object through the Hook, so it will multiply all allowed values with re-unit
  // Or, if you don't want to update your styles object, just use without it. Ex: `useResponsive()`
  // But then, remeber you can't access the `styles` property of the returned value.
  // const {re, styles, orientation} = useResponsive(raw_styles);

  return (
    <View>
      {/* <View style={styles.box} />

      <View
        style={{width: 100 * re, height: 100 * re, backgroundColor: 'yellow'}}
      />

      {orientation === 'landscape' && <View style={styles.another_box} />} */}
    </View>
  );
};

const App = () => {
  return (
    // <ResponsiveProvider>
    <Screen />
    // </ResponsiveProvider>
  );
};

export default App;
