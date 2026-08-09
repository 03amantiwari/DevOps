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
import com.backend.user.entity.Customer;
import com.backend.user.entity.Role;
import com.backend.user.entity.User;
import com.backend.user.repository.CustomerRepository;
import com.backend.user.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final UserRepository     userRepositary;
    private final CustomerRepository customerRepositary;

    // ── helper ────────────────────────────────────────────────────

    /*
     * CHANGED — maps User → UserGetRespDto.
     *
     * Before: new UserGetRespDto(..., user.getUserRole())
     * After:  .roles( Set<String> from user.getRoles() )
     */
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

    // ── 1. getCustomerDetails ─────────────────────────────────────

    @Override
    public UserGetRespDto getCustomerDetails(Long cId) {
        /*
         * CHANGED:
         * Before: userRepositary.findByIdAndUserRole(cId, UserRole.ROLE_CUSTOMER)
         * After:  userRepositary.findByIdAndRoleName(cId, "ROLE_CUSTOMER")
         */
        log.info("Attempt to get Customer details by CustomerId: {}", cId);
        return userRepositary.findByIdAndRoleName(cId, "ROLE_CUSTOMER")
                .map(this::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id : ", cId));
    }

    // ── 2. updateCustomerDetails ──────────────────────────────────

    @Override
    @Transactional
    public UserGetRespDto updateCustomerDetails(Long cId, @Valid UpdateReqDto request) {
        /*
         * CHANGED:
         * Before: userRepositary.findByIdAndUserRole(cId, UserRole.ROLE_CUSTOMER)
         *         log.info("... userRole:{}", user.getUserRole())
         * After:  userRepositary.findByIdAndRoleName(cId, "ROLE_CUSTOMER")
         *         log.info("... roles:{}", user.getRoles())
         *
         * Everything else (field updates, customer diet preference) is UNCHANGED.
         */
        log.info("Attempt to update customer details by UserId: {}", cId);
        User user = userRepositary.findByIdAndRoleName(cId, "ROLE_CUSTOMER")
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id :", cId));

        log.info("Attempt to update customer details by UserId: {}, roles: {}", cId, user.getRoles());

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }

        Customer customer = customerRepositary.findById(cId)
                .orElseThrow(() -> new RuntimeException("Unhandled error"));
        if (request.getDietPreference() != null) {
            customer.setDietPreference(request.getDietPreference());
        }

        log.info("Successfully updated Customer details by UserId: {}", cId);
        return userRepositary.findByIdAndRoleName(cId, "ROLE_CUSTOMER")
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Unhandled Error " + cId));
    }

    // ── 3. deleteCustomerDetails ──────────────────────────────────

    @Override
    @Transactional
    public DeleteRespDto deleteCustomerDetails(Long cId) {
        /*
         * CHANGED:
         * Before: userRepositary.findByIdAndUserRole(cId, UserRole.ROLE_CUSTOMER)
         *         log.info("... userRole:{}", user.getUserRole())
         * After:  userRepositary.findByIdAndRoleName(cId, "ROLE_CUSTOMER")
         *         log.info("... roles:{}", user.getRoles())
         */
        log.info("Attempt to delete customer details by UserId: {}", cId);
        User user = userRepositary.findByIdAndRoleName(cId, "ROLE_CUSTOMER")
                .orElseThrow(() -> new ResourceNotFoundException("Customer Not found", cId));

        log.info("Deleting customer by UserId: {}, roles: {}", cId, user.getRoles());
        userRepositary.delete(user);
        log.info("Successfully deleted user by UserId: {}", cId);

        return new DeleteRespDto("User deleted successfully with : ", cId, LocalDateTime.now());
    }
}
