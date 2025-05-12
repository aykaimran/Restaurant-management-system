// import React from 'react';
// import './ReserveTable.css';

// const ReserveTable = () => {
//   return (
//     <div className="reservation-container">
//       <div className="reservation-header">
//         <h1 className="reservation-title">Reserve Your Table</h1>
//       </div>

//       <div className="reservation-form">
//         {/* Left Column */}
//         <div className="form-group">
//           <label>First name</label>
//           <input type="text" required />
//         </div>

//         <div className="form-group">
//           <label>Last name</label>
//           <input type="text" required />
//         </div>

//         <div className="form-group">
//           <label>Email address</label>
//           <input type="email" required />
//         </div>

//         {/* Right Column */}
//         <div className="form-group">
//           <label>Phone number</label>
//           <input type="tel" required />
//         </div>

//         <div className="form-group">
//           <label>Date</label>
//           <input type="date" required />
//         </div>
//         <div className="form-group time-input">
//           <label>Time</label>
//           <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="startTime" style={{ fontSize: '0.8rem' }}>Start Time</label>
//               <input type="time" id="startTime" required style={{ width: '100%' }} />
//             </div>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="endTime" style={{ fontSize: '0.8rem' }}>End Time</label>
//               <input type="time" id="endTime" required style={{ width: '100%' }} />
//             </div>
//           </div>
//         </div>


//         <div className="form-group">
//           <label>Number of guests</label>
//           <input type="number" min="1" required />
//         </div>

//         <div className="form-group">
//           <label>Table preference</label>
//           <select required>
//             <option value="">Select...</option>
//             <option value="window">Window</option>
//             <option value="outdoor">Outdoor</option>
//             <option value="private">Private</option>
//           </select>
//         </div>

//         <div className="submit-container">
//           <button type="submit" className="submit-btn">
//             Reserve Table
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReserveTable;
//////////////////
import React, { useState } from 'react';
import './ReserveTable.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ReserveTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get userId from location state or from localStorage
  const userId = location.state?.userId || JSON.parse(localStorage.getItem('currentUser'))?.userId;
  console.log("Received userId from login:", userId);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    startTime: '',
    endTime: '',
    guests: 1,
    tablePreference: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data in the format expected by the backend
    const reservationData = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      reservationdate: formData.date,
      starttime: formData.startTime,
      endtime: formData.endTime,
      noofguest: formData.guests,
      tablepreference: formData.tablePreference,
      userId: userId // Include userId if your backend needs it
    };

    try {
      const response = await fetch('http://localhost:8080/reservations/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Reservation failed');
      }

      const data = await response.json();
      alert('Reservation successful!');
      navigate('/'); // Redirect to home or confirmation page
      
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <h1 className="reservation-title">Reserve Your Table</h1>
      </div>

      <form className="reservation-form" onSubmit={handleSubmit}>
        {/* Left Column */}
        <div className="form-group">
          <label>First name</label>
          <input 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Right Column */}
        <div className="form-group">
          <label>Phone number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className="form-group time-input">
          <label>Time</label>
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="startTime" style={{ fontSize: '0.8rem' }}>Start Time</label>
              <input 
                type="time" 
                id="startTime" 
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required 
                style={{ width: '100%' }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="endTime" style={{ fontSize: '0.8rem' }}>End Time</label>
              <input 
                type="time" 
                id="endTime" 
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required 
                style={{ width: '100%' }} 
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Number of guests</label>
          <input 
            type="number" 
            min="1" 
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label>Table preference</label>
          <select 
            name="tablePreference"
            value={formData.tablePreference}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="window">Window</option>
            <option value="outdoor">Outdoor</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit-btn">
            Reserve Table
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReserveTable;