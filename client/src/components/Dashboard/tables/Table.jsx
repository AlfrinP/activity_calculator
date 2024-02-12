import React, { useState } from "react";
import ViewCertificate from "../ViewCertificate";
import { capitalize } from "../../Util";

function Table({ data }) {
  const [openViewCertificate, setOpenViewCertificate] = useState(false);
  const [selectedData, setSelectedData] = useState();

  console.log(selectedData);

  const handleOpenViewCertificate = (item) => {
    setSelectedData(item);
    setOpenViewCertificate(true);
  };

  const approvalState = {
    pending: "text-blue-900 bg-blue-50",
    rejected: "text-red-900 bg-red-50",
    approved: "text-amber-900 bg-amber-50",
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full">
      <ViewCertificate
        isOpen={openViewCertificate}
        handleOpen={() => setOpenViewCertificate(!openViewCertificate)}
        data={selectedData}
      />
      <table className="w-full text-sm text-left rtl:text-right text-black">
        <thead className="text-black uppercase bg-gray-5 border-b text-sm">
          <tr>
            <th scope="col" className="px-5 py-3 text-center">
              No
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Activity
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Level
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Point
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Year
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Approval
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {data?.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even:bg-[#F7F6FE]" : "odd:bg-white"}
            >
              <td className="px-5 py-2 text-center">{index + 1}</td>
              <td className="px-5 py-2 text-center">{item.name}</td>
              <td className="px-5 py-2 text-center">{item.level}</td>
              <td className="px-5 py-2 text-center">{item.point}</td>
              <td className="px-5 py-2 text-center">
                {new Date(item.date).getFullYear()}
              </td>
              <td className="px-5 py-2 center">
                <div
                  className={`center shrink-0 space-x-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                    approvalState[item.status]
                  }`}
                >
                  <div className="whitespace-nowrap text-center">
                    {capitalize(item.status)}
                  </div>
                </div>
              </td>
              <td
                className="px-5 py-2 text-center text-[#512B81] hover:underline cursor-pointer"
                onClick={() => handleOpenViewCertificate(item)}
              >
                View
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
