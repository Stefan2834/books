package books.reader.controller;

import books.reader.mongo.MyEntity;
import books.reader.mongo.MyEntityService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/login")
public class LoginController {
    
    
    private static class Data {
        public String username;
        public String email;
        public String password;
        public String refreshToken;
    }
    
    private final MyEntityService myEntityService;
    
    @Autowired
    public LoginController(MyEntityService myEntityService) {
        this.myEntityService = myEntityService;
    }
    
    
    @Value("${access_token}")
    private String ACCESS_TOKEN;
    @Value("${refresh_token}")
    private String REFRESH_TOKEN;
    // 15 seconds
    long accessExpire = 1000 * 15;
    // 5 days
    long refreshExpire = 1000 * 60 * 60 * 24 * 7;
    private static final int HS256_KEY_SIZE = 256;
    
    @GetMapping
    ResponseEntity<DataController.Response<?>> getJson() {
        List<MyEntity> result = myEntityService.findAll();
        DataController.Response<List<MyEntity>> response = new DataController.Response<>(true, result);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    
    @PostMapping("/register")
    ResponseEntity<Response<String>> registerJson(@RequestBody Data userData) {
        MyEntity hasUsername = myEntityService.findByUsername(userData.username);
        MyEntity hasEmail = myEntityService.findByEmail(userData.email);
        if (hasUsername != null || hasEmail != null) {
            Response<String> response = new Response<>(false, "Username or email already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else {
            String hashedPassword = BCrypt.hashpw(userData.password, BCrypt.gensalt(10));
            MyEntity newUser = new MyEntity();
            newUser.username = userData.username;
            newUser.email = userData.email;
            newUser.password = hashedPassword;
            newUser.userRole = "user";
            newUser.avatar = "https://books2834.s3.eu-central-1.amazonaws.com/5856.jpg";
            myEntityService.save(newUser);
            Response<String> response = new Response<>(true, "User registered successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }
    
    
    @PostMapping("/login")
    ResponseEntity<Response<?>> loginJson(@RequestBody Data userData) {
        MyEntity hasUsername = myEntityService.findByUsername(userData.username);
        if (hasUsername != null) {
            if (BCrypt.checkpw(userData.password, hasUsername.password)) {
                Response<String> response = new Response<>(true, "Login successful", null, null, hasUsername.userRole);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Response<String> response = new Response<>(false, "Incorrect password");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
        } else {
            Response<String> response = new Response<>(false, "Username not found");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }
    
    @PostMapping("/token")
    ResponseEntity<Response<?>> tokenJson(@RequestBody Data userData) {
        // 15 seconds
        String accessToken = createToken(ACCESS_TOKEN, userData, accessExpire);
        
        // 7 days
        String refreshToken = createToken(REFRESH_TOKEN, userData, refreshExpire);
        
        if (accessToken != null && refreshToken != null) {
            Response<String> response = new Response<>(true, "Tokens generated successfully", accessToken, refreshToken, null);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            Response<String> response = new Response<>(false, "Token generation failed");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        
    }
    
    @PostMapping("/refresh")
    ResponseEntity<Response<?>> refreshJson(@RequestBody Data userData) {
        byte[] refreshKeyBytes = REFRESH_TOKEN.getBytes();
        byte[] refreshTruncatedKey = new byte[HS256_KEY_SIZE / 8];
        System.arraycopy(refreshKeyBytes, 0, refreshTruncatedKey, 0, refreshTruncatedKey.length);
        
        String refreshToken = userData.refreshToken;
        if (refreshToken != null) {
            try {
                Jwts.parserBuilder().setSigningKey(refreshTruncatedKey).build().parseClaimsJws(refreshToken);
                String accessToken = createToken(ACCESS_TOKEN, userData, accessExpire);
                Response<String> response = new Response<>(true, "Token refreshed successfully", accessToken, null, null);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } catch (Exception e) {
                Response<String> response = new Response<>(false, "Token refresh failed");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } else {
            Response<String> response = new Response<>(false, "Token refresh failed");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    
    
    
    
    public record Response<T>(boolean success, T data, String accessToken, String refreshToken, String userRole) {
        
        public Response(boolean success, T data) {
            this(success, data, null, null, null);
        }
        
    }
    
    
    
    private String createToken(String secretKey, Data userData, long expire)
    {
        byte[] keyBytes = secretKey.getBytes();
        byte[] accessTruncatedKey = new byte[HS256_KEY_SIZE / 8];
        System.arraycopy(keyBytes, 0, accessTruncatedKey, 0, accessTruncatedKey.length);
        
        
        return Jwts.builder()
                .setSubject("user")
                .claim("user", userData.username)
                .claim("email", userData.email)
                .setExpiration(new Date(System.currentTimeMillis() + expire))
                .signWith(Keys.hmacShaKeyFor(accessTruncatedKey), SignatureAlgorithm.HS256)
                .compact();
    }
}