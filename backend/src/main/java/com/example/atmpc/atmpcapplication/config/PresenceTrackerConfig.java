package com.example.atmpc.atmpcapplication.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class PresenceTrackerConfig {

    private final SimpMessagingTemplate messagingTemplate;

    // userid -> online (simple in-memory tracker; fine for single-instance deployments)
    private final Map<String, Boolean> onlineUsers = new ConcurrentHashMap<>();

    @EventListener
    public void handleConnect(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        if (accessor.getUser() != null) {
            String userid = accessor.getUser().getName();
            onlineUsers.put(userid, true);
            broadcastPresence(userid, true);
        }
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        if (accessor.getUser() != null) {
            String userid = accessor.getUser().getName();
            onlineUsers.remove(userid);
            broadcastPresence(userid, false);
        }
    }

    private void broadcastPresence(String userid, boolean online) {
        messagingTemplate.convertAndSend(
                "/topic/presence/" + userid,
                Map.of("userid", userid, "online", online)
        );
    }

    public boolean isOnline(Long userid) {
        return onlineUsers.getOrDefault(userid.toString(), false);
    }
}