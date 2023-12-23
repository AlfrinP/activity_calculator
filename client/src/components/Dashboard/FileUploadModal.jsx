import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Button,
} from "@material-tailwind/react";
import Add from "../../assets/General/Addicon.svg";
import { baseURL, form } from "../Util";

function FileUploadModel({ isOpen, handleOpen }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [date, setDate] = useState("");
  const [uploadedCertificate, setUploadedCertificate] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedActivity(null);
    setSelectedLevel(null);
    setSelectedPosition(null);
  };

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity);
    setSelectedLevel(null);
    setSelectedPosition(null);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setSelectedPosition(null);
  };

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedCertificate(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("name", selectedActivity);
    bodyFormData.append("level", selectedLevel);
    bodyFormData.append("category", selectedCategory);
    bodyFormData.append("position", selectedPosition);
    bodyFormData.append("date", date);
    bodyFormData.append("upload_certificate", uploadedCertificate);

    try {
      const response = await axios.post(`${baseURL}certificate`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isOpen} handler={handleOpen} className="p-4">
      <DialogHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold text-black">Upload Files</h1>
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
        <form
          className="w-full flex flex-col items-center mt-6 gap-4"
          onSubmit={handleFormSubmit}
        >
          <label className="border-dashed border-2 center flex-col border-gray-300 rounded p-4 w-full bg-[#F7F6FE]">
            <h4 className="text-black text-center text-xl">
              Drop your files here!
            </h4>
            <p className="text-gray-400 text-center pb-4">or click</p>
            <div className="bg-[#512B81] rounded z-10 flex top-0 w-fit items-center justify-center gap-2 px-9 h-12 cursor-pointer">
              <img src={Add} alt="addicon" className="w-5" />
              <p className="text-white">Add files</p>
            </div>
            <input type="file" name="upload_certificate" className="hidden" onChange={handleFileChange} />
          </label>

          <div className="w-full">
            <h4 className="text-black text-md font-medium">OPTIONS</h4>
            <hr className="border-gray-400" />
            <div className="grid grid-cols-2 gap-5 mt-4 h-min">
              {/* Category dropdown */}
              <select
                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200  text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus: focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                variant="outlined"
                label="Category"
                name="category"
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {form.map((categoryData, index) => (
                  <option key={index} value={categoryData.category}>
                    {categoryData.category}
                  </option>
                ))}
              </select>

              {/* Activity dropdown */}
              {selectedCategory && (
                <select
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200  text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus: focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  variant="outlined"
                  label="Activity Name"
                  name="name"
                  onChange={(e) => handleActivityChange(e.target.value)}
                >
                  {form
                    .find(
                      (categoryData) =>
                        categoryData.category === selectedCategory
                    )
                    ?.data.map((activityData, index) => (
                      <option key={index} value={activityData.activity_name}>
                        {activityData.activity_name}
                      </option>
                    ))}
                </select>
              )}

              {/* Level dropdown */}
              {selectedActivity &&
                form
                  .find(
                    (categoryData) => categoryData.category === selectedCategory
                  )
                  ?.data.find(
                    (activityData) =>
                      activityData.activity_name === selectedActivity
                  )?.levels && (
                  <select
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200  text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus: focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    variant="outlined"
                    label="Levels"
                    name="level"
                    onChange={(e) => handleLevelChange(e.target.value)}
                  >
                    {form
                      .find(
                        (categoryData) =>
                          categoryData.category === selectedCategory
                      )
                      ?.data.find(
                        (activityData) =>
                          activityData.activity_name === selectedActivity
                      )
                      ?.levels.map((level, index) => (
                        <option key={index} value={level}>
                          {level}
                        </option>
                      ))}
                  </select>
                )}

              {/* Position dropdown */}
              {selectedActivity &&
                form
                  .find(
                    (categoryData) => categoryData.category === selectedCategory
                  )
                  ?.data.find(
                    (activityData) =>
                      activityData.activity_name === selectedActivity
                  )?.positions && (
                  <select
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200  text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus: focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    variant="outlined"
                    label="Position"
                    name="position"
                    onChange={(e) => handlePositionChange(e.target.value)}
                  >
                    {form
                      .find(
                        (categoryData) =>
                          categoryData.category === selectedCategory
                      )
                      ?.data.find(
                        (activityData) =>
                          activityData.activity_name === selectedActivity
                      )
                      ?.positions.map((position, index) => (
                        <option key={index} value={position}>
                          {position}
                        </option>
                      ))}
                  </select>
                )}

              {/* Date input */}
              <input
                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder="Activity Date"
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-4">
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="bg-[#512B81] rounded text-white px-4 py-2 text-sm font-medium cursor-pointer text-lowercase capitalize"
                style={{ color: "white" }}
              >
                Upload files
              </Button>
              <span className="text-gray-700">or</span>
              <Button
                className="text-[#512B81] underline bg-white shadow-none"
                type="button"
              >
                Cancel
              </Button>
            </div>
            <Button
              onClick={handleOpen}
              className="bg-[#512B81] rounded text-white  cursor-pointer w-fit text-lowercase capitalize"
              style={{ color: "white" }}
            >
              Done
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default FileUploadModel;
