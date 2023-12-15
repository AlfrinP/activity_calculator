import React, { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import CalenderIcon from "../../assets/General/Calendargrey.svg";
import Calender from "../../assets/General/Calendar.svg";
import Clear from "../../assets/General/Clear.svg";

const DatePicker = () => {
  const calendarContainerRef = useRef();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const calendarContainer = calendarContainerRef.current;

    if (calendarContainer) {
      calendarContainer.className +=
        " bg-white p-4 border border-blue-gray-50 rounded-lg shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 focus:outline-none break-words whitespace-normal";
    }
  }, []);

  const handleClearClick = () => {
    setSelectedDate();
  };

  return (
    <div className="relative flex items-center h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
      <img src={selectedDate ? Calender : CalenderIcon} alt="calender" className="w-5 mr-2" />
      <Flatpickr
        id="date-picker"
        options={{
          dateFormat: "d/m/Y",
        }}
        placeholder="DD/MM/YYYY"
        className="outline-none"
        value={selectedDate}
        onChange={(dates) => setSelectedDate(dates[0])}
      />
      <img
        src={Clear}
        alt="clear"
        className="w-4 ml-2 cursor-pointer absolute mr-2 right-0"
        onClick={handleClearClick}
      />
    </div>
  );
};

export default DatePicker;
