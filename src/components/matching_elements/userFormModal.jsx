import React from 'react';
import UserForm from './userForm';
import Modal from 'react-modal';

// Modal.setAppElement('#root'); // Set the root element for accessibility

const UserFormModal = ({ isOpen, onRequestClose, onMatch }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Form"
    >
      <UserForm onMatch={onMatch} />
    </Modal>
  );
};

export default UserFormModal;
