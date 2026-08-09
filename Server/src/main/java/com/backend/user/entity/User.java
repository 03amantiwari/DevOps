package com.backend.user.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
@ToString(exclude = "password")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@Builder
public class User extends BaseUser {

	// ── unchanged fields ──────────────────────────────────────────

	@Column(name = "full_name", nullable = false, length = 35)
	private String fullName;

	@Column(name = "email", nullable = false, length = 120, unique = true)
	private String email;

	@Column(nullable = false, length = 100)
	private String password;

	@Column(name = "phone_number", nullable = false, length = 20, unique = true)
	private String phoneNumber;

	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;

	@Column(name = "enabled", nullable = false)
	private Boolean enabled;

	@Column(name = "account_locked", nullable = false)
	private Boolean accountLocked;

	// ── CHANGED: replaced single @Enumerated userRole with @ManyToMany ──

	/*
	 * BEFORE (enum approach):
	 *
	 * @Enumerated(EnumType.STRING)
	 * 
	 * @Column(name = "role", nullable = false) private UserRole userRole;
	 *
	 * AFTER (separate tables): - The "roles" table holds master role records
	 * (ROLE_ADMIN, ROLE_OWNER, ROLE_CUSTOMER). - The "user_roles" junction table
	 * holds (user_id, role_id) pairs. - One user can now hold multiple roles
	 * without any schema change.
	 *
	 * JPA mapping notes:
	 * 
	 * @ManyToMany — many users can share many roles. FetchType.EAGER — roles are
	 * loaded with the user because Spring Security resolves GrantedAuthority
	 * objects outside any open persistence context. Lazy-loading would cause a
	 * LazyInitializationException inside the JWT filter.
	 * 
	 * @JoinTable — names the junction table and both FK columns explicitly so they
	 * match the DB column conventions.
	 * 
	 * @Builder.Default — without this, Lombok's @Builder leaves the Set as null,
	 * which causes a NullPointerException on the first add().
	 */
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	@Builder.Default
	private Set<Role> roles = new HashSet<>();

	// ── helper method in case checking role inside the custom user service ────────────────────────────────────────

	/**
	 * Returns true if this user has a role whose roleName equals the given name.
	 * Example: user.hasRole("ROLE_ADMIN")
	 *
	 * Used in service-layer guard checks as a readable alternative to iterating the
	 * set manually.
	 */
	public boolean hasRole(String roleName) {
		if (this.roles == null || roleName == null) {
			return false;
		}

		
		Role[] roleArray = this.roles.toArray(new Role[0]);

		for (int i = 0; i < roleArray.length; i++) {
			Role role = roleArray[i];
			if (role.getRoleName() != null && role.getRoleName().equals(roleName)) {
				return true;
			}
		}

		return false;
	}
}
