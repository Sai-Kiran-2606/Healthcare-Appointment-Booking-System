//package com.saikiran.appointmentbookingsystem;
//
//import com.saikiran.appointmentbookingsystem.model.Appointment;
//import com.saikiran.appointmentbookingsystem.service.AppointmentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//public class AppointmentResource {
//    @Autowired
//    private final AppointmentService appointmentService;
//
//    public AppointmentResource(AppointmentService appointmentService) {
//        this.appointmentService = appointmentService;
//    }
//
//    @GetMapping("/appointments")
//    public ResponseEntity<List<Appointment>> getAllAppointment(){
//        List<Appointment> appointment = appointmentService.findAllAppointments();
//        return new ResponseEntity<>(appointment, HttpStatus.OK);
//    }
//
//    @GetMapping("/appointments/id/{appointmentId}")
//    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer appointmentId){
//        Appointment appointment = appointmentService.findById(appointmentId);
//        return new ResponseEntity<>(appointment, HttpStatus.OK);
//    }
//
////    @GetMapping("/appointments/doctor/{doctorId}")
////    public ResponseEntity<List<Appointment>> getAppointmentByDoctorId(@PathVariable Integer doctorId){
////        List<Appointment> appointments = appointmentService.findAppointmentByDoctor(doctorId);
////        return new ResponseEntity<>(appointments, HttpStatus.OK);
////    }
//
////    @GetMapping("/appointments/patient/{patientId}")
////    public ResponseEntity<List<Appointment>> getAppointmentByPatientId(@PathVariable Integer patientId){
////        List<Appointment> appointments = appointmentService.findAppointmentByPatient(patientId);
////        return new ResponseEntity<>(appointments, HttpStatus.OK);
////    }
////
//    @PostMapping("/appointments/book")
//    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment){
//        Appointment newAppointment = appointmentService.bookAppointment(appointment);
//        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/appointments/update")
//    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment){
//        Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
//        return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/appointments/delete/{appointmentId}")
//    public ResponseEntity<Void> deleteAppointment(@PathVariable Integer appointmentId){
//        appointmentService.deleteAppointment(appointmentId);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//}

