import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import loginImage from "../assets/images/adminLogin2.png";
import messageIcon from "../assets/icons/envelope.svg";
import lockIcon from "../assets/icons/lock.svg";
import apiService from '../services/api';

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiService.adminLogin({ username, password });

      console.log('🔐 Login API Response:', res);

      const token = res?.data?.data?.token;

      if (token) {
        localStorage.setItem('adminToken', token);
        console.log('✅ Token stored in localStorage:', token);
        window.location.href = "/admin/dashboard";
      } else {
        alert('Login failed: token not received.');
      }
    } catch (error) {
      alert("Login error.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className={styles.box}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.box}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.submit} onClick={handleSubmit}>
          Sign in
        </button>
        <a href="#" className={styles.forgot}>Forgot Password</a>
      </div>
      <div className={styles.side}>
        <img src={loginImage} alt="Login Visual" />
      </div>
    </div>
  );
}