import React from "react";
import {IconButton } from "@material-tailwind/react";
import Download from "../../assets/icons/download.svg";
import Delete from "../../assets/General/deletered.svg";
import ModalLayout from "../modal/modalLayout";

const ViewCertificate = ({ isOpen, handleOpen, data = "" }) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      handleOpen={handleOpen}
      header={"Uploaded Details"}
      className="p-4"
    >
      <div className="flex-col w-full center gap-3">
        <div className="center w-full ">
          <div className="flex flex-col w-2/3">
            <h3 className="mb-2 underline">Activity Name</h3>
            <span className="font-semibold text-lg">{data.name}</span>

            <h3 className="mb-2 mt-2 underline">Category</h3>
            <span className="font-semibold text-lg">{data.category}</span>

            <h3 className="mb-2 mt-2 underline">Level</h3>
            <span className="font-semibold text-lg">{data.level}</span>

            <h3 className="mb-2 mt-2 underline">Date</h3>
            <span className="font-semibold text-lg">
              {new Date(data.date).toLocaleDateString()}
            </span>
          </div>
          <div className="block w-1/3 h-full">
            <img alt="nature" className="w-full block" src={data.file_url} />
          </div>
        </div>
        <div className="justify-end w-full flex-row center gap-2">
          <a href={data.file_url} target="/">
            <IconButton className="bg-green-100" size="md">
              <img src={Download} alt="download" className="h-8" />
            </IconButton>
          </a>
          <IconButton className="bg-red-200" size="md">
            <img src={Delete} alt="delete" className="h-4" />
          </IconButton>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ViewCertificate;
