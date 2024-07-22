import { ContactModel } from '@data/models/ContactModel';
import { ContactRepository } from '@data/repositories/ContactRepository';

export class ContactOperations {
  private static instance: ContactOperations;
  private contactRepository: ContactRepository;

  private constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  static getInstance(): ContactOperations {
    if (!ContactOperations.instance) {
      const repositoryInstance = new ContactRepository();
      ContactOperations.instance = new ContactOperations(repositoryInstance);
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
    return  this.contactRepository.updateContact(contact);
  }
}
