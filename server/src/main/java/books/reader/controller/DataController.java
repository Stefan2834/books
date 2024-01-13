package books.reader.controller;

import books.reader.mongo.users.Users;
import books.reader.mongo.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/data")
public class DataController {
    
    private final UsersService myEntityService;
    
    @Autowired
    public DataController(UsersService usersService) {
        this.myEntityService = usersService;
    }
    
    
    @GetMapping
    ResponseEntity<Response<?>> getJson() {
        List<Users> result = myEntityService.findAll();
        Response<List<Users>> response = new Response<>(true, result);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    record Response<T>(boolean success, T data) {
    }
}

