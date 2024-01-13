package books.reader.controller;

import books.reader.mongo.stories.Stories;
import books.reader.mongo.stories.StoriesService;
import books.reader.mongo.users.Users;
import books.reader.mongo.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/story")
public class StoryController {
    
    
    private final StoriesService storiesService;
    private final UsersService usersService;
    
    @Autowired
    public StoryController(StoriesService storiesService, UsersService usersService) {
        this.storiesService = storiesService;
        this.usersService = usersService;
    }
    
    public static class Data {
        public String username;
        public String chapter;
        public String id;
    }
    
    
    @PostMapping("/{id}")
    ResponseEntity<Response<?>> getStory(@PathVariable String id, @RequestBody Data data) {
        Stories hasId = storiesService.findById(id);
        Users user = usersService.findByUsername(data.username);
        
        
        if (user != null) {
            Users.Reading target = user.reading.stream()
                    .filter(reading -> reading._id.equals(id))
                    .findFirst()
                    .orElse(null);
            if (hasId != null) {
                Response<Stories> response = new Response<>(true, hasId);
                if (target != null) {
                    response.reading = target;
                }
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Response<String> response = new Response<>(false, "no id found");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
        } else {
            Response<String> response = new Response<>(false, "no user found");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }
    
    @PostMapping("/read")
    ResponseEntity<Response<?>> getChapter(@RequestBody Data data) {
        Users user = usersService.findByUsername(data.username);
        Stories stories = storiesService.findById(data.id);
        if (user != null) {
            Users.Reading target = user.reading.stream()
                    .filter(reading -> reading._id.equals(data.id))
                    .findFirst()
                    .orElse(null);
            if (target != null && target.chapter.equals(data.chapter) && stories.chapters != null) {
                List<Stories.Chapters.Page> page = Objects.requireNonNull(stories.chapters.stream()
                        .filter(chap -> data.chapter.equals(chap.index))
                        .findFirst()
                        .orElse(null)).pages;
                Response<List<Stories.Chapters.Page>> response = new Response<>(true, page);
                response.characters = stories.characters;
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Response<String> response = new Response<>(false, "You are not allowed to be here");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            Response<String> response = new Response<>(false, "no user found");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }
    
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    public static class Response<T> {
        
        public boolean success;
        public T data;
        
        public Users.Reading reading;
        
        public List<Stories.Character> characters;
        
        public Response(boolean success, T data) {
            this.success = success;
            this.data = data;
        }
    }
}
