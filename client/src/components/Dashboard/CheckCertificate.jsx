import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Textarea,
  Button,
} from "@material-tailwind/react";
import LargeVeiw2 from "./LargeVeiw2";
import { baseURL } from "../Util";

const CheckCertificate = ({ isOpen, handleOpen, data = "" }) => {
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [id, setId] = useState(data.ID);

  useEffect(() => {
    setId(data.ID);
  }, [data.ID]);
  const fetchData = async () => {
    try {
      const requestData = {
        message: comment,
        status: status,
        certificate_id: id,
      };
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
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Dialog open={isOpen} handler={handleOpen} className="p-4">
      <DialogHeader>
        <div className="flex items-center justify-end w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 float-right"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-row w-full justify-center gap-6 border-t border-black">
          <div className="flex flex-col w-full">
            <LargeVeiw2 />
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
                  fetchData();
                }}
              >
                Approve
              </Button>
              <Button
                className="bg-red-100 px-3 py-2 rounded-full text-lowercase capitalize"
                style={{ color: "#FF3333" }}
                onClick={() => {
                  setStatus("rejected");
                  fetchData();
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
                <h4 className="font-bold text-black text-xl">
                  {data.category}
                </h4>
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
      </DialogBody>
    </Dialog>
  );
};

export default CheckCertificate;
