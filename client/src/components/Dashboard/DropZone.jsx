import React, { useState } from 'react';
import Tick from '../../assets/icons/tick.svg';
import Wrong from '../../assets/icons/wrong.svg';
import Select from '../../assets/icons/select.svg';

const DropZone = () => {
  const [bgColor, setBgColor] = useState("#E7E2E8");
  const [icon, setIcon] = useState(Select);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file && file.size > maxSize) {
      alert("File size exceeds 5MB limit");
      // You can optionally clear the input value here
      event.target.value = null;
      setBgColor("#FFADB0"); // Change background color to red
      setIcon(Wrong); // Change icon to wrong
    } else {
      // Handle file upload logic here
      console.log("File uploaded:", file);
      setBgColor("#F4FFF0"); // Change background color to green
      setIcon(Tick); // Change icon to tick
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer ${bgColor === "#E7E2E8" ? "bg-purple-50 dark:bg-gray-700" : bgColor === "#FFADB0" ? "bg-red-200 dark:bg-red-300" : "bg-green-50 dark:bg-green-200"}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <img src={icon} alt="icon" className='w-8 h-8 mb-4 text-gray-500' />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or PDF (MAX. 5MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            onChange={handleFileUpload}
            accept=".svg, .png, .jpg, .jpeg, .pdf"
            // Adding accept attribute to allow only specific file types
          />
        </label>
      </div>
    </>
  );
};

export default DropZone;
