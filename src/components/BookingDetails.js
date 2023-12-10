// components/BookingDetails.js

import React from 'react';

const BookingDetails = ({ bookingHistory }) => {
  return (
    <div>
      <h2>Booking Details Page</h2>
      {Object.keys(bookingHistory).length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(bookingHistory).map(([key, status]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No booking history yet.</p>
      )}
    </div>
  );
};

export default BookingDetails;
