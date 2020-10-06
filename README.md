# re-unit
Responsive unit to your React Native app

## Features
* Provides a scalable unit to use on you mobile app;
* Can parse your style object values to use the unit;
* Will update with screen size changes;
* Uses hooks API.

## Installation
```bash
yarn add re-unit
# or npm i re-unit
```

## Usage
```javascript
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ResponsiveProvider, useResponsive} from 're-unit';

// Create a normal StyleSheet
const raw_styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  another_box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

const Screen = () => {
  // Optionaly, pass the styles object through the Hook, so it will multiply all allowed values with re-unit
  // Or, if you don't want to update your styles object, just use without it. Ex: `useResponsive()`
  // But then, remeber you can't access the `styles` property of the returned value.
  const {re, styles, orientation} = useResponsive(raw_styles);

  return (
    <View>
      <View style={styles.box} />

      <View
        style={{width: 100 * re, height: 100 * re, backgroundColor: 'yellow'}}
      />

      {orientation === 'landscape' && <View style={styles.another_box} />}
    </View>
  );
};

const App = () => {
  return (
    // Remeber to wrap your app with ResponsiveProvider
    <ResponsiveProvider>
      <Screen />
    </ResponsiveProvider>
  );
};

export default App;
```

## API
### useResponsive(styles?)
Returns all values of the provider. If there is a style object as parameter, it will multiply all allowed values to use 're' unit.

Object with `{ re: number, width: number, height: number, orientation: string, styles: object }`.

## Example
```bash
git clone https://github.com/tboerc/re-unit.git
cd re-unit/example
yarn # or npm i
yarn ios / yarn android # or npm run ios / npm run android
```
