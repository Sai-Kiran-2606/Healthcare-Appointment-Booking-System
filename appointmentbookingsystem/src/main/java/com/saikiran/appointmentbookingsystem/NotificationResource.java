package com.saikiran.appointmentbookingsystem;

import com.saikiran.appointmentbookingsystem.model.Notification;
import com.saikiran.appointmentbookingsystem.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
@RequestMapping("/notifications")
public class NotificationResource {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Notification>> getNotificationsForPatient(@PathVariable Integer patientId) {
        List<Notification> notifications = notificationService.getUnreadNotifications(patientId);
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }
}
