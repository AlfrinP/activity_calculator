import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import Certificate from "../../assets/General/certificate.png";

const LargeView2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
        <div className="relative">
      <img
        onClick={handleOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        alt="nature"
        className="w-full mt-10 ml-5 hover:filter hover:brightness-50 transition cursor-pointer"
        src={Certificate}
      />
      {isHovered && (
        <button
          className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-white rounded-full px-4 py-2 border-2 w-fit ml-5 mt-5"
          onClick={handleOpen}
        >
          View
        </button>
      )}
    </div>
      <Dialog size="lg" open={isOpen} onClose={handleOpen} className="p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5 float-right cursor-pointer"
          onClick={handleOpen}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="mt-10 center font-bold text-xl hover:text-black">View Certificate</h1>
        <div className='center border-t border-gray-600  w-full center justify-center items-center'>
          <img src={Certificate} alt='certificate' className='w-full'/>
        </div>
      </Dialog>
    </>
  );
};

export default LargeView2;
