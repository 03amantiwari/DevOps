package com.backend.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);

	boolean existsByPhoneNumber(String phoneNumber);

	Optional<User> findByEmailIgnoreCase(String email);

	/**
	 * Finds a user by id whose roles set contains a role with the given roleName.
	 *
	 * earlier: Optional<User> findByIdAndUserRole(Long aId, UserRole userRole
	 * generated: WHERE u.user_id = ? AND u.role = ?
	 *
	 * then: JPQL joins through the @ManyToMany relationship. "r" is an element of
	 * u.roles (the Set<Role>). -- generated: WHERE u.user_id = ? AND r.role_name =
	 * ? via inner join on user_roles and roles tables.
	 *
	 * Callers (AdminServiceImpl, CustomerServiceImpl, OwnerServiceImpl) now pass a
	 * String like "ROLE_CUSTOMER" instead of UserRole.ROLE_CUSTOMER.
	 */
	@Query("SELECT u FROM User u JOIN u.roles r WHERE u.id = :id AND r.roleName = :roleName")
	Optional<User> findByIdAndRoleName(@Param("id") Long id, @Param("roleName") String roleName);

	/**
	 * Returns all users who have the given role.
	 *
	 * earlier: List<User> findByUserRole(UserRole userRole);
	 *
	 * then: JPQL join on the roles Set.
	 */
	@Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleName = :roleName")
	List<User> findByRoleName(@Param("roleName") String roleName);

	/**
	 * Projection query used by UserServiceImpl.getAllUserDetails().
	 *
	 * earlier: @Query("SELECT new com.backend.user.dtos.response.UserGetRespDto
	 * (u.fullName,u.dateOfBirth,u.email,u.phoneNumber,u.userRole) FROM User u")
	 *
	 * then: UserRole enum is gone from UserGetRespDto (see that file). The roles
	 * Set cannot be passed into a JPQL constructor expression directly, so we
	 * return the User entities and map in the service layer instead. This method is
	 * kept for backward API compatibility but now fetches entities.
	 *
	 * The actual DTO mapping (including role names) is done in UserServiceImpl
	 * using user.getRoles() so the full Set<Role> is available.
	 */
	@Query("SELECT DISTINCT u FROM User u JOIN FETCH u.roles")
	List<User> findAllUser();
}
