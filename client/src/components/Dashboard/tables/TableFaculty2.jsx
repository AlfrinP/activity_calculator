import React from "react";
import Student2 from "../Student2";
import { Dialog } from "@material-tailwind/react";

function TableFaculty({ isOpen, handleOpen }) {
  const [openStudent, setOpenStudent] = React.useState(false);
  const handleOpenStudent = () => setOpenStudent(!openStudent);

  const data = [
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Aalap",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Abhishek",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Adithya",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Agna",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Aisac",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Aiswarya",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Aiswarya",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Aiswarya",
      point: "15",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Aiswarya",
      point: "15",
    },
  ];
  return (
    <Dialog size="lg" open={isOpen} handler={handleOpen} className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-[400px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-7 h-5 w-5 float-right mt-5"
        onClick={handleOpen}
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
      <Student2
        isOpen={openStudent}
        handleOpen={handleOpenStudent}
      />
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
              Name
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Point
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              action
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {data.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-[#F7F6FE]"
            >
              <td className="px-5 py-2 text-center font-semibold text-black">{item.no}</td>
              <td className="px-5 py-2 text-center font-semibold text-black">{item.regno}</td>
              <td className="px-5 py-2 text-center font-semibold text-black">{item.name}</td>
              <td className="px-5 py-2 text-center font-semibold text-black">{item.point}</td>
              <td className="px-5 py-2 text-center  text-[#512B81] hover:underline cursor-pointer">
                <a onClick={handleOpenStudent} href="#">View</a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Dialog>
  );
}

export default TableFaculty;
