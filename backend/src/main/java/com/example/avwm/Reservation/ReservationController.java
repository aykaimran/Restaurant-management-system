package com.example.avwm.Reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/reserve")
    public Reservation reserveTable(@RequestBody Reservation reservation) {
        return reservationService.reserveTable(reservation);
    }
}
