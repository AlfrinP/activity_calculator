import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import ModalLayout from "../modal/modalLayout";
import DropZone from "./DropZone";
import { baseURL, bytesToMB, form } from "../Util";

export default function FileUploadModel({ isOpen, handleOpen }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [date, setDate] = useState("");
  const [uploadedCertificate, setUploadedCertificate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedActivity("");
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

  const handleCancel = () => {
    setSelectedCategory("");
    setSelectedActivity("");
    setSelectedLevel(0);
    setSelectedPosition("");
    setDate("");
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

  const handleFileChange = async (file) => {
    const fileDetails = {
      name: file.name,
      size: bytesToMB(file.size),
      type: file.type.split("/")[1],
    };

    setFileDetails(fileDetails);
    setUploadedCertificate(file);
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
        <DropZone onFileChange={handleFileChange} />
        <div className="w-full">
          <h4 className="text-black text-lg font-semibold mb-2">Details</h4>
          <hr className="border-gray-400" />
          <div className="grid grid-cols-2 gap-5 mt-4 h-min">
            <Select
              size="lg"
              required
              variant="outlined"
              label="Category"
              value={selectedCategory}
              onChange={(val) => handleCategoryChange(val)}
            >
              {form.map((categoryData, index) => (
                <Option key={index} value={categoryData.category}>
                  {categoryData.category}
                </Option>
              ))}
            </Select>

            {selectedCategory && (
              <Select
                size="lg"
                required
                variant="outlined"
                label="Activity Name"
                value={selectedActivity}
                onChange={(val) => handleActivityChange(val)}
              >
                {form
                  .find(
                    (categoryData) => categoryData.category === selectedCategory
                  )
                  ?.data.map((activityData, index) => (
                    <Option key={index} value={activityData.activity_name}>
                      {activityData.activity_name}
                    </Option>
                  ))}
              </Select>
            )}

            {selectedActivity &&
              form
                .find(
                  (categoryData) => categoryData.category === selectedCategory
                )
                ?.data.find(
                  (activityData) =>
                    activityData.activity_name === selectedActivity
                )?.levels && (
                <Select
                  size="lg"
                  required
                  variant="outlined"
                  label="Levels"
                  value={selectedLevel}
                  onChange={(val) => handleLevelChange(val)}
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
                      <Option key={index} value={index}>
                        {level}
                      </Option>
                    ))}
                </Select>
              )}

            {selectedActivity &&
              form
                .find(
                  (categoryData) => categoryData.category === selectedCategory
                )
                ?.data.find(
                  (activityData) =>
                    activityData.activity_name === selectedActivity
                )?.positions && (
                <Select
                  size="lg"
                  required
                  variant="outlined"
                  label="Position"
                  value={selectedPosition}
                  onChange={(val) => handlePositionChange(val)}
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
                      <Option key={index} value={position}>
                        {position}
                      </Option>
                    ))}
                </Select>
              )}

            <Input
              size="lg"
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="center justify-end w-full gap-3 ">
          <Button
            className="text-[#512B81] underline"
            onClick={handleCancel}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="capitalize bg-[#512B81] flex items-center gap-1"
            onClick={handleFormSubmit}
          >
            {loader && <Spinner color="purple" />}Upload Files
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
}
