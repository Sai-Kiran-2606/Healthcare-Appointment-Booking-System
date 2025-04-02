package com.saikiran.appointmentbookingsystem.repository;

import com.saikiran.appointmentbookingsystem.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserIdAndReadStatus(Integer userId, Boolean readStatus);
}
