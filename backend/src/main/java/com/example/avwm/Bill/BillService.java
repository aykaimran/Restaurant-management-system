package com.example.avwm.Bill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public Bill createBill(Bill bill) {

        bill.setBillDate(LocalDate.now());
        return billRepository.save(bill);
    }
}
