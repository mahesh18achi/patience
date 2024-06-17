import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: 'LOGIN', payload: user });
      navigate("/video");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
          {error && <span style={styles.errorText}>Invalid Email or Password</span>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #2E3192, #1BFFFF)', // Adjust gradient colors as needed
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '400px',
    width: '400px',
    border: '1px solid black',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'orange',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  errorText: {
    fontFamily: 'Arial, sans-serif',
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;
