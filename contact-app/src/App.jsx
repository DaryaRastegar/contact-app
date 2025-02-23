// src/App.js
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import ConfirmModal from './components/ConfirmModal'
import Toast from './components/Toast'
import styles from './App.module.css'
import { generateId } from './utils/generateId'

const App = () => {
  const [isLoadedList, setIsLoadedList] = useState(false)
  const [contacts, setContacts] = useState([])
  const [currentContact, setCurrentContact] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [contactToDelete, setContactToDelete] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFormOpen, setFormOpen] = useState(false)

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts')
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts))
    }
    setIsLoadedList(true)
  }, [])

  useEffect(() => {
    if (isLoadedList) localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleAddContact = () => {
    setCurrentContact(null)
    setFormOpen(true)
  }

  const handleSaveContact = (contact) => {
    if (currentContact) {
      // Editing an existing contact
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)))
      setToastMessage('Contact updated successfully!')
    } else {
      // Adding a new contact
      setContacts([...contacts, contact])
      setToastMessage('Contact added successfully!')
    }
    setFormOpen(false)
  }

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id))
    setToastMessage('Contact deleted successfully!')
    setModalOpen(false)
    setContactToDelete(null)
  }

  const handleEditContact = (id) => {
    const contact = contacts.find((c) => c.id === id)
    setCurrentContact(contact)
    setFormOpen(true)
  }

  const handleConfirmDelete = (id) => {
    setContactToDelete(id)
    setModalOpen(true)
  }

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase())
  }

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    const { name, lastname, email } = contact
    return (
      name.toLowerCase().includes(searchQuery) ||
      lastname.toLowerCase().includes(searchQuery) ||
      email.toLowerCase().includes(searchQuery)
    )
  })

  return (
    <div className={styles.app}>
      <Header onAddContact={handleAddContact} onSearch={handleSearch} />
      <ContactList
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleConfirmDelete}
      />
      {isFormOpen && (
        <ContactForm
          contact={currentContact}
          onSave={(contact) =>
            handleSaveContact({ ...contact, id: contact.id || generateId() })
          }
          onClose={() => setFormOpen(false)}
        />
      )}
      {isModalOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this contact?"
          onConfirm={() => handleDeleteContact(contactToDelete)}
          onCancel={() => {
            setModalOpen(false)
            setContactToDelete(null)
          }}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  )
}

export default App
