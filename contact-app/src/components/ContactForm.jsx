import React, { useEffect, useState, useRef } from 'react';
import styles from './ContactForm.module.css';
import { generateId } from '../utils/generateId';

const ContactForm = ({ contact, onSave, onClose }) => {
  const formRef = useRef();

  const [formData, setFormData] = useState(
    contact || { name: '', lastname: '', email: '', phone: '' }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   
  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.lastname.trim()) tempErrors.lastname = 'Lastname is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone is required';
    } else if (!/^\d{11}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone must be 11 digits';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        id: contact?.id || generateId(),
      });
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} ref={formRef}>
        <h2>{contact ? 'Edit Contact' : 'Add Contact'}</h2>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name && styles.errorInput}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Lastname:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={errors.lastname && styles.errorInput}
            />
            {errors.lastname && <span className={styles.errorMessage}>{errors.lastname}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email && styles.errorInput}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone && styles.errorInput}
            />
            {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
          </div>
          <div className={styles.formActions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
