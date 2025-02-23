import React from 'react'
import styles from './Header.module.css'

const Header = ({ onAddContact, onSearch }) => {
  return (
    <header className={styles.header}>
      <h1>Contacts Manager</h1>
      <div className={styles.actions}>
        <input
          type="text"
          placeholder="Search by Name, Lastname, or Email..."
          className={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className={styles.addButton} onClick={onAddContact}>
          Add Contact
        </button>
      </div>
    </header>
  )
}

export default Header
