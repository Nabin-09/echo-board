import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import logo from "../assets/images/logo2.png";
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
      window.location.href = "/admin/dashboard"; // OR use navigate("/admin/dashboard")
    } else {
      alert('Login failed: token not received.');
    }
  } catch (error) {
    alert("Login error.");
    console.error(error);
  }
};


  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.formSection}>
        <div className={styles.curve}></div>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Admin Login</h2>

          <div className={styles.inputGroup}>
            <img src={messageIcon} alt="Username Icon" className={styles.icon} />
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <img src={lockIcon} alt="Password Icon" className={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.forgot}>
            <a href="#">Forgot your password?</a>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button} onClick={handleSubmit}>
              Sign in
            </button>
          </div>
        </div>
      </div>

      <div className={styles.imageSection}>
        <img src={loginImage} alt="Login Visual" className={styles.loginImage} />
      </div>
    </div>
  );
}
