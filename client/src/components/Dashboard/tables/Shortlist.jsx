import React, { useState } from 'react';
import Search from "../../../assets/General/Search.svg";
import { Dialog } from "@material-tailwind/react";

function Shortlist({ isOpen, handleOpen, data }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleButtonClick = () => {
    setIsAdded(true);
  };
  console.log(data)

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
      <table className="w-full text-sm text-left rtl:text-right text-black">
        <thead className="text-black uppercase bg-gray-5 border-b text-sm">
          <tr>
            <th scope="col" className="px-5 py-3 text-center">
              SI.No
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Reg.no
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Student Name
            </th>
            <th scope="col" className="px-5 py-3 text-center w-[285px]">
              <div className="border border-gray-500 rounded-full center p-2 bg-[#F7F6FE]">
                <img src={Search} alt="search" className="w-6 mr-2" />
                <input
                  type="text"
                  placeholder="search"
                  className="items-center bg-[#F7F6FE] outline-none"
                />
              </div>
            </th>
          </tr>
        </thead>
        {
          data?(<tbody className="text-black text-md">
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even:bg-[#F7F6FE]' : 'odd:bg-white'}>
              <td className="px-5 py-2 text-center">{item.id}</td>
              <td className="px-5 py-2 text-center">{item.email}</td>
              <td className="px-5 py-2 text-center">{item.department}</td>
              <td className="px-5 py-2 text-center text-[#512B81] cursor-pointer">
                <a onClick={handleButtonClick} href="#">
                  {isAdded ? (
                    <span style={{ color: "green" }}>Added</span>
                  ) : (
                    <span>Add</span>
                  )}
                </a>
              </td>
            </tr>
          ))}
        </tbody>):null
        }
        
      </table>
    </Dialog>
  );
}

export default Shortlist;
