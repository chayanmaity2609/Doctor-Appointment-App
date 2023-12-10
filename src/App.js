// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookingTable from './components/BookingTable';
import BookingDetails from './components/BookingDetails';
import DoctorCard from './components/DoctorCard';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const timeslots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const [bookedSlots, setBookedSlots] = useState({});
  const [bookingHistory, setBookingHistory] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const doctors = [
    { name: 'Dr. Bhushan Arora', department: 'Cardiology', fees: 100, clinicName: 'City Hospital', photo: 'data:image/jpeg;base64,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' },
    { name: 'Dr. Chayan Maity', department: 'Dermatology', fees: 80, clinicName: 'Central Clinic', photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA8AMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBQYHBP/EAD4QAAEDAwIEAwUGBAUEAwAAAAEAAgMEBRESIQYxQVETImEUMnGBkQcVIzNCoWKx0fBSosHh8SRygpIWQ1P/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAfEQEBAAIDAQADAQAAAAAAAAAAAQIRAxIhMQRBYSL/2gAMAwEAAhEDEQA/AOqNapAEICIKNFhLCdJE2EpiU/RCUQJQlEUJRQpJFMUDFCSiKFAOSkkUggRIAy4gAcyeiq6riC1U4BNV4uf/AMGmQbc925H7qm4hurxW+zshfVHIZFSsdgOOMlzu4A+QyOZO1bV2c19LqqmQwy42a0kgHsMrneSR1x4cspto4+LbJI4NkqnQZOA6eJ0bD/5kaf3Vy1zJWa43tew8nNOQVymgtcdv9oc8FshJw33g4Y5Y/b/hemj4kj4cr2sjD30Mrz5HbaQcYx68wpOSLlw5SfHSyFGUFvrqe40cdVSP1xSDIJGFK7murijKZOUJRTpBCEWUBBOgBRhAk4TJwoGKjcFKVG5Fi7ARJgiVZ2ZMiQORDFAUSFyKYoCURQlAyZOUyoEoCjKFAy89cZBT4gOmQuG/YZXpUNVOyBgMnI9ccvis5XUXGbulbQ2xrKuoqXMAc/IDjzxt/ReG8FrW6BzV5c65lHQGZr4mjQSPEdgDZc2k4slrq00z2UbsOxqjkcD8wV485t9HiuvK9VSNcgHRVV2o2T074XgEOGxPT4KzrR7G1wnaQR5i0891XNroqgNL4J44ycNeQMZ+S5ez16LZ8qz+yOrm0XC3zknwS1wzyHQ7LoD1hvs+hEd7uZYNjG0n45W5evfx3eMr5HJNZWIyhKclAVtg6dpQ5SCKNOCgCIFBIkmCdQOEDkYQuQXYTpgEWFWQlCURQlAKFycoSqBKEoihRSQkp0JQCUydMUCVdcJ2wV9FEWF3tUngk6SQAd9/jyVihkYXjybOAIDu3981jObnjpxWY5bqv4ip2uozNu10XuOG+k9djz+fZc3tFooblfhJVubqjfrcGNDeowXY23OFpvtHutXRW6pbT+XS6LGTk4OrUR/lWYoTxBZKKG4UZp2OeQXmRhIlHPDiAQD9DsvLr178bOr3cfUjaq5OYybw2kDmeoGFR261NgLfCa+IsB17g6s/z+ajuPENVV1TpPu6FsTnF0v/AFDXH1xurG218M9ve9mrLTjzb7fFYylk8dJ1v1o/s+hlbVXOfX+E/ScEdfj/AHzWwcqbgujfS2YvlD2unfqAcMHSAAFcPXt45rGPmc13kjcgJROUZWnM6WUKSEGCiCjCkaUaGEYUYRhRBBC5EEzggvMpimSWmTFCiKEooUzk6EoBKEpymKBkJKclASgZJJLHLAJQMnLmRsL3uwB07lPUtNNAZ5vJGFS3G6MnuNBS0zHSUz5W+LIW4DGjck/THzTc3razG33SHiW0C6GmmcGvjaS57ejtsAfXCzXE1RW01B7FKHMa3AZKx+MjsR13WjguDbVXPtNfOyWme8upagEY0uOdDuxG+O+ypOM6qN8woojrlxqe/APhjoT645D5/HzWbtezG3HTCxVAdCKWdz5Hy7ABuo4J9By9VfcD2OSvayPSBTQuDpTnmM5DQOpIXkgjAm9loh+JId2s9+Q+pQ8Uxy2+x0bqSZzJYZHzeJHt5Rhu3pzx8kww3U5c7J/XYnnty6YUDgsJYbtVVlNRyw1hc2SMOdgnn1WqhuMhAErAfUdV6Y8le1yjITNqWSdCEaIBMiITaVAgiCYBP1RRtRtQNRtUEgTOTpnckVcpJJLTJnIUTkKAShciKAoBKEoio3FAzinijdM8MaMkoHFeu2s87pyfKwFoHqqgJoW00jGyefUDkoXuDZRGwYyMtUl0Jc+OQdtOEEWmFhnmIJa3y+gUyvWNTHdU3FVWynoNL3+VztOM7ud2WNZVF0ZdC7yZIc1xz/wlxLXSVk1TI8F8cbDoZ3KzXC8YoqGRkpfJLIQZG43B5bZ57fJeHL/VtfS48dYyLkVxhuLQWR4kY7WXN1t6A7ddidlXXWe0MrBDDPdRSZ1EtMbnkHm8gjUAfn8OinuEcpngiDGRtqmOYyYu2z+pnxwM/Iqo4upae3vp6RlQ6pY4l7XYDSHZ3D3Dc7Dyg9Avf+Lwbwvd4vyebWc6NpbaGlLI4rZGxsdQ3U+YOLnFnU6uueSzXFUdTfeJ5LDRSCGlpomNmeNyQRkBab7NqJ1Lw14x1BtS9zoGuOdEedsehOXfNeF9iqqTi6rubT4kFUGjw2+9qHXfbCt18jju32s/duEajhiy/etquNSH07gXBxGkt58v9FueHqp1fb46qQAOeG4A5ZI3UtTSwXOU09eS6jMbmPZqwNJBDjn4Z3QcH0Do7LSD3ToNQW42bqOQ0egB/ZNC38PQXuPJuw+KkgOpgb2Smyfw2DJMhcR9B/oo2u8OUb7HYqDOcXcSzcPVdKWxeJDJs4HmrHh7iSivcf4LtMgO7DzXg+0SzOulo1wtzPDu1cts9wfba2KdmpkkbvM3lnuF58srjWbdV3zbJGN0sbry2eviudDFUQO1B4/dRX+tqbZb31VLB4xZ7zM8wuvaa23FiAjYqThviOivlKZYXBsjDh7TzCa78V262xPLHiaYbCOPcrPaC/SdyXPaX7Qa+ap0izVDmE9GLeU0xqaWOd0ZjLhksdzCTLZF/t3SR5HYKHVibSeRXRDuQonIEAuQHkjco3HZAxUTijcVC92FQznYVqxnh0cTNJLi3OO5O6rKOD2qfTk6AMuIV4zeRuBy6qxFXey6jsFfUPOHMge4fwEjH+q5u3iOrfQx08j9TQ0NDydyMbLp9/pobnbKu3TF2mdmh5ad91xa7cKXiiqHQzyhtC04ZPCMuk9MfpP9hceTC5fHfhzmM9W9qpJLpUx0sY80pJa6QEN257rZ0nB1HFbqqKUh9TPFoEwGPD+HY5xuqPg9ot9fTOqfKzwjFG0HOgnG/r0+uV0PHqrhxTH05efLPxxuRogNXbqyImmaD7QzO7HjBD255EYB+QPfOSZA693tlvFSZWVc7c6AQXO3xJ8MA/MfBdA+2CFtBE2ujY1rK/FO89ngZH1AP/qshwHRSXm4VtycXNmpWNa/wzocxxJ0+G7lyDiQdivZLrC15sva6zTwRQxx08AAiiaGMA5ABD4IM2HEA529PVVlBd/ZpGQ3VwALtMda0YjkP+F45xv5bHb1zsvPfbs+aqlttskAc3Aq6nI0wg/pB5F5H0G56Z4T2tJpmsul0npoo9NNAMVjukpO5j9Qf1dx8VbWV/4s2rfOT+5wvFb2+x2uOOCLDBsMZzpByCT1PPdQVj7pFb5vuCGGWr8rQ6ok0tjHf1Vo9c0jpauSGJ2Mn8Rw7dki0b6dg3kns1PMKN01S6PxnkiRzPd1dcI3BgGBuVBMwh8bSd8jfKw3GHBHtzzWWvEc/NzQNitnE8MDi44Cakr6WrLhBMx+NjpK55SXymtsz9m0VTQWqriuMLovZ5HE6uWFdRzfedBW1jc+B4ZbG3o4d15OMrkKCgbC0ta6rcIi7tnqq+w12mzVVtopRI/8uDfuF58uTreqSuZ2Kd8F+jbre2OWfRIGnGoZ6ruVTBbLRQGo9jBDRs1rMlxXPajge426JtVlj5XO8rG8++Vo+EeJJamsNtuseKhv5eoYz6LGOfusosqaj4ta6o0fcdVHHn3zDjC1DKhk0QezkRncbqdzGDJDRlVVzMkD4ZYG7F+lw9F3+NxqAVFPy1f4d0bSnIzzXVAiVjmg6huEJezoQs7dpXUU7mFxDebd14qav8ZxDZT9U2jWFw7hROd6hZ59TIB+YVG2qe8kCQ7dE2NA547qBxLnBjAXOJwAO6opqqVo2eVo+H6eSGgNfUfmS/lg/pHT681Yi1o4PY6doOC851Y6lTEujYAPzHf5R3KUnk0HngeUHqfVA7ytJJy4+8StCCR7WAu59c91UVVUxrZJpRlnVp6+ilrKgveWjYDt1VJd2GpjbFqIZ1xzKK8V6oH0nEbKj2yN8jIsNg1BsQ5nS3s47DJJ3wtzTVLKmnhqIiTHLG2RpPPBGQuYUtprjIKYxHLhpdVPeCG/xgcycchyzzXSKTwoaOGGLaOOMNaOwAwFUVXHNpiv/DNXbHkB8rdUTz+mQHLT9f5lZX7OrVPaOG2RVTC2qnmdLKM8uTWj6Nz8yttVSNneyJoOxwT6rwVJ0PIZzd1HRTZIhrqemqInxywslLhh5P6h29VUx8NNnpWUtNSxU1K12oNa8sA+m6thsGjsfqvXDIImvLiGsAyT2Ci6ZLiS+U3DDaankeaqQtwIYubGjlzVU37TKKNjWsttQ0D+IZPxWPvl2FxvdXXvcMPcWxgnk0clTOf1K1odStH2kUTzDb/u+qDppcaw5pALjsti6PDQWgvz2C5b9llqNxvr66SMGCibsSNjI7l9Bv8AMLsmjQ3O7ieyiKmeDWwsnYPDeCHNJ5hc0hsN8tF+rnWd7zRRzeTxHZL2kA/PGSM+i6rN4u4ewkf9qz3FVzr7JQitoaRs8LfzsndnrjsufJjuCk4xY64WOKqqR4csJyWnqs9aKd9PELhJIYmRbtGcZd0/mmv9+lvDaerezRFH5nRA8/6qhu12dX6GMJjYP0g7L5+UuWTNrdW7j7x6ynF0ZpjiBGoHmrO7XG03fwa2yFpuMTwW42PwPxWC4XoheJnUj4n6efiM79ivbc7JWcOTtqqJ7nPidk43+q3vKxqV1SzG5vg8S6mNrjgtjaNx8V65j3UFsqzV2ymqHAh0kYJ9EUrl6MZ46RftKMKEFStOy7oquIKOKenZK9uoMOl3oCqH2WjpfMxuk+nVbCoiE0D4ncntIXOa6qkjlfHIfMwlpWaPTcLtT08J0syVnLTeque4y+TEZ/ZeS+VeYXFvQKv4amf4m7uakZrcySvmLWhp87g0H4nC6XWMDW08DdmggbdguYQVTqcxzNPmjIe34jcLpwmZWMp5oiHRygPbvyytxEsuTI34fQKvuVSB+FFz6qauqAwHT7xOMqlmmaD5u61sRzSNihfLLsxgLnHsBuVHLEC44OWgnSfTosxxzfmUMcVAxuuWVviPBPJudgfjgrUWsyVnD1quWN6mihkeAOTiwZ/dBG1vhr0NmOMZP1QSN6BC0Bu6D0sa9sD5mvwR7v1XkJeB5icEdkTp3Pewe6O3yUdQdwosJp1OCpeP7m+18OVDoGuMso8MFv6QeZVzT4dI0E4HfsstxXeRR1THXOgkNEQWCaPcsIPUdisZ59fjtxccz3tz7hOmsF0p5o7k8ivLsRB79LdOOnrlei78GVlK0yUL3Fo/+qTf6FXFZwnar5SNrrXKxwfnzwn3T6juhtU94sETqe5B1dbx7rgcuj/2XC8l3uPTOOWdbN/1bfZhVm0tZSVRDXVDz4kbti13IFdPbNG4lz3E420LnYno3MjuMTmiKPDy7sAtiXFztYwcjIK6cOdv1w/IwmNmnrlk1l2wAPPuvNPTxzU8tO/BgmYY3tdvkEYKQPU80RdlpB7Lra87AX7h6nqqplOwiGJrNJDTzKzV34Yp6NgdG8nHddAux8O46j+puVnL9IHxndc+kNKjgy7Msd3JmIFK4efbkehC181yp38VQeCWzUVdFggj3XD+qwcNtqK+R8dK0F4GT8Fc8JWm5U15gbVwfgxkuaT+krjl5dNSOnsayGFscYDWNGGjCilfshfJsd15ZZPVdGtNM2TplStevD7BeI9/DpZm/wAErmO+hH+qHxKuIkTW6qZjmWtDwf8A1JXVlah2Rz+iy99tNHLXmeeMkyj3mv05I5q1ZcoQdLiYz2kaW/zXj4j01VrdJC9niQnW3JGEIop+FrLUsLZYqludiWz/ANQo6XguwU5BZV3GMjvpcqma+xUGv2iqZG5vMCTOPgF5xxfSeYMq5pQD7rIy7PwwFDTXf/HLS4aGXioaf4o/9loLJSutNvNJ94trAxxMJdhrmg/p58srm8fFFYXZprXcKntin0fzIXp+8uL605peHfDHQzzNb/IlajNjX1pujy4x0Tic7Yczf914oIa8u1S0ha7sTsfmFV2+0cXVUmu5vp6Vmfdp5jqP7Lb0cUkUEcchB0tAyXEk/E9U2OYXbgS/3KtnrJaiidLM/Wcl49APd6AAfJdNsMTbbwxa7dVYM1LRxQyaBluprADg7dQvW0N+aUg28w6ZV2jwSijlILw5pHXBUUkdKRtLj/xKso6eGTYuw7t3SfRNA05Gfgm1UZjjactfnCgmBc3burKiqbfVzSU+ox1MTsPikbg/H4L3GggcOSDOhhAw1Pc6WCtp/wAeFro2sw/P6T3Wg+76cfpKc0NMWuYWuAcMHBWM8O0dePk6Xbl8dpjsVX7VZ4oZPHHmYXuDXD5HClo66Sdro66kEEn+JriWELVVnB8I1Ot9W+EncMcNh/fwVLeLFOy3zRTXNkUrm4Bhhc5wHxwvPeLK17Zzccm4w/HNwIpja7diQz/mGPoOg+q6nSZbR07X+82Nod9Auex2IMraMiWaOAEGYGJ2ZMHOMnotlJV1TyW08DQOjnu6fALrhj0eTlz73a1ymfK1gOpwGOeVUCnuVR+bWiJh6Qt3+pUtFZKWnf4nnlfnOqV5ctbcdKu9w11VWRSU0RLGsxnPNUlxtV2lBDKR7vgV0mmYxrNOgYCn8g5Mb9E2Ob8K2u5UdbLJUUsjWlgA6rZ2OGZ1W8zRYboO5CtmObn3WhTt0cjjB9VNKxVRXtE8jdYOl5GxXnkrh/iC233VbXE/9JAcnPuBCbNazzoYMf8AapprbSDB6J27nHJJJdHMnsa7ZwDvjuvFVWugqWmKejgexwOoFnNJJGlVHwZw212tlnpGOPVsfovZDYLZGMR0rGD+EAJJKCQW2mjPlYl4LNZaMgDskkkSmlGCAFESUySIYkkFp5OBBWemopReqaQXKv8ADhy5sPijRy67ZP1SSRWhjJ1AZ+a9sXmadW+E6S0ivktVHUVhrXxYqGjTracEg9Cvc1oY0AcgkktBio3FJJFCRkbqPGxSSUrX6E2GKTZ8bXAdwgfbaTBIhAJ54SSWSgbQU/RiE0cIOwP1SSWayMU0YHI/VMaePsfqnSQA6BgG2fqmEbUySBx5eSRce6SSK//Z' },
    { name: 'Dr. Sayan Bala', department: 'Pediatrics', fees: 90, clinicName: 'Sunset Pediatrics', photo: 'data:image/jpeg;base64,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' },
    { name: 'Dr. Ankita Badhe', department: 'Orthopedics', fees: 120, clinicName: 'OrthoCare Center', photo: 'data:image/jpeg;base64,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' },
    { name: 'Dr. Mayank Asija', department: 'Neurology', fees: 110, clinicName: 'NeuroHealth Institute', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1S2M41-FQoCdJpJceDMlJa6xOhP1OGO7wTA&usqp=CAU' },
    { name: 'Dr. Robert Baker', department: 'Ophthalmology', fees: 95, clinicName: 'Clear Vision Clinic', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoB6sQ8w7ffcpbeFCt4AInpOHEEzWZYfp0VQ&usqp=CAU' },
    { name: 'Dr. S.Srinivas', department: 'Gynecology', fees: 85, clinicName: 'Women Wellness Center', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnbV09DRAPuhOixrAaa0fqRFTi9HLPS84GQ&usqp=CAU' },
    { name: 'Dr. David Miller', department: 'Dentistry', fees: 75, clinicName: 'Smile Dental Care', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0k2rCQT_0YdmbqUxbjGNtwxf7NsDLJr3HA&usqp=CAU' },
    // Add more doctors as needed
  ];
  

  const bookSlot = (time, doctorName) => {
    const key = `${format(selectedDate, 'yyyy-MM-dd')}-${time}`;
    if (bookedSlots[key]) {
      alert('This slot is already booked. Please choose another slot.');
      return;
    }
    setSelectedSlot({ date: selectedDate, time, doctor: doctorName });
  };

  const validateEmail = () => {
    if (email.includes('@') && email.includes('.')) {
      setIsEmailValid(true);
    } else {
      alert('Invalid email address. Please enter a valid email.');
    }
  };

  const confirmBooking = () => {
    if (!isEmailValid) {
      alert('Please validate your email first.');
      return;
    }
    const key = `${format(selectedSlot.date, 'yyyy-MM-dd')}-${selectedSlot.time}`;
    setBookingHistory((prevHistory) => ({
      ...prevHistory,
      [key]: { status: 'Booked', doctor: selectedSlot.doctor },
    }));
    setBookedSlots((prevBookings) => ({
      ...prevBookings,
      [key]: true,
    }));
    setSelectedSlot(null);
    setEmail('');
    setIsEmailValid(false);
    alert('Slot booked successfully!');
  };

  return (
    <Router>
      <div className="app-container">
        <h2>Booking App</h2>

        {/* Display doctor cards */}
        <div className="doctor-cards">
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              {...doctor}
              onDateSelect={(date) => setSelectedDate(date)}
              bookSlot={bookSlot}
              bookedSlots={bookedSlots}  
              format={format}  
            />
          ))}
        </div>

        {/* Display booking section */}
        <div className="booking-section">
          <h3>Booking Section</h3>
          {/* <div className="date-picker">
            <h4>Select Date:</h4>
            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
          </div> */}
          {selectedDate && (
            <BookingTable
              date={selectedDate}
              timeslots={timeslots}
              bookSlot={bookSlot}
              bookedSlots={bookedSlots}
            />
          )}
        </div>

        {/* Display email validation section */}
        {selectedSlot && !isEmailValid && (
          <div className="email-validation-section">
            <h3>Email Validation</h3>
            <p>Please enter your email address to validate your booking:</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={validateEmail}>Validate Email</button>
          </div>
        )}

        {/* Display confirm booking section */}
        {selectedSlot && isEmailValid && (
          <div className="button-container">
            <button className="confirm-button" onClick={confirmBooking}>
              Confirm Booking
            </button>
          </div>
        )}

        {/* Display booking history section */}
        <div className="history-section">
          <h3>Booking History:</h3>
          {Object.keys(bookingHistory).length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(bookingHistory).map(([key, { status, doctor }]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{status}</td>
                    <td>{doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No booking history yet.</p>
          )}
        {/* </div>

        {/* Display View Booking Details button
        <div className="button-container">
          <button
            className="details-button"
            onClick={() => {
              Navigate('/booking-details');
            }}
          >
            View Booking Details
          </button> */}
        </div> 

        {/* Routes for View Booking Details */}
        <Routes>
          <Route path="/booking-details" element={<BookingDetails bookingHistory={bookingHistory} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
