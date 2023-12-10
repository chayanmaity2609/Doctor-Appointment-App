// BookingTable.js
import React from 'react';
import TimeSlotTable from './TimeSlotTable';

const BookingTable = ({ date, timeslots, bookSlot, bookedSlots }) => {
  return (
    <div className="booking-table">
      <h3>Booking Table for {date.toDateString()}</h3>
      <TimeSlotTable selectedDate={date} timeslots={timeslots} onSlotSelect={bookSlot} bookedSlots={bookedSlots} />
    </div>
  );
};

export default BookingTable;
