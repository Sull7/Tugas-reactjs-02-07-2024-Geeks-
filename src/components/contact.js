import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AddContact from "./addContact";
import EditContact from "./editContact";
import ContactDetail from "./detailContact";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch("http://localhost:3001/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.log("Error fetching contacts:", error));
  };

  const handleDetail = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleEditContact = () => {
    setShowEditModal(true);
  };

  const handleShowDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleDeleteContact = () => {
    if (selectedContact) {
      fetch(`http://localhost:3001/contacts/${selectedContact.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          fetchContacts();
          setShowDetailModal(false);
        })
        .catch((error) => console.log("Error deleting contact:", error));
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>
                <Button variant="info" onClick={() => handleDetail(contact)}>
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Contact Modal */}
      <AddContact
        showModal={showAddModal}
        handleCloseModal={handleCloseAddModal}
        fetchContacts={fetchContacts}
      />

      {/* Edit Contact Modal */}
      {selectedContact && (
        <EditContact
          selectedContact={selectedContact}
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal}
          fetchContacts={fetchContacts}
          handleShowDetailModal={handleShowDetailModal} // Mengirimkan prop handleShowDetailModal
          setSelectedContact={setSelectedContact} // Mengirimkan prop setSelectedContact
        />
      )}

      {/* Contact Detail Modal */}
      <ContactDetail
        contact={selectedContact}
        showModal={showDetailModal}
        handleCloseModal={handleCloseDetailModal}
        handleEdit={handleEditContact}
        handleDelete={handleDeleteContact}
      />
    </div>
  );
};

export default Contacts;
