import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingCalendar = ({ handleDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
    handleDateChange(date); // Pass the selected date back to the parent component
  };

  return (
    <div>
      <label>Select Date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleCalendarChange}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()} // Allow only future dates
        isClearable
      />
    </div>
  );
};

export default BookingCalendar;
