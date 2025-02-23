import React, { useState } from 'react'
import Contact from './Contact'
import styles from './ContactList.module.css'

const ContactList = ({ contacts, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const sortedContacts = [...contacts].sort((a, b) => {
    if (!sortBy) return 0
    if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase())
      return sortOrder === 'asc' ? -1 : 1
    if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase())
      return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const getSortIndicator = (field) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? ' 🔼' : ' 🔽'
    }
    return ''
  }

  return (
    <div className={styles.container}>
      <div className={styles.sortOptions}>
        <button onClick={() => handleSort('name')}>
          Sort by Name{getSortIndicator('name')}
        </button>
        <button onClick={() => handleSort('lastname')}>
          Sort by Lastname{getSortIndicator('lastname')}
        </button>
        <button onClick={() => handleSort('email')}>
          Sort by Email{getSortIndicator('email')}
        </button>
      </div>
      {sortedContacts.length > 0 ? (
        <div className={styles.contactList}>
          {sortedContacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noContacts}>No contacts found.</p>
      )}
    </div>
  )
}

export default ContactList
