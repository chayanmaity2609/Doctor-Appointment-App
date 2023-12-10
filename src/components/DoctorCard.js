// DoctorCard.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './DoctorCard.css';

const DoctorCard = ({ name, department, fees, clinicName, photo, onDateSelect, bookedSlots, bookSlot }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = () => {
    onDateSelect(selectedDate);
  };

  const handleBookSlot = (time) => {
    // Check if selectedDate is a valid Date object
    if (!(selectedDate instanceof Date) || isNaN(selectedDate)) {
      alert('Please select a valid date.');
      return;
    }

    bookSlot(time, name);
  };

  return (
    <div className="doctor-card">
      <img className="doctor-photo" src={photo} alt="Doctor" />
      <div className="doctor-details">
        <h3 className="doctor-name">{name}</h3>
        <div className="doctor-info">
          <p><strong>Department:</strong> {department}</p>
          <p><strong>Fees:</strong> Rs.{fees}</p>
          <p><strong>Clinic:</strong> {clinicName}</p>
        </div>
      </div>
      <div className="date-picker-section">
        <p>Select Date:</p>
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
        <button onClick={handleDateSelect}>Select Date</button>
        {selectedDate && (
          <div className="book-slot">
            <h4>Available Time Slots:</h4>
            <ul>
              {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                <li key={time}>
                  {bookedSlots[`${format(selectedDate, 'yyyy-MM-dd')}-${time}`] ? (
                    <span className="booked">Booked</span>
                  ) : (
                    <button onClick={() => handleBookSlot(time)}>Book {time}</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
