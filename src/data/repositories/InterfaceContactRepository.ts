import { ContactModel } from '@data/models/ContactModel';

export interface IContactRepository {
  getAllContacts(): Promise<ContactModel[]>;
  addContact(contact: ContactModel): Promise<ContactModel>;
  updateContact(contact: ContactModel): Promise<void>;
}
