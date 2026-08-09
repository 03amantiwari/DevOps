package com.backend.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * NEW ENTITY — replaces the UserRole enum.
 *
 * Previously role was stored as an @Enumerated column directly on User:
 *
 *     @Enumerated(EnumType.STRING)
 *     @Column(name = "role", nullable = false)
 *     private UserRole userRole;
 *
 * That is replaced by a @ManyToMany relationship through UserRole (junction).
 * This table holds the master list of available roles.
 *
 * DB TABLE: roles
 *   id          INT  PK AUTO_INCREMENT
 *   role_name   VARCHAR(30) NOT NULL UNIQUE   e.g. "ROLE_ADMIN"
 *   description VARCHAR(150)
 *
 * Seed rows (insert once via data.sql or Flyway):
 *   INSERT INTO roles (role_name) VALUES ('ROLE_ADMIN');
 *   INSERT INTO roles (role_name) VALUES ('ROLE_OWNER');
 *   INSERT INTO roles (role_name) VALUES ('ROLE_CUSTOMER');
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Integer id;

    /**
     * The role name that Spring Security reads as a GrantedAuthority.
     * Must keep the "ROLE_" prefix so hasRole("ADMIN") works correctly.
     */
    @Column(name = "role_name", nullable = false, length = 30, unique = true)
    private String roleName;          // e.g.  "ROLE_ADMIN"

    @Column(name = "description", length = 150)
    private String description;
}
