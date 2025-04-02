package com.saikiran.appointmentbookingsystem.service;

import com.saikiran.appointmentbookingsystem.model.Notification;
import com.saikiran.appointmentbookingsystem.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification) {
        notification.setCreatedAt(LocalDateTime.now());
        notification.setReadStatus(false);
        return notificationRepository.save(notification);
    }

    public List<Notification> getUnreadNotifications(Integer userId) {
        return notificationRepository.findByUserIdAndReadStatus(userId, false);
    }

    // Example scheduled method to create reminders
    // (In a real application, inject AppointmentService to fetch upcoming appointments)
    @Scheduled(fixedRate = 60000) // every minute
    public void sendAppointmentReminders() {
        // Pseudo-code:
        // 1. Fetch all appointments scheduled in 1 day and 1 hour from now.
        // 2. For each appointment, if a reminder hasn't been sent, create a Notification.
        // You could compare appointment times with LocalDateTime.now() and then use createNotification().
    }
}
