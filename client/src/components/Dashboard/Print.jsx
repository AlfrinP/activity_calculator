import React from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import Printer from "../../assets/General/Blueprint.png";
import Certificate from "../../assets/General/certificate.png";
import Download from "../../assets/General/material-symbols_download.png";

const Print = ({ isOpen, handleOpen }) => {
  return (
    <Dialog open={isOpen} handler={handleOpen} className="p-4">
      <DialogHeader>
        <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-purple-900">Details</h1>
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
        <div className='center border-t border-gray-600  w-full center'>
          <img src={Certificate} alt='certificate' className='w-full'/>
        </div>
        <div className='flex flex-row justify-end gap-8 mt-4 mr-4'>
          <Button className='bg-blue-gray-100 text-white w-fit  flex-row center gap-2 p-2 rounded-md text-lowercase capitalize px-4' style={{color:'#2930D4'}}>
            <img src={Printer} alt="Printer" />
            <span>Print</span>
          </Button>
          <Button className='bg-green-100 text-green-600 w-fit flex-row center gap-2 p-2 rounded-md text-lowercase capitalize px-4' style={{color:'#076F2C'}}>
            <img src={Download} alt="Download" className='w-[30px]' />
            <span>Download</span>
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default Print;
