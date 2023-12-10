// TimeSlotTable.js
import React from 'react';

const TimeSlotTable = ({ selectedDate, timeslots, onSlotSelect, bookedSlots }) => {
  return (
    <div className="time-slot-table">
      <h3>Select Time Slot:</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timeslots.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              <td>{bookedSlots[`${selectedDate}-${time}`] ? 'Booked' : 'Available'}</td>
              <td>
                {!bookedSlots[`${selectedDate}-${time}`] && (
                  <button onClick={() => onSlotSelect(time)}>Book</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSlotTable;
