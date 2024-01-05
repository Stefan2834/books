package books.reader.mongo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MyEntityService {
    
    private final MyEntityRepo myEntityRepository;
    
    @Autowired
    public MyEntityService(MyEntityRepo myEntityRepository) {
        this.myEntityRepository = myEntityRepository;
    }
    
    public MyEntity findByEmail(String email) {
        return myEntityRepository.findByEmail(email);
    }
    
    public MyEntity findByUsername(String username) {
        return myEntityRepository.findByUsername(username);
    }
    
    public void save(MyEntity newData) {
        myEntityRepository.save(newData);
    }
    
    public void delete(MyEntity result) {
        myEntityRepository.delete(result);
    }
    
    public List<MyEntity> findAll() {
        return myEntityRepository.findAll();
    }
    
}
