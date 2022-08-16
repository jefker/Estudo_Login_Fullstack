package com.historia001.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.historia001.model.Historia001Model;

@Repository
public interface Historia001Repository extends JpaRepository<Historia001Model, UUID> {
	
}
