import React from "react";
import ViewCertificate from "../ViewCertificate";

function Table({data}) {
  const [openViewCertificate, setOpenViewCertificate] = React.useState(false);
  const handleOpenViewCertificate = () => setOpenViewCertificate(!openViewCertificate);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full">
      <ViewCertificate
        isOpen={openViewCertificate}
        handleOpen={handleOpenViewCertificate}
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
              action
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {data.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-[#F7F6FE] "
            >
              <td className="px-5 py-2 text-center">{index+1}</td>
              <td className="px-5 py-2 text-center">{item.name}</td>
              <td className="px-5 py-2 text-center">{item.level}</td>
              <td className="px-5 py-2 text-center">{item.category}</td>
              <td className="px-5 py-2 text-center">{item.date}</td>
              <td className="px-5 py-2 center"><div className="p-2 px-3 w-fit rounded-full text-center font-semibold text-[#0909B1] bg-[#e2e2ff]">{item.approval}</div></td>
              <td className="px-5 py-2 text-center text-[#512B81] hover:underline cursor-pointer">
                <a onClick={handleOpenViewCertificate} href="#">View</a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
