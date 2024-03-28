import React from "react";
import ViewCertificate from "../ViewCertificate";
import TableFaculty2 from "./TableFaculty2";
import Student2 from "../Student2";
import { Button } from "@material-tailwind/react";

function TableFaculty({ isOpen, handleOpen, data }) {
  const [openTable, setOpenTable] = React.useState(false);
  const handleOpenTable = () => setOpenTable(!openTable);

  const [openStudent, setOpenStudent] = React.useState(false);
  const handleOpenStudent = () => setOpenStudent(!openStudent);

  return (
    <div className=" relative group shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black rounded-lg overflow-x-auto sm:rounded-lg w-full h-max-full hover:filter hover:brightness-50 transition cursor-pointer">
      <TableFaculty2 isOpen={openTable} handleOpen={handleOpenTable} />
      <Student2 isOpen={openStudent} handleOpen={handleOpenStudent} />
      <table className=" w-full text-sm text-left rtl:text-right text-black">
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
            <tr key={index} className="odd:bg-white even:bg-[#F7F6FE] ">
              <td className="px-5 py-2 text-center font-semibold text-black">
                {index + 1}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.department}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.email}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.batch}
              </td>
              <td className="px-5 py-2 text-center  text-[#512B81] hover:underline cursor-pointer">
                <a onClick={handleOpenStudent} href="#">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        <div className="absolute inset-0 items-center justify-center bottom-0 hidden group-hover:flex">
          <Button onClick={handleOpenTable} variant="text">
            Show More
          </Button>
        </div>
      </table>
    </div>
  );
}

export default TableFaculty;
