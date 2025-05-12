// import React, { useState } from 'react';
// import './Auth.css';
// import { useNavigate } from 'react-router-dom';
// import Modal from '../Modal/Modal';  // Go up one level, then into Modal folder

// const Login = () => {
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
//     if (!email || !password) {
//       setError('Email and password are required!');
//       setShowModal(true);
//       return;
//     }

//     // Check if user exists
//     const user = users.find(u => u.email === email);
//     if (!user) {
//       setError('User not found. Please sign up first.');
//       setShowModal(true);
//       return;
//     }

//     // Check password (in real app, this would be hashed)
//     if (user.password !== password) {
//       setError('Incorrect password!');
//       setShowModal(true);
//       return;
//     }

//     // Success - log in user
//     console.log('Login successful:', { email });
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     navigate('/');
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h1>Welcome Back</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p className="auth-switch">
//           New user? <span onClick={() => navigate('/signup')}>Sign up</span>
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

// export default Login;

// ///////////////////
// import React, { useState } from 'react';
// import './Auth.css';
// import { useNavigate } from 'react-router-dom';
// import Modal from '../Modal/Modal'; 

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Email and password are required!');
//       setShowModal(true);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: email,
//           password: password
//         })
//       });

//       const data = await response.text();

//       if (!response.ok) {
//         throw new Error(data || 'Login failed.');
//       }

//       // You can parse more info here if your backend returns JSON
//       console.log('Login success:', data);
//       localStorage.setItem('currentUser', JSON.stringify({ email }));
//       navigate('/');
//     } catch (err) {
//       setError(err.message);
//       setShowModal(true);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h1>Welcome Back</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p className="auth-switch">
//           New user? <span onClick={() => navigate('/signup')}>Sign up</span>
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

// export default Login;

///////
import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required!');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      const userId = data.userid;

      // Store user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({ email, userId }));

      navigate('/place-order', { state: { userId } });
      navigate('/');
    } catch (err) {
      setError(err.message);
      setShowModal(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-switch">
          New user? <span onClick={() => navigate('/signup')}>Sign up</span>
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

export default Login;
