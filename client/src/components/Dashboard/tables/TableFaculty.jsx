import React, { useState } from "react";
import ViewCertificate from "../ViewCertificate";
import TableFaculty2 from "./TableFaculty2";
import Student2 from "../Student2";
import { Button } from "@material-tailwind/react";

function TableFaculty({ data }) {
  
  const [openTable, setOpenTable] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);

  const handleOpenTable = () => setOpenTable(!openTable);
  const handleOpenStudent = () => (
    setOpenStudent(!openStudent), setOpenTable(!openTable)
  );

  return (
    <div className="group shadow-lg text-black rounded-lg overflow-x-auto sm:rounded-lg w-full h-max-full transition cursor-pointer">
      <TableFaculty2 isOpen={openTable} handleOpen={handleOpenTable} data={data} />
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
                {item.regno}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.name}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.certificates[0].point}
              </td>
              <td className="px-5 py-2 text-center  text-[#512B81] hover:underline cursor-pointer">
                <a onClick={handleOpenStudent} href="#" target="_blank">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="w-full center py-1 border-t-[1px] border-black"
        onClick={handleOpenTable}
      >
        <Button variant="text">Show More</Button>
      </div>
    </div>
  );
}

export default TableFaculty;
