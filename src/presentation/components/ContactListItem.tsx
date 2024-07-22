import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ContactModel } from '@data/models/ContactModel';

interface ContactListItemProps {
  contact: ContactModel;
  onEdit: (contact: ContactModel) => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact, onEdit }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onEdit(contact)}>
      <View>
        {contact.name && <Text style={styles.name}>{contact?.name}</Text>}
        {contact.email && <Text style={styles.name}>{contact.email}</Text>}

        <Text>{contact.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
    container: {
      paddingBottom: 5,
      paddingTop: 5,
      flex:1
    },
    name: {
        fontWeight:"bold",
        color:"black",
        fontSize:16,
        paddingBottom:5
    },
    email: {
      fontWeight:"bold",
      color:"black",
      fontSize:13,
      paddingBottom:5
  }
  });
  
