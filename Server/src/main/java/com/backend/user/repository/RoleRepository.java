package com.backend.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.user.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    /**
     * Looks up a role by its name string.
     * Called during registration to resolve e.g. "ROLE_CUSTOMER" → Role entity.
     *
     * Spring Data generates:
     *   SELECT * FROM roles WHERE role_name = ?
     */
    Optional<Role> findByRoleName(String roleName);
}
