import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ContactListItem from '@presentation/components/ContactListItem';
import { ContactModel } from '@data/models/ContactModel';

type ContactItemProps = {
  contact: ContactModel;
  onEdit: (contact: ContactModel) => void;
};

const ContactItem: React.FC<ContactItemProps> = React.memo(({ contact, onEdit }) => {
  return (
    <View style={styles.contactItem}>
      <ContactListItem contact={contact} onEdit={onEdit} />
      <Image
        source={{
          uri: 'https://img.icons8.com/ios-filled/50/000000/chevron-right.png',
        }}
        style={styles.arrowIcon}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
  },
});

export default ContactItem;
