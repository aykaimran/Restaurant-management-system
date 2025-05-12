package com.example.avwm.Cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.avwm.User.UserRepository;
import com.example.avwm.User.User;
import java.util.List;
import java.time.LocalDate;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;

    public Cart addItemToCart(Cart cart) {
        // Ensure the user exists and is managed by the persistence context
        User user = userRepository.findById(cart.getUser().getUserid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        cart.setUser(user); // set the managed user entity
        cart.setCartdate(LocalDate.now()); // optionally set cart date here
        return cartRepository.save(cart);
    }
    public List<Cart> getCartItemsByUserId(int userId) {
        return cartRepository.findByUserUserid(userId);
    }
}
