package books.reader.mongo.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsersService {
    
    private final UsersRepo usersRepository;
    
    @Autowired
    public UsersService(UsersRepo usersRepository) {
        this.usersRepository = usersRepository;
    }
    
    public Users findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
    
    public Users findByUsername(String username) {
        return usersRepository.findByUsername(username);
    }
    
    public void save(Users newData) {
        usersRepository.save(newData);
    }
    
    public void delete(Users result) {
        usersRepository.delete(result);
    }
    
    public List<Users> findAll() {
        return usersRepository.findAll();
    }
    
}
