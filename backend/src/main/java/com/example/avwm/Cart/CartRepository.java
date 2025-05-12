package com.example.avwm.Cart;

import com.example.avwm.Cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
//    List<Cart> findByUserid(int userid);
//    void deleteByUserid(int userid);
List<Cart> findByUserUserid(int userId);
}
