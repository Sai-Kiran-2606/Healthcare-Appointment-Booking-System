//package com.saikiran.appointmentbookingsystem;
//
//import com.saikiran.appointmentbookingsystem.model.AvailabilitySlot;
//import com.saikiran.appointmentbookingsystem.model.Doctor;
//import com.saikiran.appointmentbookingsystem.service.AvailabilitySlotService;
//import com.saikiran.appointmentbookingsystem.service.DoctorService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:1234")
//@RequestMapping("/availability")
//public class AvailabilitySlotController {
//
//    @Autowired
//    private AvailabilitySlotService slotService;
//
//    @Autowired
//    private DoctorService doctorService;
//
//    // Single slot creation
//    @PostMapping("/add")
//    public ResponseEntity<AvailabilitySlot> addSlot(@RequestBody AvailabilitySlot slot) {
//        AvailabilitySlot newSlot = slotService.addSlot(slot);
//        return new ResponseEntity<>(newSlot, HttpStatus.CREATED);
//    }
//
//    // Retrieve slots for a given doctor
//    @GetMapping("/doctor/{doctorId}/date")
//    public ResponseEntity<List<AvailabilitySlot>> getSlotsForDoctorOnDate(
//            @PathVariable Integer doctorId,
//            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
//    ) {
//        Doctor doctor = doctorService.findDoctorById(doctorId);
//        if (doctor == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        List<AvailabilitySlot> allSlots = slotService.getAvailableSlotsForDoctor(doctor);
//        List<AvailabilitySlot> filtered = new ArrayList<>();
//        for (AvailabilitySlot slot : allSlots) {
//            LocalDate slotDate = slot.getStartTime().toLocalDate();
//            if (slotDate.equals(date)) {
//                filtered.add(slot);
//            }
//        }
//        return new ResponseEntity<>(filtered, HttpStatus.OK);
//    }
//
//    // (Optional) If you want to let the doctor delete or update a slot
//    @DeleteMapping("/{slotId}")
//    public ResponseEntity<Void> deleteSlot(@PathVariable Integer slotId) {
//        slotService.deleteSlot(slotId);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//}
