package com.example.avwm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {
        "com.example.avwm.Reservation",
        "com.example.avwm.User",
        "com.example.avwm.Cart",
        "com.example.avwm.Bill"
})
public class AvwmApplication {
    public static void main(String[] args) {
        SpringApplication.run(AvwmApplication.class, args);
    }
}
