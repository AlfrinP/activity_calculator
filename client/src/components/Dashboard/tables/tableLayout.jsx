import React from "react";

export default function TableLayout({header,children}) {
  return (
    <table className="w-full text-sm text-center text-black ">
      <thead className="text-black uppercase bg-gray-5 border-b text-sm ">
        <tr>
          {header.map((item,index)=>(
            <th scope="col" className="px-5 py-3 text-center" key={index}>
            {item}
          </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-black text-md">
        {children}
      </tbody>
    </table>
  );
}


