package com.saikiran.appointmentbookingsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer notificationId;

    // For simplicity, store the recipient's user id (e.g., patient id)
    private Integer userId;

    private String message;

    // Indicates if the notification has been read
    private Boolean readStatus = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
    public Integer getNotificationId() {
        return notificationId;
    }
    public void setNotificationId(Integer notificationId) {
        this.notificationId = notificationId;
    }
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Boolean getReadStatus() {
        return readStatus;
    }
    public void setReadStatus(Boolean readStatus) {
        this.readStatus = readStatus;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
