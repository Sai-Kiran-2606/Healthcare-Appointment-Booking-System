//package com.saikiran.appointmentbookingsystem;
//
//import com.saikiran.appointmentbookingsystem.model.Doctor;
//import com.saikiran.appointmentbookingsystem.service.DoctorService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//public class DoctorResource {
//    @Autowired
//    private DoctorService doctorService;
//
//    public DoctorResource(DoctorService doctorService) {
//        this.doctorService = doctorService;
//    }
//
//    @GetMapping("/doctors")
//    public ResponseEntity<List<Doctor>> getAllDoctors(){
//        List<Doctor> doctors = doctorService.retrieveAllDoctors();
//        return new ResponseEntity<>(doctors, HttpStatus.OK);
//    }
//
//    @GetMapping("/doctors/{doctorId}")
//    public ResponseEntity<Doctor> getDoctorById(@PathVariable Integer doctorId){
//        Doctor doctor = doctorService.findDoctorById(doctorId);
//        return new ResponseEntity<>(doctor, HttpStatus.OK);
//    }
//
//    @PostMapping("/doctors/add")
//    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor){
//        Doctor newDoctor = doctorService.addDoctor(doctor);
//        return new ResponseEntity<>(newDoctor, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/doctors/update")
//    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor){
//        Doctor updatedDoctor = doctorService.updateDoctor(doctor);
//        return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/doctors/delete/{doctorId}")
//    public ResponseEntity<?> deleteDoctor(@PathVariable Integer doctorId){
//        doctorService.deleteDoctor(doctorId);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
////    @GetMapping("/doctors/find/{specialisation}")
////    public ResponseEntity<Doctor> getDoctorBySpecialisation(@PathVariable Specialization specialisation){
////        Doctor doctor = doctorService.findDoctorBySpecialisation(specialisation);
////        return new ResponseEntity<>(doctor, HttpStatus.OK);
////    }
//}

package com.saikiran.appointmentbookingsystem;

import com.saikiran.appointmentbookingsystem.model.Doctor;
import com.saikiran.appointmentbookingsystem.model.DoctorAvailability;
import com.saikiran.appointmentbookingsystem.model.Specialization;
import com.saikiran.appointmentbookingsystem.repository.DoctorAvailabilityRepository;
import com.saikiran.appointmentbookingsystem.repository.DoctorRepository;
import com.saikiran.appointmentbookingsystem.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:1234")
public class DoctorResource {
    @Autowired
    private DoctorService doctorService;

    private final DoctorRepository doctorRepository;

    @Autowired
    private DoctorAvailabilityRepository doctorAvailabilityRepository;

    public DoctorResource(DoctorService doctorService, DoctorRepository doctorRepository) {
        this.doctorService = doctorService;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors(){
        List<Doctor> doctors = doctorService.retrieveAllDoctors();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @GetMapping("/doctors/{doctorId}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Integer doctorId){
        Doctor doctor = doctorService.findDoctorById(doctorId);
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

//    @PostMapping("/doctors/add")
//    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor){
//        Doctor newDoctor = doctorService.addDoctor(doctor);
//        return new ResponseEntity<>(newDoctor, HttpStatus.CREATED);
//    }

    @PutMapping("/doctors/update")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor){
        Doctor updatedDoctor = doctorService.updateDoctor(doctor);
        return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);
    }

    @DeleteMapping("/doctors/delete/{doctorId}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Integer doctorId){
        doctorService.deleteDoctor(doctorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/doctors/find/{specialization}")
    public ResponseEntity<List<Doctor>> getDoctorBySpecialization(@PathVariable Specialization specialization){
        List<Doctor> doctors = doctorService.findDoctorsBySpecialization(specialization);
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

//    // New endpoint to update doctor's availability status
//    @PutMapping("/doctors/{doctorId}/availability")
//    public ResponseEntity<Doctor> updateDoctorAvailability(@PathVariable Integer doctorId, @RequestParam Boolean available) {
//        Doctor doctor = doctorService.findDoctorById(doctorId);
//        doctor.setAvailabilityStatus(available);
//        Doctor updatedDoctor = doctorService.updateDoctor(doctor);
//        return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);
//    }

    @PostMapping("/doctors/{doctorId}/availability")
    public ResponseEntity<?> addAvailability(@PathVariable Integer doctorId, @RequestBody DoctorAvailability availability) {
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
        if (!doctorOpt.isPresent()) {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }
        Doctor doctor = doctorOpt.get();

        // Ensure the duration is a multiple of 30 minutes
        long duration = Duration.between(availability.getStartTime(), availability.getEndTime()).toMinutes();
        if (duration % 30 != 0) {
            return new ResponseEntity<>("Duration must be a multiple of 30 minutes", HttpStatus.BAD_REQUEST);
        }
        availability.setDoctor(doctor);
        DoctorAvailability saved = doctorAvailabilityRepository.save(availability);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Endpoint to update an existing availability slot for a doctor
    @PutMapping("/doctors/{doctorId}/availability/{availabilityId}")
    public ResponseEntity<?> updateAvailability(@PathVariable Integer doctorId, @PathVariable Integer availabilityId, @RequestBody DoctorAvailability availability) {
        Optional<DoctorAvailability> existingOpt = doctorAvailabilityRepository.findById(availabilityId);
        if (!existingOpt.isPresent()) {
            return new ResponseEntity<>("Availability slot not found", HttpStatus.NOT_FOUND);
        }
        DoctorAvailability existing = existingOpt.get();
        if (!existing.getDoctor().getDoctorId().equals(doctorId)) {
            return new ResponseEntity<>("Doctor mismatch", HttpStatus.BAD_REQUEST);
        }
        long duration = Duration.between(availability.getStartTime(), availability.getEndTime()).toMinutes();
        if (duration % 30 != 0) {
            return new ResponseEntity<>("Duration must be a multiple of 30 minutes", HttpStatus.BAD_REQUEST);
        }
        existing.setStartTime(availability.getStartTime());
        existing.setEndTime(availability.getEndTime());
        DoctorAvailability updated = doctorAvailabilityRepository.save(existing);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // Optional: Endpoint to retrieve availability slots for a doctor
    @GetMapping("/doctors/{doctorId}/availability")
    public ResponseEntity<List<DoctorAvailability>> getAvailability(@PathVariable Integer doctorId) {
        List<DoctorAvailability> availabilities = doctorAvailabilityRepository.findByDoctorDoctorId(doctorId);
        return new ResponseEntity<>(availabilities, HttpStatus.OK);
    }
}

