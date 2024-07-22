import Contacts from 'react-native-contacts';
import { ContactModel } from '@data/models/ContactModel';
import { IContactRepository } from '@data/repositories/InterfaceContactRepository';

export class ContactRepository implements IContactRepository {

  async getAllContacts(): Promise<ContactModel[]> {
    const contacts = await Contacts.getAll();
    return contacts.map(contact => ({
      id: contact.recordID,
      name: `${contact.givenName} ${contact.familyName}`,
      email: contact.emailAddresses[0]?.email || '',
      phone: contact.phoneNumbers[0]?.number || '',
      photo: contact.thumbnailPath || ''
    }));
  }

  async addContact(contact: ContactModel): Promise<ContactModel> {
    const newContact = {
        recordID: contact.id,
        givenName: contact.name.split(' ')[0],
        familyName: contact.name.split(' ').slice(1).join(' '),
        emailAddresses: [{ label: 'work', email: contact.email }],
        phoneNumbers: [{ label: 'mobile', number: contact.phone }],
        thumbnailPath: contact.photo,
      };
  
     let addedContact = await Contacts.addContact(newContact);
      // Return the newly created contact object with the ID assigned by the contacts API
      return {
        ...contact,
        id: addedContact.recordID,
      };
  }

  async updateContact(contact: ContactModel): Promise<void> {
    try {
      // Fetch the existing contact by ID
      const existingContact = await Contacts.getContactById(contact.id);
  
      if (!existingContact) {
        throw new Error(`Contact with ID ${contact.id} does not exist.`);
      }
  
      // Update contact's name
      const nameParts = contact.name.split(' ');
      existingContact.givenName = nameParts[0];
      existingContact.familyName = nameParts.slice(1).join(' ');
  
      // Update contact's email if provided
      if (contact.email) {
        if (existingContact.emailAddresses.length > 0) {
          existingContact.emailAddresses[0].email = contact.email;
        } else {
          existingContact.emailAddresses = [{ label: 'work', email: contact.email }];
        }
      }
  
      // Update contact's phone number
      if (existingContact.phoneNumbers.length > 0) {
        existingContact.phoneNumbers[0].number = contact.phone;
      } else {
        existingContact.phoneNumbers = [{ label: 'mobile', number: contact.phone }];
      }
  
      // Update contact's photo
      existingContact.thumbnailPath = contact.photo;
      // Update the contact in the database
      await Contacts.updateContact(existingContact);
    } catch (err) {
      throw err; // Re-throw the error after logging it
    }
  }
  
}
