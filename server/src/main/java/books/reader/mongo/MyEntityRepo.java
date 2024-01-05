package books.reader.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyEntityRepo extends MongoRepository<MyEntity, String> {
    
    
    MyEntity findByEmail(String searchData);
    
    MyEntity findByUsername(String searchData);
    
    
}
