package com.mbaro.pune.controller;

import com.mbaro.pune.config.AuthenticationBean;
import com.mbaro.pune.model.Role;
import com.mbaro.pune.model.User;
import com.mbaro.pune.repository.UserRepository;
import com.mbaro.pune.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/basicauth")
    public AuthenticationBean user(Principal user) {
        return new AuthenticationBean("You are authenticated");
    }

    @PostMapping("/user/save")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        try {
            System.out.println(user);
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(user.getPassword()));
            user.setEnabled(true);
            userService.saveUser(user);

            return new ResponseEntity<>("success",HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getAllUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        try {

            return new ResponseEntity<>(userService.getAll(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
