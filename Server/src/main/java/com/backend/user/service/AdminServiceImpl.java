package com.backend.user.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.user.dtos.response.UserGetRespDto;
import com.backend.user.entity.Role;
import com.backend.user.entity.User;
import com.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepositary;

    // ── helper: User → UserGetRespDto ─────────────────────────────

    /*
     * CHANGED — extracted a private helper because three methods all need
     * the same mapping.  Previously each called getUserRole() on the User.
     * Now we call getRoles() and stream the Set<Role> → Set<String>.
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

    // ── 1. getAdminDetails ────────────────────────────────────────

    @Override
    public UserGetRespDto getAdminDetails(Long aId) {
        /*
         * CHANGED — signature: removed UserRole parameter.
         *
         * Before:  getAdminDetails(Long aId, UserRole userRole)
         *          userRepositary.findByIdAndUserRole(aId, userRole)
         *
         * After:   getAdminDetails(Long aId)
         *          userRepositary.findByIdAndRoleName(aId, "ROLE_ADMIN")
         *
         * The role name is now a String constant, not an enum value.
         * AdminController passes nothing — the role is baked in here.
         */
        log.info("Attempt to get admin details by adminId: {}", aId);
        return userRepositary.findByIdAndRoleName(aId, "ROLE_ADMIN")
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + aId));
    }

    // ── 2. getAllCustomerDetails ───────────────────────────────────

    @Override
    public List<UserGetRespDto> getAllCustomerDetails() {
        /*
         * CHANGED — signature: removed UserRole parameter.
         *
         * Before:  getAllCustomerDetails(UserRole roleCustomer)
         *          userRepositary.findByUserRole(roleCustomer)
         *          user.getUserRole()
         *
         * After:   getAllCustomerDetails()
         *          userRepositary.findByRoleName("ROLE_CUSTOMER")
         *          user.getRoles() → stream → roleName strings
         */
        log.info("Admin trying to get the all customer list");
        List<User> users = userRepositary.findByRoleName("ROLE_CUSTOMER");
        List<UserGetRespDto> response = users.stream().map(this::toDto).toList();
        log.info("Admin successfully got the all customer list");
        return response;
    }

    // ── 3. getAllOwnerDetails ──────────────────────────────────────

    @Override
    public List<UserGetRespDto> getAllOwnerDetails() {
        /*
         * CHANGED — same pattern as getAllCustomerDetails.
         *
         * Before:  getAllOwnerDetails(UserRole roleOwner)
         *          userRepositary.findByUserRole(roleOwner)
         *
         * After:   getAllOwnerDetails()
         *          userRepositary.findByRoleName("ROLE_OWNER")
         */
        log.info("Admin trying to get the all owner list");
        List<User> users = userRepositary.findByRoleName("ROLE_OWNER");
        List<UserGetRespDto> response = users.stream().map(this::toDto).toList();
        log.info("Admin successfully got the all owner list");
        return response;
    }
}
