/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigator from "@presentation/navigators/RootNavigator"
import { ContactViewModelProvider } from '@presentation/viewmodels/ContactViewModel';

function App(): React.JSX.Element {
  return (
    <ContactViewModelProvider>
    <RootNavigator></RootNavigator>
    </ContactViewModelProvider>
  );
}
export default App;
