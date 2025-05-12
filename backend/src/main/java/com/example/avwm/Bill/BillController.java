package com.example.avwm.Bill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/bill")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/create")
    public Bill createBill(@RequestBody Bill bill) {
        System.out.println("Received bill: " + bill);
        return billService.createBill(bill);
    }
}
