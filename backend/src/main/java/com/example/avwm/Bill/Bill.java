package com.example.avwm.Bill;

import jakarta.persistence.*;
import com.example.avwm.User.User;

import java.time.LocalDate;

@Entity
@Table(name = "bill")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int billQuantity;
    @Column(name = "bill_date")
    private LocalDate billDate;

    // Getters and Setters

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getBillQuantity() {
        return billQuantity;
    }
    public LocalDate getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }
    public void setBillQuantity(int billQuantity) {
        this.billQuantity = billQuantity;
    }
}
