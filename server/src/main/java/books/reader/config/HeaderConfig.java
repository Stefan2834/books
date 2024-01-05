package books.reader.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.lang.NonNull;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;

public class HeaderConfig implements HandlerInterceptor {
    
    private final ObjectMapper jsonMapper = new ObjectMapper();

    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        
        if (request.getRequestURI().startsWith("/login")) {
            return true;
        }
        
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            Response<String> res = new Response<>(false, "Access token not found");
            response.setContentType("application/json");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(jsonMapper.writeValueAsString(res));
            return false;
        }

    
        String token = authorizationHeader.substring("Bearer ".length());

        if (!isValidJwt(token)) {
            Response<String> res = new Response<>(false, "Invalid JWT");
            response.setContentType("application/json");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(jsonMapper.writeValueAsString(res));
            return false;
        }

        return true;
    }
    
    
    private static final int HS256_KEY_SIZE = 256;
    
    public static boolean isValidJwt(String token) {
        try {
            String secretKey = "00dbaf99d8e64d93a1feb1f4624531a9362e3e477a9e9c02b9b6fa5364ea481a";
            byte[] keyBytes = secretKey.getBytes();
            byte[] accessTruncatedKey = new byte[HS256_KEY_SIZE / 8];
            System.arraycopy(keyBytes, 0, accessTruncatedKey, 0, accessTruncatedKey.length);
            
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(accessTruncatedKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }


    record Response<T>(boolean success, T data) {
    }
}
