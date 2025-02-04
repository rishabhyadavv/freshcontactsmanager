import { ContactModel } from '@data/models/ContactModel';
import { ContactRepository } from '@data/repositories/ContactRepository';

export class ContactOperations {
  private static instance: ContactOperations;
  private contactRepository: ContactRepository;

  private constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  static getInstance(contactRepository: ContactRepository): ContactOperations {
    if (!ContactOperations.instance) {
      ContactOperations.instance = new ContactOperations(contactRepository);
    }
    return ContactOperations.instance;
  }

  async getContacts(): Promise<ContactModel[]> {
    return this.contactRepository.getAllContacts();
  }

  async addContact(contact: ContactModel): Promise<ContactModel> {
    return this.contactRepository.addContact(contact);
  }

  async editContact(contact: ContactModel): Promise<void> {
    return this.contactRepository.updateContact(contact);
  }
}
