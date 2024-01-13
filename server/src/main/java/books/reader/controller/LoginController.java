package books.reader.controller;

import books.reader.mongo.users.Users;
import books.reader.mongo.users.UsersService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.fasterxml.jackson.annotation.JsonInclude;


@RestController
@RequestMapping("/login")
public class LoginController {
    
    
    private static class Data {
        public String username;
        public String email;
        public String password;
    }
    
    private final UsersService usersService;
    
    @Autowired
    public LoginController(UsersService usersService) {
        this.usersService = usersService;
    }
    
    
    @PostMapping
    ResponseEntity<Response<String>> registerJson(@RequestBody Data userData) {
        Users hasUsername = usersService.findByUsername(userData.username);
        Users hasEmail = usersService.findByEmail(userData.email);
        if (hasUsername != null || hasEmail != null) {
            Response<String> response = new Response<>(false, "Username or email already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else {
            String hashedPassword = BCrypt.hashpw(userData.password, BCrypt.gensalt(10));
            Users newUser = new Users();
            newUser.username = userData.username;
            newUser.email = userData.email;
            newUser.password = hashedPassword;
            newUser.userRole = "user";
            newUser.coins = 100;
            usersService.save(newUser);
            Response<String> response = new Response<>(true, "User registered successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }
    
    
    @PutMapping
    ResponseEntity<Response<?>> loginJson(@RequestBody Data userData) {
        
        Users hasUsername = usersService.findByUsername(userData.username);
        if (hasUsername != null) {
            if (BCrypt.checkpw(userData.password, hasUsername.password)) {
                Response<String> response = new Response<>(true, "Login successful");
                response.userRole = hasUsername.userRole;
                response.coins = hasUsername.coins;
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Response<String> response = new Response<>(false, "Incorrect password");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
        } else {
            Response<String> response = new Response<>(false, "Username not found");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }
    
    
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    public static class Response<T> {
        
        public boolean success;
        public T data;
        
        public String userRole;
        public Integer coins;
        
        public Response(boolean success, T data) {
            this.success = success;
            this.data = data;
        }
        
    }
}