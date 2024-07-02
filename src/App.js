import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Contacts from "./components/contact";
import AddContact from "./components/addContact";
import EditContact from "./components/editContact";
import ContactDetail from "./components/detailContact";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchContacts = () => {
    fetch("http://localhost:3001/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.log("Error fetching contacts:", error));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDetailModal = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };
  const handleCloseDetailModal = () => setShowDetailModal(false);

  const handleDeleteContact = (id) => {
    if (!id) {
      console.error("Invalid contact id for deletion:", id);
      return;
    }

    fetch(`http://localhost:3001/contacts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchContacts();
        setShowDetailModal(false);
        toast.success("Contact deleted successfully");
      })
      .catch((error) => console.log("Error deleting contact:", error));
  };

  return (
    <Container>
      <h1>Contact Manager</h1>
      <Button variant="primary" onClick={handleShowAddModal}>
        Add Contact
      </Button>
      <Contacts
        contacts={contacts}
        handleShowDetailModal={handleShowDetailModal}
      />
      <AddContact
        showModal={showAddModal}
        handleCloseModal={handleCloseAddModal}
        fetchContacts={fetchContacts}
      />
      <EditContact
        selectedContact={selectedContact}
        showModal={showEditModal}
        handleCloseModal={handleCloseEditModal}
        fetchContacts={fetchContacts}
        handleShowDetailModal={() => handleShowDetailModal(selectedContact)}
        setSelectedContact={setSelectedContact}
      />
      <ContactDetail
        contact={selectedContact}
        showModal={showDetailModal}
        handleCloseModal={handleCloseDetailModal}
        handleEdit={() => handleShowEditModal(selectedContact)}
        handleDelete={() => handleDeleteContact(selectedContact.id)}
      />
      <ToastContainer />
    </Container>
  );
};

export default App;
