package books.reader.mongo.stories;

import com.mongodb.lang.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoriesRepo extends MongoRepository<Stories, String> {
    
    
    @NonNull
    Optional<Stories> findById(@NonNull String searchData);
    
    
}
