package com.example.avwm.Cart;

import com.example.avwm.User.User;
import com.example.avwm.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private UserRepository userRepository;

    //    @PostMapping("/add")
//    public Cart addItemToCart(@RequestBody Cart cart) {
//        return cartService.addItemToCart(cart);
//    }
@PostMapping("/add")
public Cart addItemToCart(@RequestBody Cart cart) {
    // Set the current date
    cart.setCartdate(LocalDate.now());

    // You might need to fetch the user from database
    User user = userRepository.findById(cart.getUser().getUserid())
            .orElseThrow(() -> new RuntimeException("User not found"));
    cart.setUser(user);

    return cartService.addItemToCart(cart);
}
    @GetMapping("/user/{userId}")
    public List<Cart> getCartItemsByUser(@PathVariable int userId) {
        return cartService.getCartItemsByUserId(userId);
    }
}

