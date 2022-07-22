package com.login.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.login.model.LoginModel;

@Repository
public interface LoginRepository extends JpaRepository<LoginModel, UUID> {

	Optional<LoginModel> findByEmail(String username);

}