//package com.saikiran.appointmentbookingsystem;
//
//import com.saikiran.appointmentbookingsystem.model.Appointment;
//import com.saikiran.appointmentbookingsystem.model.AppointmentStatus;
//import com.saikiran.appointmentbookingsystem.model.Doctor;
//import com.saikiran.appointmentbookingsystem.model.Patient;
//import com.saikiran.appointmentbookingsystem.service.AppointmentService;
//import com.saikiran.appointmentbookingsystem.service.DoctorService;
//import com.saikiran.appointmentbookingsystem.service.PatientService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:1234")
//@RequestMapping("/appointments")
//public class AppointmentResource {
//
//    private final AppointmentService appointmentService;
//    private final DoctorService doctorService;
//    private final PatientService patientService;
//
//    @Autowired
//    public AppointmentResource(AppointmentService appointmentService, DoctorService doctorService, PatientService patientService) {
//        this.appointmentService = appointmentService;
//        this.doctorService = doctorService;
//        this.patientService = patientService;
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Appointment>> getAllAppointments(){
//        List<Appointment> appointments = appointmentService.findAllAppointments();
//        return new ResponseEntity<>(appointments, HttpStatus.OK);
//    }
//
//    @GetMapping("/id/{appointmentId}")
//    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer appointmentId){
//        Appointment appointment = appointmentService.findById(appointmentId);
//        return new ResponseEntity<>(appointment, HttpStatus.OK);
//    }
//
//    @GetMapping("/doctor/{doctorId}")
//    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Integer doctorId){
//        // Retrieve full Doctor object using DoctorService
//        Doctor doctor = doctorService.findDoctorById(doctorId);
//        List<Appointment> appointments = appointmentService.findAppointmentByDoctor(doctor);
//        return new ResponseEntity<>(appointments, HttpStatus.OK);
//    }
//
//    @GetMapping("/patient/{patientId}")
//    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable Integer patientId){
//        // Retrieve full Patient object using PatientService
//        Patient patient = patientService.findPatientByID(patientId);
//        List<Appointment> appointments = appointmentService.findAppointmentByPatient(patient);
//        return new ResponseEntity<>(appointments, HttpStatus.OK);
//    }
//
//    @PostMapping("/book")
//    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment){
//        Appointment newAppointment = appointmentService.bookAppointment(appointment);
//        return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/update")
//    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment){
//        Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
//        return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
//    }
//
//    @PutMapping("/cancel/{appointmentId}")
//    public ResponseEntity<Appointment> cancelAppointment(@PathVariable Integer appointmentId){
//        Appointment appointment = appointmentService.findById(appointmentId);
//        appointment.setStatus(AppointmentStatus.CANCELLED);
//        Appointment cancelledAppointment = appointmentService.updateAppointment(appointment);
//        return new ResponseEntity<>(cancelledAppointment, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/delete/{appointmentId}")
//    public ResponseEntity<Void> deleteAppointment(@PathVariable Integer appointmentId){
//        appointmentService.deleteAppointment(appointmentId);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//}

package com.saikiran.appointmentbookingsystem;

import com.saikiran.appointmentbookingsystem.model.*;
import com.saikiran.appointmentbookingsystem.repository.AppointmentRepository;
import com.saikiran.appointmentbookingsystem.repository.DoctorAvailabilityRepository;
import com.saikiran.appointmentbookingsystem.repository.DoctorRepository;
import com.saikiran.appointmentbookingsystem.repository.PatientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentResource {
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final DoctorAvailabilityRepository doctorAvailabilityRepository;

    public AppointmentResource(AppointmentRepository appointmentRepository,
                                 DoctorRepository doctorRepository,
                                 PatientRepository patientRepository,
                                 DoctorAvailabilityRepository doctorAvailabilityRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.doctorAvailabilityRepository = doctorAvailabilityRepository;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        // Validate doctor and patient existence
        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getDoctorId()).orElse(null);
        Patient patient = patientRepository.findById(appointment.getPatient().getPatientId()).orElse(null);
        if (doctor == null || patient == null) {
            return ResponseEntity.badRequest().body("Doctor or Patient not found");
        }

        // Parse the appointment start and compute the end (always 30 minutes later)
        LocalDateTime appointmentStart = appointment.getAppointmentTime();
        LocalDateTime appointmentEnd = appointmentStart.plusMinutes(30);

        // Check if the requested appointment lies within one of the doctor's availability slots
        List<DoctorAvailability> availabilities = doctorAvailabilityRepository.findByDoctorDoctorId(doctor.getDoctorId());
        boolean withinAvailability = availabilities.stream().anyMatch(slot ->
                !appointmentStart.isBefore(slot.getStartTime()) && !appointmentEnd.isAfter(slot.getEndTime())
        );
        if (!withinAvailability) {
            return ResponseEntity.badRequest().body("Appointment time is outside doctor's available slots");
        }

        // Check for conflicts with existing appointments (including a 30-minute buffer before and after)
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorDoctorId(doctor.getDoctorId());
        for (Appointment existing : existingAppointments) {
            LocalDateTime existingStart = existing.getAppointmentTime();
            LocalDateTime existingEnd = existingStart.plusMinutes(30); // Fixed duration
            LocalDateTime conflictWindowStart = existingStart.minusMinutes(30);
            LocalDateTime conflictWindowEnd = existingEnd.plusMinutes(30);
            // If the new appointment overlaps with the conflict window, reject it
            if (appointmentStart.isBefore(conflictWindowEnd) && appointmentEnd.isAfter(conflictWindowStart)) {
                return ResponseEntity.badRequest().body("Time slot conflicts with an existing appointment or its buffer period");
            }
        }

        // Set fixed duration and status then save
        appointment.setAppointmentDuration(30);
        appointment.setStatus(AppointmentStatus.SCHEDULED);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAppointment);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(@PathVariable Integer doctorId) {
        return appointmentRepository.findByDoctorDoctorId(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(@PathVariable Integer patientId) {
        return appointmentRepository.findByPatientPatientId(patientId);
    }

    @PutMapping("/cancel/{appointmentId}")
    public String cancelAppointment(@PathVariable Integer appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment == null) return "Appointment not found";

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        return "Appointment cancelled";
    }

    @PutMapping("/complete/{appointmentId}")
    public String markAppointmentAsCompleted(@PathVariable Integer appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment == null) return "Appointment not found";

        appointment.setStatus(AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);
        return "Appointment marked as completed";
    }
}
