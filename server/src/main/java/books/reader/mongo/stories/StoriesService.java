package books.reader.mongo.stories;

import com.mongodb.lang.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class StoriesService {
    
    private final StoriesRepo storiesRepository;
    
    @Autowired
    public StoriesService(StoriesRepo storiesRepository) {
        this.storiesRepository = storiesRepository;
    }
    
    public Stories findById(@NonNull String id) {
        return storiesRepository.findById(id).orElse(null);
    }
    
    
    
}
