package com.example.atmpc.atmpcapplication.implementation;

import com.example.atmpc.atmpcapplication.service.TurnstileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class TurnstileServiceImplementation implements TurnstileService {

    @Value("${turnstile.secret}")
    private String secretKey;

    private static final String VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public boolean verifyToken(String token){

        if (token == null || token.isBlank()) {
            return false;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("secret", secretKey);
            body.add("response", token);

            HttpEntity<MultiValueMap<String, String>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    VERIFY_URL,
                    request,
                    Map.class
            );

            Map<String, Object> result = response.getBody();

            Boolean success = (Boolean) result.get("success");

            return Boolean.TRUE.equals(success);

        } catch (Exception e) {
            System.err.println("Turnstile error: " + e.getMessage());
            return false;
        }

    }
}
