package books.reader.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class MyEntity {
    
    
    @Id
    public String _id;
    public String username;
    public String password;
    public String email;
    public String userRole;
    public String avatar;
    
    
}