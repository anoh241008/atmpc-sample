package com.example.atmpc.atmpcapplication.controller.authentication.Admin;

import com.example.atmpc.atmpcapplication.config.JwtUtil;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.ForgotPassword.ForgotPasswordRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestDto;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.LoginRequestReponseDto;
import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.dto.authentication.Admin.ResetPassword.ResetPasswordRequestDto;
import com.example.atmpc.atmpcapplication.service.authentication.Admin.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/adminAuth")
public class AuthServiceController {

    private final AuthService service;

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginRequestReponseDto>> loginAdmin(

           @Valid @RequestBody LoginRequestDto requestDto,

            HttpServletResponse response

    ){

        LoginRequestReponseDto responseDto = service.loginAdmin(requestDto);

        String token = jwtUtil.buildToken(responseDto.getUserid(), responseDto.getEmail(), responseDto.getRole(), responseDto.getBranch());

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true) // true in production (HTTPS)
                .path("/")
                .maxAge(60 * 60 * 24)
                .sameSite("Lax") // 🔥 IMPORTANT FIX
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(
                new ApiResponse<>("Login Successfully", responseDto)
        );
    }


    @GetMapping("/validate")
    public ResponseEntity<?> validate(
            Authentication auth,
            @CookieValue(value = "token", required = false) String token, HttpServletRequest request
    ) {

        if (auth == null || token == null || !jwtUtil.validateToken(token)) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(

                    "authenticated", false

            ));

        }

        String role = auth.getAuthorities().iterator().next().getAuthority();

        Map<String, Object> response = new HashMap<>();

        response.put("authenticated", true);

        response.put("username", auth.getName());

        response.put("userid", jwtUtil.getUserIdFromRequest(request));

        response.put("role", role);

        response.put("branch", jwtUtil.getBranchFromRequest(request));

        return ResponseEntity.ok(response);

    }


    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response){

        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(new ApiResponse<>("Logged out successfully", null));
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequestDto requestDto
    ){

        service.forgotPassword(requestDto);

        return ResponseEntity.ok(

                new ApiResponse<Void>("Reset link sent successfully", null)

        );

    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequestDto requestDto){

        service.resetPassword(requestDto);

        return ResponseEntity.ok(
                new ApiResponse<>("Password reset successfully", null)
        );

    }

    @GetMapping("/validate-reset-token")
    public ResponseEntity<ApiResponse<Void>> validateResetPasswordToken(
            @RequestParam String token
    ){

        service.validateResetToken(token);

        return ResponseEntity.ok(
                new ApiResponse<>("Session is valid", null)
        );

    }

}
