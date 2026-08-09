package com.backend.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.user.dtos.response.UserGetRespDto;
import com.backend.user.entity.Role;
import com.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepositary;



    

    // ── getAllUserDetails ──────────────────────────────────────────

    @Override
    public List<UserGetRespDto> getAllUserDetails() {
        log.info("Admin trying to get the all user list");

        /*
         * CHANGED — old @Query used a JPQL constructor expression passing u.userRole.
         * That constructor no longer exists because UserGetRespDto.userRole was
         * replaced by Set<String> roles.
         *
         * UserRepository.findAllUser() now returns List<User> (entities with roles
         * fetched eagerly).  We map here in the service layer.
         */
        List<UserGetRespDto> response = userRepositary.findAllUser().stream()
                .map(u -> UserGetRespDto.builder()
                		.id(u.getId())
                        .fullName(u.getFullName())
                        .dateOfBirth(u.getDateOfBirth())
                        .email(u.getEmail())
                        .phoneNumber(u.getPhoneNumber())
                        .roles(u.getRoles().stream()
                                .map(Role::getRoleName)
                                .collect(Collectors.toSet()))
                        .build())
                .toList();

        log.info("Admin successfully got the all user list");
        return response;
    }
}
