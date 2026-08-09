package com.backend.user.service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.common.exception.ResourceNotFoundException;
import com.backend.user.dtos.request.UpdateReqDto;
import com.backend.user.dtos.response.DeleteRespDto;
import com.backend.user.dtos.response.UserGetRespDto;
import com.backend.user.entity.Owner;
import com.backend.user.entity.Role;
import com.backend.user.entity.User;
import com.backend.user.repository.OwnerRepository;
import com.backend.user.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class OwnerServiceImpl implements OwnerService {

    private final UserRepository  userRepositary;
    private final OwnerRepository ownerRepositary;

    // ── helper ────────────────────────────────────────────────────

    private UserGetRespDto toDto(User user) {
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
        return UserGetRespDto.builder()
        		.id(user.getId())
                .fullName(user.getFullName())
                .dateOfBirth(user.getDateOfBirth())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .roles(roleNames)
                .build();
    }

    // ── 1. getOwnerDetails ────────────────────────────────────────

    @Override
    public UserGetRespDto getOwnerDetails(Long oId) {
        /*
         * CHANGED:
         * Before: userRepositary.findByIdAndUserRole(oId, UserRole.ROLE_OWNER)
         * After:  userRepositary.findByIdAndRoleName(oId, "ROLE_OWNER")
         */
        log.info("Attempt to get owner details by ownerId: {}", oId);
        return userRepositary.findByIdAndRoleName(oId, "ROLE_OWNER")
                .map(this::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id : ", oId));
    }

    // ── 2. updateOwnerDetails ─────────────────────────────────────

    @Override
    @Transactional
    public UserGetRespDto updateOwnerDetails(Long oId, @Valid UpdateReqDto request) {
        /*
         * CHANGED:
         * Before: userRepositary.findByIdAndUserRole(oId, UserRole.ROLE_OWNER)
         *         log.info("... userRole:{}", user.getUserRole())
         * After:  userRepositary.findByIdAndRoleName(oId, "ROLE_OWNER")
         *         log.info("... roles:{}", user.getRoles())
         *
         * Everything else (address update etc.) is UNCHANGED.
         */
        log.info("Attempt to update owner details by UserId: {}", oId);
        User user = userRepositary.findByIdAndRoleName(oId, "ROLE_OWNER")
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id :", oId));

        log.info("Updating owner UserId: {}, roles: {}", oId, user.getRoles());

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }

        Owner owner = ownerRepositary.findById(oId)
                .orElseThrow(() -> new RuntimeException("Unhandled error"));
        if (request.getAddress() != null) {
            owner.setAddress(request.getAddress());
        }

        log.info("Successfully updated Owner details by UserId: {}", oId);
        return userRepositary.findByIdAndRoleName(oId, "ROLE_OWNER")
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Unhandled Error " + oId));
    }

    // ── 3. deleteCustomerDetails (owner delete) ───────────────────

    @Override
    @Transactional
    public DeleteRespDto deleteCustomerDetails(Long oId) {
        /*
         * CHANGED:
         * Before: userRepositary.findByIdAndUserRole(oId, UserRole.ROLE_OWNER)
         *         log.info("... userRole:{}", user.getUserRole())
         * After:  userRepositary.findByIdAndRoleName(oId, "ROLE_OWNER")
         *         log.info("... roles:{}", user.getRoles())
         */
        log.info("Attempt to delete owner by UserId: {}", oId);
        User user = userRepositary.findByIdAndRoleName(oId, "ROLE_OWNER")
                .orElseThrow(() -> new ResourceNotFoundException("Owner Not found", oId));

        log.info("Deleting owner UserId: {}, roles: {}", oId, user.getRoles());
        userRepositary.delete(user);
        log.info("Successfully deleted owner by UserId: {}", oId);

        return new DeleteRespDto("User deleted successfully with : ", oId, LocalDateTime.now());
    }
}
