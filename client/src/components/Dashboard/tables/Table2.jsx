import React from "react";

function Table2({ data = [], year }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-[200px]">
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
          </tr>
        </thead>
        <tbody key={year} className="text-black text-md">
          {data
            .filter((item) => new Date(item.date).getFullYear() === year)
            .map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "even:bg-[#F7F6FE]" : "odd:bg-white"}>
                <td className="px-5 py-2 text-center">{index + 1}</td>
                <td className="px-5 py-2 text-center">{item.name}</td>
                <td className="px-5 py-2 text-center">{item.level}</td>
                <td className="px-5 py-2 text-center">{item.point}</td>
                <td className="px-5 py-2 text-center">
                  {new Date(item.date).getFullYear()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
