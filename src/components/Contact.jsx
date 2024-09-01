import React from 'react';
import styles from './Contact.module.css';

import deleteIcon from './../assets/delete.png'
import editIcon from './../assets/edit.png'
import phoneIcon from './../assets/phone.png'
import emailIcon from './../assets/email.png'

const Contact = ({ contact, onEdit, onDelete }) => {
  return (
    <div className={styles.contact}>
      <div className={styles.details}>
        <div>
          <p><strong>Name:</strong> {contact.name} {contact.lastname}</p>
        </div>
        <div>
          <img src={emailIcon} alt="email" />
          <p>{contact.email}</p>
        </div>
        <div>
          <img src={phoneIcon} alt="phone" />
          <p>{contact.phone}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={() => onEdit(contact.id)}>
          <img className={styles.icon} src={editIcon} alt="edit" />
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(contact.id)}>
          <img className={styles.icon} src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default Contact;
