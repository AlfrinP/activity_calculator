import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-tailwind/react";
import {
  Select,
  Option,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import Certificate from "../../assets/General/certificate.png";
import BlueClear from "../../assets/General/Blueclear.svg";
import Delete from "../../assets/General/deletered.svg";
import DatePicker from "./DatePicker";

const EditCertificate = ({ isOpen, handleOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Dialog open={isOpen} handler={handleOpen} className="p-4">
    <DialogHeader>
        <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-gray-600">Uploaded Details</h1>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3 h-5 w-5 float-right"
        onClick={handleOpen}
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-row w-full justify-center">
          <div className="flex flex-col w-full">
            <h3 className="mb-4">Activity Name</h3>
            <input
              type="text"
              placeholder="Eg: Hack2Hack"
              className="border-2 border-blue-gray-100 p-2 rounded-lg mb-2"
            />
            <h3 className="mb-2">Category</h3>
            <Select variant="outlined" label="Event" className="mb-2">
              <Option>Techical</Option>
              <Option>Hackathon</Option>
              <Option>Sports</Option>
              <Option>Arts</Option>
              <Option>Workshops</Option>
            </Select>
            <h3 className="mb-2 mt-2">Level</h3>
            <Select variant="outlined" label="Zone" className="w-full">
              <Option>E-zone</Option>
              <Option>District</Option>
              <Option>State</Option>
              <Option>National</Option>
              <Option>International;</Option>
            </Select>
            <h3 className="mb-2 mt-2">Date</h3>
            <div className="flex flex-row">
              <DatePicker />
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-end gap-2">
              <Button
                onClick={handleOpen}
                className="flex flex-row bg-blue-gray-100 w-fit p-1 px-5 rounded-md text-lowercase capitalize"
                style={{ color: "#2930D4" }}
              >
                <img src={BlueClear} alt="edit" />
                Cancel
              </Button>
              <Button
                className="flex flex-row bg-red-200 w-fit p-1 px-4 rounded-md text-lowercase capitalize"
                style={{ color: "#FF3333" }}
              >
                <img src={Delete} alt="clear" />
                Delete
              </Button>
            </div>
            <div className="relative">
      <img
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        alt="nature"
        className="w-full mt-10 ml-5 hover:filter hover:brightness-50 transition cursor-pointer"
        src={Certificate}
      />
      {isHovered && (
        <button
          className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-white rounded-full px-4 py-2 border-2 w-fit ml-5"
        >
          Change
        </button>
      )}
    </div>
            <div className="flex flex-row gap-5 justify-end mt-10">
              <Button
                className="flex flex-row bg-purple-900 w-fit p-2 px-6 rounded-full text-lowercase capitalize"
                style={{ color: "white" }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default EditCertificate;
