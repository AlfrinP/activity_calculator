import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { baseURL } from "../Util";
import ModalLayout from "../modal/modalLayout";

const CheckCertificate = ({ isOpen, handleOpen, data = [] }) => {
  const [status, setStatus] = useState(null);
  const [comment, setComment] = useState(null);

  const fetchData = async () => {
    try {
      const requestData = {
        message: comment,
        status: status,
        certificate_id: data.ID,
      };

      if (!comment || !status || !data.ID) {
        throw new Error("Required fields are missing");
      }

      console.log(requestData);

      const response = await axios.post(
        `${baseURL}commentstatus`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <ModalLayout isOpen={isOpen} handleOpen={handleOpen} header={null}>
      <div className="center w-full justify-evenly border-t pt-5 border-black">
        <div className="center flex-col w-full">
          <div className="relative group hover:bg-black w-40">
            <img
              alt="nature"
              className="w-full block group-hover:filter group-hover:brightness-50 transition cursor-pointer"
              src={data.file_url}
            />
            <a
              target="/"
              href={data.file_url}
              className="text-white w-fit absolute border hidden group-hover:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-white rounded-full px-4 py-2"
            >
              View
            </a>
          </div>
        </div>
        <div className="flex flex-col center gap-2">
          <h3 className="text-purple-500">Comment box</h3>
          <div className="w-64 ">
            <Textarea
              color="purple"
              label="Comment"
              className="bg-gray-200"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-3">
            <Button
              className="bg-blue-gray-100 px-3 py-2 rounded-full text-lowercase capitalize"
              style={{ color: "#2930D4" }}
              onClick={() => {
                setStatus("approved");
                status == "approved" ? fetchData() : null;
              }}
            >
              Approve
            </Button>
            <Button
              className="bg-red-100 px-3 py-2 rounded-full text-lowercase capitalize"
              style={{ color: "#FF3333" }}
              onClick={() => {
                setStatus("rejected");
                status == "rejected" ? fetchData() : null;
              }}
            >
              Rejected
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-purple-500 ml-4">Details</h3>
        <div className="p-5 rounded-xl box2">
          <ul className="flex flex-row justify-between">
            <li className="flex flex-col">
              <h3>Activity Name</h3>
              <h4 className="font-bold text-black text-xl">{data.name}</h4>
            </li>
            <li className="flex flex-col">
              <h3>Category</h3>
              <h4 className="font-bold text-black text-xl">{data.category}</h4>
            </li>
            <li className="flex flex-col">
              <h3>Level</h3>
              <h4 className="font-bold text-black text-xl">{data.level}</h4>
            </li>
          </ul>
          <div className="flex flex-col mt-3">
            <ul className="flex flex-row justify-between">
              <li className="flex flex-col">
                <h3>Date</h3>
                <h4 className="font-bold text-black text-xl">
                  {new Date(data.date).toLocaleDateString()}
                </h4>
              </li>
              <li className="flex flex-col">
                <h3>Points</h3>
                <h4 className="font-bold text-black text-xl">{data.point}</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default CheckCertificate;
