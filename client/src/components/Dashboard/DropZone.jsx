import React, { useState } from "react";
import Tick from "../../assets/icons/tick.svg";
import Wrong from "../../assets/icons/wrong.svg";
import Add from "../../assets/icons/Addicon.svg";

const DropZone = ({onFileChange}) => {
  const [bgColor, setBgColor] = useState("#E7E2E8");
  const [icon, setIcon] = useState(null); // Null initial value for icon
  const [uploadMessage, setUploadMessage] = useState(""); // State for upload message

  const handleFileUpload = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file.size > maxSize) {
      setUploadMessage("File size exceeds 5MB limit");
      setBgColor("#FFADB0"); // Change background color to red
      setIcon(Wrong); // Change icon to wrong
    } else if (!file.type.startsWith('image/')) {
      // If file type is not an image
      setUploadMessage("Upload valid file format"); // Update upload message
      setBgColor("#FFADB0"); // Change background color to red
      setIcon(Wrong); // Change icon to wrong
    } else {
      setUploadMessage("Successfully uploaded");
      setBgColor("#F4FFF0"); // Change background color to green
      setIcon(Tick); // Change icon to tick
      onFileChange(file)
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // Check if the file type is an image
    if (file.type.startsWith("image/")) {
      handleFileUpload(file);
    } else {
      // Handle non-image file types here if needed
      console.log("Invalid file type. Only images are allowed.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (
      uploadMessage === "File size exceeds 5MB limit" &&
      bgColor !== "#FFADB0"
    ) {
      // Display a message indicating file upload unsuccessful
      setUploadMessage("File upload unsuccessful: File size exceeds 5MB limit");
      setBgColor("#FFADB0"); // Change background color to red
    } else if (uploadMessage === "") {
      setBgColor("#C7C3C8"); // Change background color on drag over
    }
  };

  const handleDragLeave = () => {
    if (
      uploadMessage === "File upload unsuccessful: File size exceeds 5MB limit"
    ) {
      // Reset upload message and background color
      setUploadMessage("");
      setBgColor("#E7E2E8");
    }
  };

  return (
    <div
      className={`flex items-center justify-center w-full`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{ backgroundColor: bgColor }}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-[20%] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer pb-4`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className=" text-2xl font-montserrat text-black dark:text-gray-400">
            Drop your files here!
          </p>
          <p className="text-gray-500 font-montserrat dark:text-gray-400 font-bold">
            or click
          </p>
        </div>
        {/* Render the button conditionally based on whether the upload was successful */}
        {icon ? (
          <button className='bg-purple-900 flex items-center py-2 px-8 font-montserrat text-white rounded-lg capitalize text-[15px]'>
            <img src={icon} alt="icon" className='w-5 mr-2'/>
            {uploadMessage}
          </button>
        ) : (
          <label htmlFor="dropzone-file" className='flex items-center gap-2 bg-purple-900 py-2 px-8 text-white font-montserrat rounded-lg capitalize text-[15px] cursor-pointer'>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".svg, .png, .jpg, .jpeg, .pdf"
            />
            <img src={Add} alt="icon" className="w-5 mr-2" />
            Add files
          </label>
        )}
      </label>
    </div>
  );
};

export default DropZone;
