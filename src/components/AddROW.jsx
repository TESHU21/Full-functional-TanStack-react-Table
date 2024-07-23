import { useState } from "react";
import React from "react";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";

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
  const modalStyle = " h-[20rem] bg-red";
  return (
    <div>
      <div>
        <button
          onClick={openModal}
          className=" py-2 px-3 bg-slate-100 border-b-slate-100 rounded-md"
        >
          <div className=" flex flex-row gap-2 items-center">
            <MdAdd size={20} className=" font-bold text-green-500" />
            Add New
          </div>
        </button>
      </div>
      <div className="">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add New Peopel"
          className="absolute top-10 left-10 right-10 bottom-2 border border-gray-300 bg-white  rounded-md  w-auto h-[200px]  p-5 overflow-hidden"
          overlayClassName="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center"
        >
          <h2>Add New Row</h2>
          <form onSubmit={handleSubmit} className=" font-roboto mt-2 h-60">
            <input
              type="text"
              name="first_name"
              value={newRow.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[10rem] mr-5"
            />
            <input
              type="text"
              name="last_name"
              value={newRow.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[10rem] mr-5"
            />
            <input
              type="email"
              name="email"
              value={newRow.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[10rem] mr-5"
            />
            <input
              type="date"
              name="dob"
              value={newRow.dob}
              onChange={handleChange}
              placeholder="Date of Birth"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[10rem] mr-5"
            />

            <button type="submit" className=" mx-3 text-green-400">
              Add Row
            </button>

            <button
              type="button"
              onClick={closeModal}
              className=" text-red-500"
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AddROW;
