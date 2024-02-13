package books.reader.mongo.users;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.util.LinkedNode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "users")
public class Users {
    
    
    @Id
    public String _id;
    public String username;
    public String password;
    public String email;
    public String userRole;
    public int coins;
    public List<Reading> reading;
    
    
    public static class Reading {
        public String _id;
        public String chapter;
        public List<String> allowedChapters;
        public int page;
        public Abilities abilities;
    }
    
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    public record Abilities(
            Integer strength, Integer intelligence,
            Integer charisma, Integer luck,
            Integer energy
    ) {
    }
}