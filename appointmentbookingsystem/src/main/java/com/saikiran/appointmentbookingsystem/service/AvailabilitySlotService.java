//package com.saikiran.appointmentbookingsystem.service;
//
//import com.saikiran.appointmentbookingsystem.model.AvailabilitySlot;
//import com.saikiran.appointmentbookingsystem.model.Doctor;
//import com.saikiran.appointmentbookingsystem.repository.AvailabilitySlotRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class AvailabilitySlotService {
//
//    @Autowired
//    private AvailabilitySlotRepository slotRepository;
//
//    public AvailabilitySlot addSlot(AvailabilitySlot slot) {
//        // Default to available if not set
//        if (slot.getIsAvailable() == null) {
//            slot.setIsAvailable(true);
//        }
//        return slotRepository.save(slot);
//    }
//
//    public List<AvailabilitySlot> getAvailableSlotsForDoctor(Doctor doctor) {
//        return slotRepository.findByDoctorAndIsAvailable(doctor, true);
//    }
//
//    public AvailabilitySlot updateSlot(AvailabilitySlot slot) {
//        return slotRepository.save(slot);
//    }
//
//    public void deleteSlot(Integer slotId) {
//        slotRepository.deleteById(slotId);
//    }
//}
