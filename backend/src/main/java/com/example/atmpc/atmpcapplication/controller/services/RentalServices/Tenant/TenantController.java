package com.example.atmpc.atmpcapplication.controller.services.RentalServices.Tenant;
import com.example.atmpc.atmpcapplication.config.JwtUtil;
import com.example.atmpc.atmpcapplication.dto.ApiResponse;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantProfileRequestDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Tenant.TenantRegistrationRequestDto;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.TenantResponseDto;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Tenant.TenantService;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/apiTenant")
public class TenantController {

    private final TenantService service;

    private  final JwtUtil jwtUtil;

     @PostMapping("/registering")
     public ResponseEntity<ApiResponse<TenantResponseDto>> registerTenant(

             @Valid @RequestBody TenantRegistrationRequestDto requestDto

     ) {
         TenantResponseDto responseDto = service.registerTenant(requestDto);

        return ResponseEntity.ok(new ApiResponse<>("You are successfully registered, wait for the super admin for approval", responseDto));

     }

     @PutMapping(value = "/updateProfile/{customerid}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<TenantResponseDto>> updateProfile(

             @PathVariable("customerid") Long customerid,
             @Valid @RequestPart("data") TenantProfileRequestDto requestDto,
             @RequestPart(value = "file", required = false) MultipartFile file

             ){

         TenantResponseDto responseDto = service.updateProfile(customerid,requestDto,file);

         return ResponseEntity.ok(new ApiResponse<>("Profile update successfully", responseDto));

     }

     @GetMapping("/getTenantDetails/{customerid}")
    public ResponseEntity<ApiResponse<TenantResponseDto>> getTenantDetailsLogged(

            HttpServletRequest request

     ){

         TenantResponseDto responseDto = service.getTenantDetailsLogged(request);

         return ResponseEntity.ok(new ApiResponse<>("Details retrieved successfully", responseDto));

     }

    @GetMapping("/me")
    public TenantResponseDto getCurrentTenant(HttpServletRequest request){

        return service.getTenantDetailsLogged(request);
    }



}
