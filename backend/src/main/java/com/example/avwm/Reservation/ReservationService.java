package com.example.avwm.Reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation reserveTable(Reservation reservation) {
        return reservationRepository.save(reservation);
    }
}
