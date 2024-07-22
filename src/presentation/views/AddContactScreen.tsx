import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ContactModel } from '@data/models/ContactModel';
import ContactForm from '@presentation/components/ContactForm';
import { RootStackParamList } from '@presentation/navigators/RootNavigator';
import { useContactViewModel } from '@presentation/viewmodels/ContactViewModel';
import { Alert } from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'AddContact'>;

const AddContactScreen: React.FC<Props> = ({ navigation, route }) => {

  const contactViewModel = useContactViewModel();

  const addContact = async (contact: ContactModel) => {
    try {
      await contactViewModel.addContact(contact);
    } catch {
      Alert.alert("Error", "Something went wrong");
    }
    navigation.goBack();
  };

  return (
    <ContactForm onSubmit={addContact} />
  );
};

export default AddContactScreen;