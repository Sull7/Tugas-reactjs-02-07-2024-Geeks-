import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditContact = ({
  selectedContact,
  showModal,
  handleCloseModal,
  fetchContacts,
  handleShowDetailModal,
  setSelectedContact,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name || "");
      setEmail(selectedContact.email || "");
      setPhone(selectedContact.phone || "");
    }
  }, [selectedContact]);

  const handleEditContact = () => {
    fetch(`http://localhost:3001/contacts/${selectedContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchContacts();
        setSelectedContact(data); // Update selectedContact with new data
        handleCloseModal(); // Close the edit modal
        handleShowDetailModal(); // Show the detail modal
      })
      .catch((error) => console.log("Error editing contact:", error));
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditContact}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditContact;
