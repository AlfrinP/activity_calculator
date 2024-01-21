import React, { useState } from "react";
import Printer from "../../../assets/General/Blueprint.png";
import Download from "../../../assets/General/material-symbols_download.png";
import { Dialog, Button } from "@material-tailwind/react";

function BatchReport({ isOpen, handleOpen, data }) {
  return (
    <Dialog
      size="lg"
      open={isOpen}
      handler={handleOpen}
      className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-[400px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-5 h-5 w-5 float-right mt-3"
        onClick={handleOpen}
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
      <table className="w-full text-sm text-left rtl:text-right text-black ">
        <thead className="text-black uppercase bg-gray-5 border-b text-sm ">
          <tr>
            <th scope="col" className="px-5 py-3 text-center ">
              No
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Regno
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Student Name
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Total Activity Point
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {data.students.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-[#F7F6FE] ">
              <td className="px-5 py-2 text-center font-semibold text-black">
                {index + 1}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.regno}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.name}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-end gap-8 mt-4 mr-4">
        <Button
          className="bg-blue-gray-100 text-white w-fit flex flex-row center justify-center gap-2 px-2 rounded-md text-lowercase capitalize"
          style={{ color: "#2930D4" }}
        >
          <img src={Printer} alt="Printer" />
          <span className="mr-6">Print</span>
        </Button>
        <Button
          className="bg-green-100 text-green-600 w-fit flex flex-row center justify-center gap-2 p-1 rounded-md text-lowercase capitalize"
          style={{ color: "#076F2C" }}
        >
          <img src={Download} alt="Download" className="w-[30px] pl-2" />
          <span className="mr-6">Download</span>
        </Button>
      </div>
    </Dialog>
  );
}

export default BatchReport;
