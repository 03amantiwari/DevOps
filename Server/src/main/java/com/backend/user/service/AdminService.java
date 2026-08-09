package com.backend.user.service;

import java.util.List;

import com.backend.user.dtos.response.UserGetRespDto;

/**
 *   The role name is now a constant baked into AdminServiceImpl.
 *   Callers (AdminController) no longer need to import or pass UserRole.
 */
public interface AdminService {

    UserGetRespDto getAdminDetails(Long aId);

    List<UserGetRespDto> getAllCustomerDetails();

    List<UserGetRespDto> getAllOwnerDetails();
}
