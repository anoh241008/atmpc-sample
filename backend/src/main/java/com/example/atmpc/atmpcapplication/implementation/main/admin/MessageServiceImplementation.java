package com.example.atmpc.atmpcapplication.implementation.main.admin;

import com.example.atmpc.atmpcapplication.GlobalExceptionHandler.ValidationException;
import com.example.atmpc.atmpcapplication.dto.main.admin.MessageRequestDto;
import com.example.atmpc.atmpcapplication.dto.main.admin.MessageResponseDto;
import com.example.atmpc.atmpcapplication.entity.main.MessageEntity;
import com.example.atmpc.atmpcapplication.mapper.main.admin.MessageMapper;
import com.example.atmpc.atmpcapplication.repository.main.admin.MessageRepository;
import com.example.atmpc.atmpcapplication.service.TurnstileService;
import com.example.atmpc.atmpcapplication.service.main.admin.MessageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageServiceImplementation implements MessageService {

    private final MessageRepository repository;

    private final MessageMapper mapper;

    private final TurnstileService turnstileService;

    @Override
    public MessageResponseDto createMessage(

            MessageRequestDto requestDto,

            HttpServletRequest request

    ) {

        boolean isHuman = turnstileService.verifyToken(requestDto.getCaptchatoken());

        if(!isHuman){

            throw new ValidationException("Human verification failed");

        }

        String ipaddress = request.getRemoteAddr();

        Optional<MessageEntity> latestMessage =  repository.findTopByIpaddressOrderByCreatedAtDesc(ipaddress);

        if(latestMessage.isPresent()){

            LocalDateTime lastSubmit = latestMessage.get().getCreatedAt();

            long minutes = ChronoUnit.MINUTES.between(

                    lastSubmit,

                    LocalDateTime.now()
            );

            if(minutes < 60) {

                long remaining = 60 - minutes;

                throw new ValidationException(

                        "You can send another message in "
                                + remaining +
                                " minute(s)."

                );

            }

        }

        MessageEntity entity = mapper.toEntity(requestDto);

        entity.setIpaddress(ipaddress);

        entity.setCreatedAt(LocalDateTime.now());

        MessageEntity saved = repository.save(entity);

        return mapper.toDto(saved);
    }

    @Override
    public Page<MessageResponseDto> getAllMessages(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<MessageEntity> messages = repository.findAll(pageable);

        return messages.map(mapper::toDto);
    }

    @Override
    public void deleteMessage(Long messageid){

        MessageEntity entity = repository.findById(messageid)
                .orElseThrow(() -> new RuntimeException("Message not found with id: " ));

        repository.delete(entity);

    }
}
