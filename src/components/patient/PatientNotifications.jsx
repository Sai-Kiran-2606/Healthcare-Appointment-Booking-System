// src/components/patient/PatientNotifications.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function PatientNotifications() {
  const [notifications, setNotifications] = useState([]);
  const patientId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/notifications/patient/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000);
    return () => clearInterval(interval);
  }, [patientId, token]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-3">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-2">
          {notifications.map((notif) => (
            <li key={notif.notificationId} className="border p-2 rounded">
              {notif.message} <br />
              <small>{new Date(notif.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
}

export default PatientNotifications;
