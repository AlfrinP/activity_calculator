import React, { useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-tailwind/react";
import Add from "../../assets/General/Addicon.svg";
import { baseURL, bytesToMB, form } from "../Util";
import { Spinner } from "@material-tailwind/react";
import { DropzoneButton } from "../fileupload/dropzoneButton";
import { ContainedInputs } from "../selectInput/ContainedInputs";
import ModalLayout from "../modal/modalLayout";

function FileUploadModel({ isOpen, handleOpen }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [changestatus, setChangestatus] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [date, setDate] = useState("");
  const [uploadedCertificate, setUploadedCertificate] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedActivity(null);
    setSelectedLevel(0);
    setSelectedPosition("");
  };

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity);
    setSelectedLevel(0);
    setSelectedPosition("");
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setSelectedPosition("");
  };

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileDetails = {
      name: file.name,
      size: bytesToMB(file.size),
      type: file.type.split("/")[1],
    };

    setChangestatus(fileDetails);
    setUploadedCertificate(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("name", selectedActivity);
    bodyFormData.append("level", Number(selectedLevel));
    bodyFormData.append("category", selectedCategory);
    bodyFormData.append("position", selectedPosition);
    bodyFormData.append("date", date);
    bodyFormData.append("upload_certificate", uploadedCertificate);

    try {
      setLoader(true);
      const response = await axios.post(`${baseURL}certificate`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setLoader(false);
      handleOpen();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ModalLayout
      header="Upload Certificate and Details"
      isOpen={isOpen}
      handleOpen={handleOpen}
    >
      <form
        className="w-full flex flex-col items-center mt-6 gap-4"
        onSubmit={handleFormSubmit}
      >
        <DropzoneButton />

        <div className="w-full">
          <h4 className="text-black text-lg font-semibold mb-2">Details</h4>
          <hr className="border-gray-400" />
          <div className="grid grid-cols-2 gap-5 mt-4 h-min">
            {/* Category dropdown */}

            <select
              required
              className=" outline-none w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer  text-blue-gray-700  "
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
                required
                className=" outline-none w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer  text-blue-gray-700  "
                variant="outlined"
                label="Activity Name"
                name="name"
                onChange={(e) => handleActivityChange(e.target.value)}
              >
                {form
                  .find(
                    (categoryData) => categoryData.category === selectedCategory
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
                  required
                  className=" outline-none w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer  text-blue-gray-700  "
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
                      <option key={index} value={index}>
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
                  required
                  className=" outline-none w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer  text-blue-gray-700  "
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
              className="w-full h-full px-3 py-3 cursor-pointer font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700  placeholder-shown:border placeholder-shown:placeholder-shown:border-t-blue-gray-200focus:border-gray-900  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="center justify-end w-full gap-3 ">
          <Button
            className="text-[#512B81] underline"
            onClick={handleOpen}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="capitalize bg-[#512B81] flex items-center gap-1"
            onClick={handleFormSubmit}
          >
            {loader ? <Spinner color="purple" /> : null}Upload Files
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default FileUploadModel;
