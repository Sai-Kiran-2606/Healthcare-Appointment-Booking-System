//package com.saikiran.appointmentbookingsystem.model;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//public class AvailabilitySlot {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer slotId;
//
//    @ManyToOne
//    @JoinColumn(name = "doctor_id", nullable = false)
//    private Doctor doctor;
//
//    private LocalDateTime startTime;
//    private LocalDateTime endTime;
//
//    private Boolean isAvailable;
//
//    public AvailabilitySlot() {}
//
//    public Integer getSlotId() {
//        return slotId;
//    }
//
//    public void setSlotId(Integer slotId) {
//        this.slotId = slotId;
//    }
//
//    public Doctor getDoctor() {
//        return doctor;
//    }
//
//    public void setDoctor(Doctor doctor) {
//        this.doctor = doctor;
//    }
//
//    public LocalDateTime getStartTime() {
//        return startTime;
//    }
//
//    public void setStartTime(LocalDateTime startTime) {
//        this.startTime = startTime;
//    }
//
//    public LocalDateTime getEndTime() {
//        return endTime;
//    }
//
//    public void setEndTime(LocalDateTime endTime) {
//        this.endTime = endTime;
//    }
//
//    public Boolean getIsAvailable() {
//        return isAvailable;
//    }
//
//    public void setIsAvailable(Boolean isAvailable) {
//        this.isAvailable = isAvailable;
//    }
//}
