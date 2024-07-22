import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ContactModel } from '@data/models/ContactModel';
import ContactForm from '@presentation/components/ContactForm';
import { RootStackParamList } from '@presentation/navigators/RootNavigator';
import { useContactViewModel } from '@presentation/viewmodels/ContactViewModel';
import { Alert } from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'EditContact'>;

const EditContactScreen: React.FC<Props> = ({ navigation, route }) => {
  const { contact } = route.params;

  const contactViewModel = useContactViewModel();

  const editContact = async (updatedContact: ContactModel) => {
      try {
        await contactViewModel.editContact(updatedContact);
      } catch {
        Alert.alert("Error", "Something went wrong");
      }
    navigation.goBack();
  };

  return (
    <ContactForm contact={contact} onSubmit={editContact} />
  );
};

export default EditContactScreen;