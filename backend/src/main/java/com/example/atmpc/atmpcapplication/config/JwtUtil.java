package com.example.atmpc.atmpcapplication.config;

import com.example.atmpc.atmpcapplication.entity.AdminEntity;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${app.token.key}")
    private String tokenKey; // must be non-static

    private Key key;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day

    // ==========================
    // INIT KEY
    // ==========================
    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(tokenKey.getBytes());
    }


    // ==========================
    // BUILD TOKENS PROTECTION SECURITY LOGGING IN FOR ALL ADMIN
    // ==========================
    public String buildToken(Long userid, String username, String role, String branch) {
        return Jwts.builder()
                .setSubject(username)
                .claim("userid", userid)
                .claim("role", role)
                .claim("branch", branch)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    // ==========================
    // GET USERID FROM REQUEST (FIXED)
    // ==========================
    public Long getUserIdFromRequest(HttpServletRequest request) {
        if (request.getCookies() == null) {
            throw new RuntimeException("Missing or invalid authorization header");
        }

        String token = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("token")) // match your actual cookie name
                .map(Cookie::getValue)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Missing or invalid authorization header"));

        return extractUserId(token);
    }

    public String getBranchFromRequest(HttpServletRequest request) {
        if (request.getCookies() == null) {
            throw new RuntimeException("Missing or invalid authorization header");
        }

        String token = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("token")) // match your actual cookie name
                .map(Cookie::getValue)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Missing or invalid authorization header"));

        return extractBranch(token);
    }
    // ==========================
    // GET USERID FROM REQUEST FOR WEBSOCKETAUTHCONFIG (FIXED)
    // ==========================
    public Long extractUserId(String token){

        Claims claims = parseClaims(token);

        return claims.get("userid", Long.class);

    }


    // ==========================
    // EXTRACT
    // ==========================
    public String extractUsernameOrEmail(String token) {

        if (token == null) return null;

        return parseClaims(token).getSubject();

    }

    public String extractRole(String token){

        return parseClaims(token).get("role", String.class);

    }

    public String extractBranch(String token){

        return  parseClaims(token).get("branch", String.class);

    }



    // ==========================
    // VALIDATE
    // ==========================

    public boolean validateToken(String token) {

        try {

            if (token == null || token.isBlank()) return false;

            parseClaims(token);

            return true;

        } catch (Exception e) {

            return false;

        }

    }

    // ==========================
    // BUILD TOKENS PASSWORD RESET
    // ==========================
    public String generate_RESET_PASSWORD_TOKEN(Long id, String usertype){

        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .claim("type","password-reset")
                .claim("usertype", usertype)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }


    public boolean validateResetToken(String token) {
        try {
            Claims claims = parseClaims(token);

            if(!"password-reset".equals(claims.get("type", String.class))){

                return false;

            }

            return claims.getExpiration().after(new Date());

        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }


    // ==========================
    // CLAIMS TOKEN
    // ==========================
    public Claims parseClaims(String token){

        return Jwts.parserBuilder()

                .setSigningKey(key)

                .build()

                .parseClaimsJws(token)

                .getBody();

    }



}