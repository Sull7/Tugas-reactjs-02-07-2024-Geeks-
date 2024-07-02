import React from "react";
import { Button, Modal } from "react-bootstrap";

const ContactDetail = ({
  contact,
  showModal,
  handleCloseModal,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contact && (
          <div>
            <p>
              <strong>Name:</strong> {contact.name}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        {contact && (
          <>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ContactDetail;
