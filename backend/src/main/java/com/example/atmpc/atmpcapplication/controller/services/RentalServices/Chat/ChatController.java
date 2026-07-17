package com.example.atmpc.atmpcapplication.controller.services.RentalServices.Chat;


import com.example.atmpc.atmpcapplication.config.JwtUtil;
import com.example.atmpc.atmpcapplication.config.PresenceTrackerConfig;
import com.example.atmpc.atmpcapplication.dto.services.RentalServices.Chat.ChatMessageDto;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ChatMessageEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.ConversationEntity;
import com.example.atmpc.atmpcapplication.entity.services.RentalServices.CustomerDetailsEntity;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Chat.Service.ChatService;
import com.example.atmpc.atmpcapplication.service.services.RentalServices.Tenant.TenantService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chatMessage")
public class ChatController {

    private final ChatService chatService;

    private final JwtUtil jwtUtil;

    private final PresenceTrackerConfig presenceTrackerConfig;

    @PostMapping("/send")
    public ChatMessageEntity sendMessage(@RequestBody ChatMessageDto requestDto,
                                         HttpServletRequest request){

        Long senderid = jwtUtil.getUserIdFromRequest(request);

        return chatService.sendMessage(senderid, requestDto);

    }

    @GetMapping("/conversation/with/{tenantid}")
    public ConversationEntity getOrCreateConversation(@PathVariable Long tenantid,
                                                      HttpServletRequest request){

        Long adminid = jwtUtil.getUserIdFromRequest(request);

        return chatService.getOrCreateConversation(adminid, tenantid);

    }

    @PutMapping("/delivered/{messageid}")
    public void markDelivered(@PathVariable Long messageid){

         chatService.markDelivered(messageid);

    }

    @PutMapping("/read/{messageid}")
    public void markRead(@PathVariable Long messageid){

        chatService.markRead(messageid);

    }

    @PutMapping("/delivered/all")
    public void deliveredAll(@RequestParam Long conversationid,
                             HttpServletRequest request){

        Long userid = jwtUtil.getUserIdFromRequest(request);

        chatService.markAllDelivered(conversationid, userid);
    }

    @PutMapping("/read/all")
    public void readAll(@RequestParam Long conversationid,
                        HttpServletRequest request){

        Long userid = jwtUtil.getUserIdFromRequest(request);

        chatService.markAllRead(conversationid, userid);
    }

    @GetMapping("/conversation/{conversationid}/paged")
    public Page<ChatMessageEntity> getConversationMessages(@PathVariable Long conversationid,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "30") int size){

        return chatService.getConversationMessages(conversationid, page, size);

    }

    @GetMapping("/conversation/as-tenant/{adminid}")
    public ConversationEntity getOrCreateConversationAsTenant(@PathVariable Long adminid,
                                                              HttpServletRequest request){

        Long tenantid = jwtUtil.getUserIdFromRequest(request);

        return chatService.getOrCreateConversation(adminid, tenantid);

    }

    @GetMapping("/presence/{userid}")
    public Map<String, Object> getPresence(@PathVariable Long userid){
        return Map.of("userid", userid, "online", presenceTrackerConfig.isOnline(userid));
    }


}
