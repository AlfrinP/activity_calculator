import React from "react";

function Table4({ data }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-[200px] mt-2">
      <table className="w-full text-sm text-left rtl:text-right text-black mt-2">
        <thead className="text-black uppercase bg-gray-5 border-b text-sm">
          <tr>
            <th scope="col" className="px-5 py-3 text-center">
              No
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Name
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Reg no
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Point
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Year
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {data?data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "odd:bg-white" : "even:bg-[#F7F6FE]"}>
              <td className="px-5 py-2 text-center font-semibold">
                {index + 1}
              </td>
              <td className="px-5 py-2 text-center font-semibold">
                {item.name}
              </td>
              <td className="px-5 py-2 text-center font-semibold">
                {item.regno}
              </td>
              <td className="px-5 py-2 text-center font-semibold">
                {item.total_points}
              </td>
              <td className="px-5 py-2 text-center font-semibold">
                {item.year}
              </td>
            </tr>
          )):null}
        </tbody>
      </table>
    </div>
  );
}

export default Table4;
