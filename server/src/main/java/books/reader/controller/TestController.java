package books.reader.controller;

import books.reader.mongo.users.Users;
import books.reader.mongo.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/test")
public class TestController {
    
    private final UsersService myEntityService;
    
    @Autowired
    public TestController(UsersService myEntityService) {
        this.myEntityService = myEntityService;
    }
    
    
    private static class Data {
        public String data;
    }
    
    @GetMapping
    ResponseEntity<DataController.Response<?>> getJson() {
        List<Users> result = myEntityService.findAll();
        DataController.Response<List<Users>> response = new DataController.Response<>(true, result);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
//
//    @GetMapping
//    ResponseEntity<Response<?>> getJson() {
//        List<MyEntity> result = myEntityService.findAll();
//        Response<List<MyEntity>> response = new Response<>(true, result);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//
//    @PostMapping
//    ResponseEntity<Response<?>> postJson(@RequestBody Data searchData) {
//        MyEntity containsValue = myEntityService.findByData(searchData.data);
//
//        if (containsValue == null) {
//            MyEntity newData = new MyEntity();
//            newData.data = searchData.data;
//            myEntityService.save(newData);
//            Response<String> response = new Response<>(true, "Data added successfully");
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        } else {
//            String message = "Data already in the collection";
//            Response<String> response = new Response<>(false, message);
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//        }
//    }
//
//    @PutMapping
//    ResponseEntity<Response<?>> putJson(@RequestBody Data searchData) {
//        MyEntity result = myEntityService.findByData(searchData.data);
//
//        if (result != null && searchData.newData != null) {
//            result.data = searchData.newData;
//            myEntityService.save(result);
//            Response<String> response = new Response<>(true, searchData.data + " changed successfully");
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        } else {
//            Response<String> response = new Response<>(true, searchData.data + " cannot be changed");
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//        }
//    }
//
//    @DeleteMapping
//    ResponseEntity<Response<?>> deleteJson(@RequestBody Data searchData) {
//        MyEntity result = myEntityService.findByData(searchData.data);
//        if (result != null) {
//            myEntityService.delete(result);
//            Response<String> response = new Response<>(true, searchData.data + " deleted successfully");
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        } else {
//            Response<String> response = new Response<>(true, searchData.data + " cannot be deleted");
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//        }
//    }
//
//    @PostMapping("/custom")
//    ResponseEntity<Response<?>> getCustom(@RequestBody Data searchData) {
//        List<MyEntity> result = myEntityService.findCustom(searchData.data);
//
//        if (result != null) {
//            Response<List<MyEntity>> response = new Response<>(true, result);
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//        } else {
//            Response<String> response = new Response<>(true, searchData.data + " cannot be found");
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//        }
//    }
//
    
    record Response<T>(boolean success, T data) {
    }
}

