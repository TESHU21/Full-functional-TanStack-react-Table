import { useState } from "react";
import React from "react";
import Modal from "react-modal";

const AddROW = ({ handleAddRow }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
  });
  // Adding New Row to The Colomons
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRow(newRow);
    setNewRow({});
    closeModal();
  };
  return (
    <div>
      <div>
        <button onClick={openModal}>Add New</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Row"
      >
        <h2>Add New Row</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            value={newRow.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="last_name"
            value={newRow.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={newRow.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="date"
            name="dob"
            value={newRow.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
          <button type="submit">Add Row</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddROW;
