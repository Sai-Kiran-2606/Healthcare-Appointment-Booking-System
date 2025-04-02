//package com.saikiran.appointmentbookingsystem.repository;
//
//import com.saikiran.appointmentbookingsystem.model.AvailabilitySlot;
//import com.saikiran.appointmentbookingsystem.model.Doctor;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface AvailabilitySlotRepository extends JpaRepository<AvailabilitySlot, Integer> {
//    List<AvailabilitySlot> findByDoctorAndIsAvailable(Doctor doctor, Boolean isAvailable);
//}
