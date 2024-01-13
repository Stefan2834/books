package books.reader.mongo.stories;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Optional;


@Document(collection = "stories")
public class Stories {
    
    
    @Id
    public String _id;
    public String name;
    public List<Character> characters;
    public String author;
    public String description;
    public List<Reviews> reviews;
    public int price;
    public List<Chapters> chapters;
    
    public record Character(String name, String image, String color) {
    }
    
    public record Reviews(String user, String message, float rating) {
    }
    
    
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    public static class Chapters {
        public List<Page> pages;
        public String index;
        
        @JsonInclude(JsonInclude.Include.NON_EMPTY)
        public static class Page {
            public List<Content> content;
            public List<Option> options;
            public Boolean importance;
            public String question;
            
            @JsonInclude(JsonInclude.Include.NON_EMPTY)
            public static class Content {
                public int character;
                public String text;
            }
            
            @JsonInclude(JsonInclude.Include.NON_EMPTY)
            public static class Option {
                public String text;
                public String ability;
                public Integer change;
                public String goTo;
            }


        }
    }
    
    
}