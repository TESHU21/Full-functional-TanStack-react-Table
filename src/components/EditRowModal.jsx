import React, { useState } from "react";

const EditRowModal = ({ row, onSave, onClose }) => {
  const [values, setValues] = useState(row);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleSave = () => {
    onSave(values);
    onClose();
  };

  return (
    <div className="modal">
      <h3>Edit Modal</h3>
      <form>
        <input
          type="text"
          name="first_name"
          value={values.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={values.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="dob"
          value={values.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditRowModal;
