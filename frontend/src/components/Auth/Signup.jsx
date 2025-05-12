// import React, { useState } from 'react';
// import './Auth.css';
// import { useNavigate } from 'react-router-dom';
// import Modal from '../Modal/Modal';  // Go up one level, then into Modal folder

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   // Mock user database (in a real app, this would be an API call)
//   const users = JSON.parse(localStorage.getItem('users')) || [];

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Reset error
//     setError('');
    
//     // Validation
//     if (!name || !email || !password) {
//       setError('All fields are required!');
//       setShowModal(true);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address!');
//       setShowModal(true);
//       return;
//     }

//     // Check if email already exists
//     const emailExists = users.some(user => user.email === email);
//     if (emailExists) {
//       setError('Email already in use. Please use a different email or login.');
//       setShowModal(true);
//       return;
//     }

//     // Password strength (basic check)
//     if (password.length < 6) {
//       setError('Password should be at least 6 characters long!');
//       setShowModal(true);
//       return;
//     }

//     // Create new user
//     const newUser = { name, email, password };
//     const updatedUsers = [...users, newUser];
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
    
//     console.log('Signup successful:', newUser);
//     localStorage.setItem('currentUser', JSON.stringify(newUser));
//     navigate('/');
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h1>Create an Account</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password (min 6 characters)"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//         <p className="auth-switch">
//           Already have an account? <span onClick={() => navigate('/login')}>Login</span>
//         </p>
//       </div>
      
//       {showModal && (
//         <Modal 
//           message={error} 
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Signup;

///////////////////////
import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error
    setError('');

    // Validation
    if (!name || !email || !password) {
      setError('All fields are required!');
      setShowModal(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address!');
      setShowModal(true);
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long!');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        console.log('Signup successful:', result);
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        setError(result || 'Signup failed. Please try again.');
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Server error. Please try again later.');
      setShowModal(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>

      {showModal && (
        <Modal 
          message={error} 
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Signup;
