import { Component } from 'react';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Section } from './Section/Section';
import { Contacts } from './Contacts/Contacts';
import { Layout } from './Layout/Layout';
import { GlobalStyle } from './GlobalStyle';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const alertMessage = `${newContact.name} is already in contacts`;
    const contactsName = this.state.contacts.map(contact => contact.name);

    contactsName.includes(newContact.name)
      ? alert(alertMessage)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <Layout>
        <Section title="Phonebook">
          <AddContactForm onSave={this.addContact} />
        </Section>
        <Section firstTitle="Contacts">
          <Contacts
            contacts={this.getFilterContacts()}
            onDeleteContact={this.deleteContact}
          >
            <Filter initialValues={this.state} onChange={this.changeFilter} />
          </Contacts>
        </Section>
        <GlobalStyle />
      </Layout>
    );
  }
}
