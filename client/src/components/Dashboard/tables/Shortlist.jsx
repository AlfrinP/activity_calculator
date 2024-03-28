import React, { useState, useEffect } from "react";
import Search from "../../../assets/General/Search.svg";
import axios from "axios";
import { baseURL } from "../../Util";
import ModalLayout from "../../modal/modalLayout";

function Shortlist({ isOpen, handleOpen, batch, department }) {
  const [responseData, setResponseData] = useState(null);

  console.log("data");
  console.log(batch);
  console.log(department);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { batch: batch, department: department };
        const response = await axios.post(`${baseURL}studentsfilter`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, batch, department]);

  return (
    <ModalLayout isOpen={isOpen} handleOpen={handleOpen} header="Shortlist ">
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
        {responseData ? (
          <tbody className="text-black text-md">
            {responseData.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "even:bg-[#F7F6FE]" : "odd:bg-white"
                }
              >
                <td className="px-5 py-2 text-center">{item.ID}</td>
                <td className="px-5 py-2 text-center">{item.email}</td>
                <td className="px-5 py-2 text-center">{item.department}</td>
                <td className="px-5 py-2 text-center text-[#512B81] cursor-pointer">
                  <Add id={item.ID} />
                </td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </ModalLayout>
  );
}

function Add({ id }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleButtonClick = () => {
    const fetchData = async () => {
      try {
        const data = {
          faculty_name: localStorage.getItem("name"),
          student_id: id,
        };
        const response = await axios.post(`${baseURL}shortlist`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setIsAdded(true);
  };

  return (
    <a onClick={handleButtonClick} href="#">
      {isAdded ? (
        <span style={{ color: "green" }}>Added</span>
      ) : (
        <span>Add</span>
      )}
    </a>
  );
}

export default Shortlist;
