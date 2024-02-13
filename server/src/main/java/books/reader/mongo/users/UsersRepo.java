package books.reader.mongo.users;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends MongoRepository<Users, String> {
    
    
    Users findByEmail(String searchData);
    
    Users findByUsername(String searchData);

}
