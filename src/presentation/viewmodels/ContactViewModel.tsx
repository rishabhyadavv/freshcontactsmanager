import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContactModel } from '@data/models/ContactModel';
import { ContactOperations } from '@contactoperations/ContactOperations';

interface ContactViewModel {
  contacts: ContactModel[];
  loading: boolean;
  error: string | null;
  addContact: (contact: ContactModel) => Promise<void>;
  editContact: (contact: ContactModel) => Promise<void>;
  fetchContacts: () => Promise<void>;
  loadMoreContacts: () => void;
}

interface ContactViewModelProviderProps {
  children: ReactNode;
}

const ContactViewModelContext = createContext<ContactViewModel | undefined>(undefined);

export const useContactViewModel = () => {
  const context = useContext(ContactViewModelContext);
  if (!context) {
    throw new Error('useContactViewModel must be used within a ContactViewModelProvider');
  }
  return context;
};

export const ContactViewModelProvider: React.FC<ContactViewModelProviderProps> = ({ children }) => {
  const contactOperations = ContactOperations.getInstance();
  const [contacts, setContacts] = useState<ContactModel[]>([]);
  const [pagedContacts, setPagedContacts] = useState<ContactModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const PAGE_SIZE = 20;

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const allContacts = await contactOperations.getContacts();
      const sortedContacts = allContacts.sort((a, b) => a.name.localeCompare(b.name));
      setContacts(sortedContacts);
      setPagedContacts(sortedContacts.slice(0, PAGE_SIZE));
    } catch (err) {
      setError("Error occured");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreContacts = () => {
    const nextPage = page + 1;
    const newContacts = contacts.slice(0, nextPage * PAGE_SIZE);
    setPagedContacts(newContacts);
    setPage(nextPage);
  };
  
  const addContact = async (contact: ContactModel) => {
    try {
      const newContact = await contactOperations.addContact(contact);
  
      setContacts(prevContacts => [newContact, ...prevContacts]);
      setPagedContacts(prevContacts => [newContact, ...prevContacts].slice(0, page * PAGE_SIZE));
    } catch (err) {
      setError("Error occurred");
    }
  };

  const editContact = async (updatedContact: ContactModel) => {
    try {
      await contactOperations.editContact(updatedContact);
      setContacts(prevContacts => prevContacts.map(c => (c.id === updatedContact.id ? updatedContact : c)));
      setPagedContacts(prevContacts => prevContacts.map(c => (c.id === updatedContact.id ? updatedContact : c)).slice(0, page * PAGE_SIZE));
    } catch (err) {
      setError("Error occured");
    }
  };

  return (
    <ContactViewModelContext.Provider value={{ contacts: pagedContacts, loading, error, addContact, editContact, fetchContacts, loadMoreContacts }}>
      {children}
    </ContactViewModelContext.Provider>
  );
};
