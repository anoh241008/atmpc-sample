package com.example.atmpc.atmpcapplication.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers
                        .contentSecurityPolicy(csp -> csp.policyDirectives(
                                "default-src 'self'; " +
                                        "script-src 'self' 'unsafe-eval' https://challenges.cloudflare.com; " +
                                        "connect-src 'self' " + frontendUrl + " " +
                                        "http://localhost:8080 http://localhost:5173 ws://localhost:5173 " +
                                        "https://challenges.cloudflare.com; " +
                                        "frame-src https://challenges.cloudflare.com; " +
                                        "style-src 'self' 'unsafe-inline'; " +
                                        "img-src 'self' data: https:;"
                        ))
                )

                .authorizeHttpRequests(auth -> auth
                        // ✅ Allow CORS preflight requests through — must come first
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ✅ PUBLIC — root & health check
                        .requestMatchers("/", "/health", "/actuator/health").permitAll()


                        // 🔒 PROTECTED — token required with role Authentication Authority Validation
                        .requestMatchers("/api/adminAuth/validate", "/api/adminAuth/validate/**")
                        .hasAnyAuthority("MAIN_ADMIN", "RENTAL_ADMIN", "TENANT_ADMIN")

                        // Admin authentication — no token needed, ALL ADMIN
                        .requestMatchers(
                                "/api/adminAccountRegistration/adminCreate",
                                "/apiTenant/registering",
                                "/api/adminAuth/login",
                                "/api/adminAuth/logout",
                                "/api/adminAuth/forgot-password",
                                "/api/adminAuth/reset-password",
                                "/api/adminAuth/validate-reset-token",
                                "/uploads/**"
                        ).permitAll()

                        // Main — ✅ PUBLIC, no token needed
                        .requestMatchers(
                                "/api/project/getFeatureProjects",
                                "/api/project/getAllProject",
                                "/api/content/getLatestUpdate",
                                "/api/content/getAnnouncementUpdate",
                                "/api/content/getNewsEvent",
                                "/api/message/createMessage"
                        ).permitAll()

                        // 🔒 PROTECTED — token required with role
                        .requestMatchers(
                                "/api/message/getMessages/**",
                                "/api/message/delete/{messageid}/**",
                                "/api/project/create/**",
                                "/api/project/update/{projectid}/**",
                                "/api/project/delete/{projectid}/**",
                                "/api/content/create/**",
                                "/api/content/update/{contentid}/**",
                                "/api/content/delete/{contentid}/**",
                                "/api/content/getALlContents/**"
                        ).hasAuthority("MAIN_ADMIN")

                        // Rental Service

                        // 🔒 Shared chat paths — both RENTAL_ADMIN and TENANT_ADMIN need these
                        .requestMatchers(
                                "/ws/**",
                                "/chatMessage/conversation/{conversationid}",
                                "/chatMessage/send",
                                "/chat.send",
                                "/chatMessage/delivered/{id}",
                                "/chatMessage/read/{id}",
                                "/chatMessage/delivered/all",
                                "/chatMessage/read/all",
                                "/chatMessage/presence/{userid}",
                                "/chatMessage/conversation/{conversationid}/paged",
                                "/api/billingpayment/paymentList"

                        ).hasAnyAuthority("RENTAL_ADMIN", "TENANT_ADMIN")

                        // 🔒 PROTECTED — token required with role ADMIN (admin-only and tenant admin only)
                        .requestMatchers(
                                "/api/rental/admin/tenantList",
                                "/api/rental/admin/getRoomListToAssignForTenant",
                                "/api/rental/admin/approvalTenant/{customerid}",
                                "/api/rental/admin/deleteTenant/{customerid}",
                                "/api/rental/admin/assigningRoomToTenant/{customerid}",
                                "/api/rental/admin/createRoom",
                                "/api/rental/admin/updateRoom/{roomid}",
                                "/api/rental/admin/roomList",
                                "/api/rental/admin/getChatList",
                                "/api/rental/admin/me",
                                "/api/rental/admin/setDueTenant/{customerid}",
                                "/chatMessage/conversation/with/{tenantid}",
                                "/api/billingpayment/MarkPaidUnpaid/{paymentid}"
                        ).hasAuthority("RENTAL_ADMIN")

                        // 🔒 PROTECTED — token required with role TENANT (tenant-only)
                        .requestMatchers(
                                "/apiTenant/updateProfile{customerid}",
                                "/apiTenant/getTenantDetails/{customerid}",
                                "/chatMessage/conversation/as-tenant/{adminid}",
                                "/apiTenant/me",
                                "/api/rental/admin/byBranch/{branch}"
                        ).hasAuthority("TENANT_ADMIN")


                        .anyRequest().authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}