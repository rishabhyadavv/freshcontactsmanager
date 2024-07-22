import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@presentation/views/HomeScreen';
import AddContactScreen from '@presentation/views/AddContactScreen';
import EditContactScreen from '@presentation/views/EditContactScreen';
import { ContactModel } from '@data/models/ContactModel';

export type RootStackParamList = {
  Home: undefined;
  AddContact: undefined;
  EditContact: { contact: ContactModel };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddContact" component={AddContactScreen} />
        <Stack.Screen name="EditContact" component={EditContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
