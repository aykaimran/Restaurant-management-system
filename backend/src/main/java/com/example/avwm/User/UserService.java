package com.example.avwm.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String signup(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return "Username already exists!";
        }
        userRepository.save(user);
        return "Signup successful!";
    }

//    public String login(String username, String password) {
//        Optional<User> user = userRepository.findByUsername(username);
//        if (user.isPresent() && user.get().getPassword().equals(password)) {
//            return "Login successful!";
//        } else {
//            return "Invalid username or password!";
//        }
//    }
public Optional<User> validateUserByEmail(String email, String password) {
    return userRepository.findByEmailAndPassword(email, password);
}


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
