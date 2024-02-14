import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import Download from "../../assets/General/material-symbols_download.png";
import Delete from "../../assets/General/deletered.svg";

const ViewCertificate = ({ isOpen, handleOpen, data = "" }) => {
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
              <Button
                className="flex flex-row bg-green-100 w-fit p-1 px-4 rounded-md text-lowercase capitalize"
                style={{ color: "#076F2C" }}
              >
                <img src={Download} alt="download" className=" w-[19px]" />
                Download
              </Button>
            </a>
            <Button
              className="flex flex-row bg-red-200 w-fit p-1 px-4 rounded-md text-lowercase capitalize"
              style={{ color: "#FF3333" }}
            >
              <img src={Delete} alt="delete" />
              Delete
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ViewCertificate;
