package books.reader.controller;

import books.reader.mongo.MyEntity;
import books.reader.mongo.MyEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/data")
public class DataController {
    
    private final MyEntityService myEntityService;
    
    @Autowired
    public DataController(MyEntityService myEntityService) {
        this.myEntityService = myEntityService;
    }
    
    
    @GetMapping
    ResponseEntity<Response<?>> getJson() {
        List<MyEntity> result = myEntityService.findAll();
        Response<List<MyEntity>> response = new Response<>(true, result);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    record Response<T>(boolean success, T data) {
    }
}

