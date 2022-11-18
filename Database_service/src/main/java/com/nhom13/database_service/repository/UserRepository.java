package com.nhom13.database_service.repository;
import com.nhom13.database_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
