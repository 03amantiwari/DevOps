package com.backend.user.dtos.response;

import java.time.LocalDate;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserGetRespDto {

	private Long id;
    private String    fullName;
    private LocalDate dateOfBirth;
    private String    email;
    private String    phoneNumber;

    /*
     * Replaced with a Set<String> of role names to reflect the new
     * many-to-many model.  The all-args constructor (used in JPQL
     * constructor expressions in the old @Query) is no longer viable
     * because Set<String> cannot be passed directly in JPQL.
     * Mapping is now done in service layer using the @Builder pattern.
     */
    private Set<String> roles;
}
