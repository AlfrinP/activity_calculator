import React from "react";

function Table2() {
  
  const data = [
    {
      no: "01",
      activity: "NSS",
      level: "District",
      point: "15",
      year: "23-24",
    },
    {
      no: "01",
      activity: "NSS",
      level: "District",
      point: "15",
      year: "23-24",
    },
    {
      no: "01",
      activity: "NSS",
      level: "District",
      point: "15",
      year: "23-24",
    },
    {
      no: "01",
      activity: "NSS",
      level: "District",
      point: "15",
      year: "23-24",
    },
    {
      no: "01",
      activity: "NSS",
      level: "District",
      point: "15",
      year: "23-24",
    },
    {
      no: "01",
      activity: "NSS",
      level: "District",
      point: "15",
      year: "23-24",
    },
  ];
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
        <tbody className="text-black text-md">
          {data.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-[#F7F6FE] "
            >
              <td className="px-5 py-2 text-center text-black">{item.no}</td>
              <td className="px-5 py-2 text-center text-black">{item.activity}</td>
              <td className="px-5 py-2 text-center text-black">{item.level}</td>
              <td className="px-5 py-2 text-center text-black">{item.point}</td>
              <td className="px-5 py-2 text-center text-black">{item.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
